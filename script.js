function onButtonClick(button) {
    function apply_animation(button) {
        button.classList.add("button-transition");
        button.classList.add("button-final");
    }

    function end_animation(button) {
        let color = window.getComputedStyle(button, null).getPropertyValue('background-color');
        button.parentNode.parentNode.style.backgroundColor = color;
        button.classList.remove("button-transition");
        button.classList.remove("button-final");
    }


    apply_animation(button);

    setTimeout(end_animation, 500, button);
}

function generateButtons() {
    let colors = ["red", "orange", "yellow", "green", "blue", "magenta"];

    let container = document.querySelector('.buttons')

    for (let color of colors) {

        let button = document.createElement('div');
        button.className = "dot button";
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