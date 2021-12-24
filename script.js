function onButtonClick(button) {
    let parent = button.parentNode;

    let color = window.getComputedStyle(parent, null).getPropertyValue('background-color');

    parent.parentNode.parentNode.firstElementChild.style.backgroundColor = color;
}

function generate_buttons() {
    let colors = ["red", "orange", "yellow", "blue", "magenta"];

    let container = document.querySelector('.buttons')

    for (let color of colors) {
        let button_div = document.createElement('div');
        button_div.innerHTML = "<input type='radio' name='buttons'" +
            " class='radiobox' onchange='onButtonClick(this)'>";
        button_div.className = "button";
        button_div.style = "background-color:" + color;
        container.appendChild(button_div);
    }
}

function generate_containers() {
    let elem = document.getElementsByClassName("container")[0];

    elem.parentNode.insertBefore(elem.cloneNode(deep = true), elem);
    elem.parentNode.insertBefore(elem.cloneNode(deep = true), elem);
    elem.parentNode.insertBefore(elem.cloneNode(deep = true), elem);
}

window.onload = function () {
    generate_buttons();

    generate_containers();
}