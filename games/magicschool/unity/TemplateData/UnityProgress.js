function createProgressBlock() {
    const unityElement = document.getElementById("unityContainer");
    let progressElement = document.getElementById("progress-bar");
    let linearProgressBarElement = document.getElementById("linear-bar");

    progressElement = document.createElement("div");
    progressElement.id = "progress-bar";
    progressElement.className = "progress";

    const amountContainerElement = document.createElement("div");
    amountContainerElement.id = "amount-container"
    amountContainerElement.className = "amount_container";  
    progressElement.appendChild(amountContainerElement);

    const linearProgressRootElement = document.createElement("div");
    linearProgressRootElement.className = "linear_progress_root";
    linearProgressRootElement.id = "progress-root";
    amountContainerElement.appendChild(linearProgressRootElement);

    linearProgressBarElement = document.createElement("div");
    linearProgressBarElement.className = "linear_progress_bar";
    linearProgressBarElement.id = "linear-bar";
    linearProgressRootElement.appendChild(linearProgressBarElement);

    textElement = document.createElement("div");
    textElement.className = "text";
    textElement.id = "text-progress";
    progressElement.appendChild(textElement);

    unityElement.appendChild(progressElement);

}

function unityProgress(progress) {
    let linearProgressBarElement = document.getElementById("linear-bar");
    let textElement = document.getElementById("text-progress");
    if (linearProgressBarElement !== null) {
        let progress_value = Math.round(100 * progress);
        let progress_value_text = progress_value + "%";
        linearProgressBarElement.style.transform = `translateX(${progress_value - 100}%)`;
        textElement.setAttribute('loading_text', progress_value_text);
    }
}

function hideProgressBar(unityInstance) {
    let progressElement = document.getElementById("progress-bar");
    if (progressElement !== null)
        progressElement.style.display = "none";
    return unityInstance;
}
