function onButtonClick(button) {
    button.classList.add("animate-color-button");

    setTimeout(function (button) {
        let color = window.getComputedStyle(button, null).getPropertyValue('background-color');
        button.parentNode.parentNode.style.backgroundColor = color;
        button.classList.remove("animate-color-button");
    }, 400, button);
}

function onTestClick(button) {
    button.classList.add("test-button-animation");

    setTimeout(function (button) {
        let color = window.getComputedStyle(button, null).getPropertyValue('background-color');
        button.parentNode.parentNode.style.backgroundColor = color;
        button.classList.remove("test-button-animation");
    }, 1000, button);
}

function generateButtons() {
    let colors = ["red", "orange", "yellow", "green", "blue", "magenta"];

    let container = document.getElementById('buttons')

    for (let color of colors) {

        let button = document.createElement('div');
        button.className = "circle color-button";
        button.style = "background-color:" + color;
        button.setAttribute("onclick", "onButtonClick(this)");

        container.appendChild(button);
    }
}

function generateContainers() {
    let elem = document.getElementsByClassName("displaybox")[0];

    for (var i = 0; i < 3; i++)
        elem.parentNode.insertBefore(elem.cloneNode(deep = true), elem);
}

window.onload = function () {
    generateButtons();

    generateContainers();
}