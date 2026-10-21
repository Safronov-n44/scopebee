// sb_loader.js — загрузчик Brotli-билда (Project Settings → Build → Brotli compression).
//
// build_web.sh кладёт этот файл в build/web/<Проект>/sb_loader.js как есть и подключает
// его в index.html ВМЕСТО тега index.js. Рядом лежит sb_brotli.js — вендорный JS-декодер
// (brotli/decode.min.js, Google, MIT, ~150 КБ): он НЕ склеен с загрузчиком и качается
// только тогда, когда действительно нужен (см. ниже). Оба файла едут несжатыми — хостинг
// обычно жмёт их своим gzip.
//
// Модель — Unity WebGL «Compression Format: Brotli» + «Decompression Fallback»: файлы билда
// лежат как *.br. Если хостинг отдал их с Content-Encoding: br, браузер уже распаковал и
// байты идут как есть — декодер не скачивается вовсе; если нет — догружаем sb_brotli.js и
// распаковываем здесь. Итог один: игра стартует на любом хостинге, а на «правильном»
// фолбэк не стоит ни байта трафика. (До 04.10.2026 декодер был склеен с загрузчиком и ехал
// всегда: 159 КБ сырых / 64 КБ brotli на каждую загрузку — четверть трафика FlappyBird.)
//
// Признак «браузер распаковал» снимается С СОДЕРЖИМОГО, а не с заголовка ответа. По
// заголовку судить нельзя: GitHub Pages не знает, что *.br уже сжат, — он жмёт файл своим
// gzip и отдаёт с Content-Encoding: gzip. Браузер снимает gzip и возвращает ИСХОДНЫЕ
// brotli-байты, при этом заголовок есть. Раньше это принималось за «распаковано»,
// index.js уходил в <script> бинарным мусором и страница падала с SyntaxError.
//
// Надёжная магия есть только у wasm ("\0asm"): у index.data содержимое произвольное, у JS
// начало зависит от сборки. Поэтому режим определяется один раз по wasm и применяется ко
// всему билду — файлы лежат рядом и отдаются одним сервером одинаково.
//
// Решение принимается по ПЕРВЫМ байтам потока index.wasm, а не по готовому файлу: так на
// хостинге без brotli скачивание sb_brotli.js идёт параллельно с докачкой wasm и пакета,
// а не отдельным раундом после них. Цена фолбэка на таком хостинге — время загрузки
// декодера, не перекрытое остальными файлами, плюс сама распаковка в JS (десятки мс на
// десктопе, ~100 мс на FlappyBird; Farm целиком 5 МБ — ~110 мс).
//
// Байты отдаются Emscripten через его штатные хуки: Module.instantiateWasm (wasm) и
// Module.getPreloadedPackage (пакет file_packager), поэтому index.js не правится. index.js
// исполняется как inline <script>.
//
// sb_platform.js сюда НЕ входит: он едет несжатым обычным тегом ПЕРЕД этим файлом. Площадка
// меряет загрузку от инициализации своего SDK до GameReady; если бы коннектор ждал здесь
// скачивания wasm и пакета, SDK стартовал бы в самом конце загрузки, а GameReady, уже
// лежащий в очереди, уходил бы следом — Яндекс видел загрузку «за 1 мс».
(function () {
    var FILES = {
        wasm: "index.wasm.br",
        data: "index.data.br",
        js: "index.js.br",
        // Транскодер KTX2 отдельным модулем (sb_basis.js, задача К10). Качается вместе с
        // остальными; SbBasis заводит только билд со сжатыми текстурами.
        basis: globalThis.SbBasis ? "basis_transcoder.wasm.br" : null
    };
    var DECODER = "sb_brotli.js";

    function log(text) {
        console.log("[INIT] " + text + " | " + performance.now().toFixed(2) + " ms");
    }

    function isWasm(bytes) {
        return bytes.length >= 4 && bytes[0] === 0x00 && bytes[1] === 0x61 && bytes[2] === 0x73 && bytes[3] === 0x6d;
    }

    // Декодер подключается обычным <script>: один раз, и только если понадобился. Промис
    // общий — его ждёт и ранний старт (по первым байтам wasm), и основная цепочка.
    var decoderPromise = null;
    function ensureDecoder() {
        if (decoderPromise === null) {
            decoderPromise = new Promise(function (resolve, reject) {
                if (typeof BrotliDecode === "function") {
                    resolve();
                    return;
                }
                var t0 = performance.now();
                var script = document.createElement("script");
                script.src = DECODER;
                script.onload = function () {
                    log(DECODER + ": loaded in " + (performance.now() - t0).toFixed(1) + " ms");
                    resolve();
                };
                script.onerror = function () {
                    reject(new Error(DECODER + ": failed to load — the host serves *.br without Content-Encoding: br, and the fallback decoder is missing next to index.html"));
                };
                document.head.appendChild(script);
            });
            // Основная цепочка получит отказ через свой then; здесь лишь гасим «unhandled rejection».
            decoderPromise.catch(function () {});
        }
        return decoderPromise;
    }

    // Скачивает файл КАК ЕСТЬ: решение о распаковке принимается позже, когда известен
    // режим всего билда. С onPeek — читает поток и отдаёт первые 4 байта, как только они
    // пришли (нужно только wasm: по его магии и решается режим).
    function fetchRaw(name, onPeek) {
        return fetch(name).then(function (response) {
            if (!response.ok) {
                throw new Error(name + ": HTTP " + response.status);
            }
            var encoding = response.headers.get("content-encoding") || "";
            function done(buffer) {
                return { name: name, buffer: buffer, bytes: new Uint8Array(buffer), encoding: encoding };
            }
            if (!onPeek || !response.body || typeof response.body.getReader !== "function") {
                return response.arrayBuffer().then(function (buffer) {
                    if (onPeek) {
                        onPeek(new Uint8Array(buffer, 0, Math.min(4, buffer.byteLength)));
                    }
                    return done(buffer);
                });
            }
            var reader = response.body.getReader();
            var chunks = [];
            var total = 0;
            var peeked = false;
            function peek() {
                // Первые 4 байта могут прийти не одним куском — собираем из начала очереди.
                var head = new Uint8Array(4);
                var got = 0;
                for (var i = 0; i < chunks.length && got < 4; i++) {
                    var take = Math.min(4 - got, chunks[i].length);
                    head.set(chunks[i].subarray(0, take), got);
                    got += take;
                }
                onPeek(head.subarray(0, got));
            }
            function pump() {
                return reader.read().then(function (result) {
                    if (result.done) {
                        if (!peeked) {
                            peeked = true;
                            peek();
                        }
                        var bytes = new Uint8Array(total);
                        var offset = 0;
                        for (var i = 0; i < chunks.length; i++) {
                            bytes.set(chunks[i], offset);
                            offset += chunks[i].length;
                        }
                        return done(bytes.buffer);
                    }
                    chunks.push(result.value);
                    total += result.value.length;
                    if (!peeked && total >= 4) {
                        peeked = true;
                        peek();
                    }
                    return pump();
                });
            }
            return pump();
        });
    }

    // Распаковывает файл JS-декодером; при needDecode = false отдаёт байты как есть.
    function unpack(file, needDecode) {
        if (file === null) {
            return null;
        }
        if (!needDecode) {
            log(file.name + ": " + file.bytes.length + " B, already decompressed (content-encoding: " + (file.encoding || "none") + ")");
            return file.bytes;
        }
        var t0 = performance.now();
        var out;
        try {
            out = BrotliDecode(new Int8Array(file.buffer));
        } catch (e) {
            throw new Error(file.name + ": the server sent the file compressed and the JS decoder failed to decompress it (" + e + ")");
        }
        var result = new Uint8Array(out.buffer, out.byteOffset, out.length);
        log(file.name + ": " + file.bytes.length + " → " + result.length + " B, decompressed in JS in " + (performance.now() - t0).toFixed(1) + " ms");
        return result;
    }

    function runScript(bytes, name) {
        var script = document.createElement("script");
        script.textContent = new TextDecoder().decode(bytes) + "\n//# sourceURL=" + name;
        document.body.appendChild(script);   // выполняется синхронно при вставке
    }

    function fail(error) {
        console.error("[INIT] Brotli build failed to load: " + (error && error.message ? error.message : error));
    }

    // Один вопрос на весь билд: пришло ли к нам уже распакованное. Ответ даёт wasm, и
    // даётся он по первым байтам — декодер (если нужен) начинает качаться сразу.
    var needDecode = null;
    function onWasmPeek(head) {
        if (needDecode !== null) {
            return;
        }
        needDecode = !isWasm(head);
        log("mode: " + (needDecode ? "decompressing in JS (the host served *.br as is or re-compressed it with its own gzip) — fetching " + DECODER
                                   : "decompressed by the browser (the host serves Content-Encoding: br) — " + DECODER + " is not needed"));
        if (needDecode) {
            ensureDecoder();
        }
    }

    log("sb_loader: downloading " + [FILES.wasm, FILES.data, FILES.js, FILES.basis].filter(Boolean).join(", "));
    Promise.all([
        fetchRaw(FILES.wasm, onWasmPeek),
        fetchRaw(FILES.data),
        fetchRaw(FILES.js),
        FILES.basis ? fetchRaw(FILES.basis) : null
    ]).then(function (files) {
        if (needDecode === null) {
            onWasmPeek(files[0].bytes);
        }
        return (needDecode ? ensureDecoder() : Promise.resolve()).then(function () {
            return files;
        });
    }).then(function (files) {
        var wasmBytes = unpack(files[0], needDecode);
        var dataBytes = unpack(files[1], needDecode);
        var jsBytes = unpack(files[2], needDecode);

        if (!isWasm(wasmBytes)) {
            throw new Error(FILES.wasm + ": not a wasm module after decompression — the host serves the file in an unknown form");
        }
        if (files[3] !== null) {
            // Компиляция модуля транскодера стартует сразу, до index.js; движок дождётся её
            // сам (зависимость запуска в sb_basis.js).
            globalThis.SbBasis.provide(unpack(files[3], needDecode));
        }

        // Штатный хук Emscripten: сами инстанцируем модуль из готовых байт.
        Module.instantiateWasm = function (imports, onSuccess) {
            WebAssembly.instantiate(wasmBytes, imports).then(function (result) {
                onSuccess(result.instance, result.module);
            }).catch(fail);
            return {};
        };
        // Штатный хук file_packager: пакет уже в памяти, XHR за index.data не нужен.
        // Буфер должен быть ровно размером пакета — декодер мог вернуть view на больший.
        var dataBuffer = (dataBytes.byteOffset === 0 && dataBytes.length === dataBytes.buffer.byteLength)
            ? dataBytes.buffer
            : dataBytes.slice().buffer;
        Module.getPreloadedPackage = function () {
            return dataBuffer;
        };

        runScript(jsBytes, "index.js");
    }).catch(fail);
})();
