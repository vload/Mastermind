'use strict';

const columns = 4;
const guesses = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta'];
let currentGuess = 0;


function generateGuessResponseItem(i, j) {
    let guessResponseItem = getNewDiv();
    guessResponseItem.id = 'guess-response-item-' + i + '-' + j;
    guessResponseItem.classList.add('guess-response-item');
    guessResponseItem.classList.add('circle');

    return guessResponseItem;
}

function generateGuessResponseItems() {
    for (let i = 0; i < guesses; i++) {
        let guessResponse = document.getElementById('guess-response-' + i);

        for (let j = 0; j < columns; j++)
            guessResponse.appendChild(generateGuessResponseItem(i, j));
    }
}

function generateGuessResponse(i) {
    let guessResponse = getNewDiv();
    guessResponse.id = 'guess-response-' + i;
    guessResponse.classList.add('guess-response');
    guessResponse.classList.add('box');

    return guessResponse;
}

function generateGuessBox(i, j) {
    let guessBox = getNewDiv();
    guessBox.id = 'guess-box-' + i + '-' + j;
    guessBox.classList.add('guess-box');
    guessBox.classList.add('box');

    return guessBox;
}

function generateGuessBoxesAndGuessResponseBoxes() {
    let grid = getGrid();

    for (let i = 0; i < guesses; i++) {
        grid.appendChild(generateGuessResponse(i));

        for (let j = 0; j < columns; j++)
            grid.appendChild(generateGuessBox(i, j));
    }
}

function generateColorElement(j) {
    let colorElement = getNewDiv();
    colorElement.id = 'color-element-' + j;
    colorElement.classList.add('color-element');
    colorElement.classList.add('box');

    return colorElement;
}

function generateInnerBox(j) {
    let innerBox = getNewDiv();
    innerBox.id = 'inner-box-' + j;
    innerBox.classList.add('inner-box');
    innerBox.classList.add('box');

    innerBox.appendChild(generateColorElement(j));

    return innerBox;
}

function generateInnerBoxesAndColorElements() {
    for (let j = 0; j < columns; j++) {
        let colorSelector = document.getElementById('color-selector-' + j);

        colorSelector.appendChild(generateInnerBox(j));
    }
}

function generateColorButton(j, color) {
    let colorButton = getNewDiv();
    colorButton.id = color + "-button-" + j;
    colorButton.classList.add('color-button');
    colorButton.classList.add('circle');
    colorButton.style = 'background-color:' + color;
    colorButton.setAttribute('onclick', 'onColorButtonClick(this)');

    return colorButton;
}

function generateColorButtons() {
    for (let j = 0; j < columns; j++) {
        let colorSelector = document.getElementById('color-selector-' + j);

        let div = getNewDiv();
        div.classList.add('button-container');

        for (let color of colors)
            div.appendChild(generateColorButton(j, color));

        colorSelector.appendChild(div);
    }
}

function generateColorSelector(j) {
    let colorSelector = getNewDiv();
    colorSelector.id = 'color-selector-' + j;
    colorSelector.classList.add('color-selector');
    colorSelector.classList.add('box');

    return colorSelector;
}

function generateColorSelectors() {
    let grid = getGrid();

    for (let j = 0; j < columns; j++)
        grid.appendChild(generateColorSelector(j));
}

function setGridLayout() {
    let grid = getGrid();

    grid.style.gridTemplateColumns =
        '1fr '.repeat(columns + 1);

    grid.style.gridTemplateRows =
        '2fr ' + '1fr '.repeat(guesses);
}

function removeWaiting() {
    let w = document.getElementById("waiting");

    w.parentNode.removeChild(w);
}

function animateColorButton(colorButton) {
    colorButton.classList.add("animate-color-button");
}

function setColorElementColor(colorButton) {
    let color = getBackgroundColor(colorButton);
    let colorSelector = colorButton.parentNode.parentNode
    let colorElement = colorSelector.querySelector(".color-element");
    colorElement.style.backgroundColor = color;
}

function endColorButtonAnimation(colorButton) {
    colorButton.classList.remove("animate-color-button");
}

function onColorButtonClick(colorButton) {
    animateColorButton(colorButton);

    setTimeout(setColorElementColor, 400, colorButton);
    setTimeout(endColorButtonAnimation, 400, colorButton);
}

function colorGuessBox(i, j) {
    let colorElement = document.getElementById('color-element-' + j)
    let color = getBackgroundColor(colorElement);
    let guessBox = document.getElementById('guess-box-' + i + '-' + j);

    guessBox.style.backgroundColor = color;
}

function animateGuessBox(i, j) {
    let guessBox = document.getElementById('guess-box-' + i + '-' + j);
    guessBox.classList.add('box-pop-in');
}

function colorAndAnimateGuessBoxes() {
    for (let j = 0; j < columns; j++) {
        colorGuessBox(currentGuess, j);
        animateGuessBox(currentGuess, j);
    }
}

function getColorSelectorsColors() {
    let resultColors = [];

    for (let j = 0; j < columns; j++) {
        let colorElement = document.getElementById('color-element-' + j)

        resultColors.push(getBackgroundColor(colorElement));
    }

    return resultColors;
}

function allColorsSet(colors) {
    for (let j = 0; j < columns; j++) {
        let colorElement = document.getElementById("color-element-" + j);

        if (getBackgroundColor(colorElement) === 'rgb(128, 128, 128)') {
            return false;
        }
    }

    return true;
}

function animateColorElement(colorElement) {
    colorElement.classList.add('animate-color-element');
}

function resetColorElementColor(colorElement) {
    colorElement.style.backgroundColor = 'gray';
}

function endColorElementAnimation(colorElement) {
    colorElement.classList.remove('animate-color-element');
}

function animateAndResetColorElements() {
    for (let j = 0; j < columns; j++) {
        let colorElement = document.getElementById('color-element-' + j);

        animateColorElement(colorElement);

        setTimeout(resetColorElementColor, 400, colorElement);
        setTimeout(endColorElementAnimation, 400, colorElement);
    }
}

function animateGuessResponseBox(i) {
    let guessResponseBox = document.getElementById('guess-response-' + i);
    guessResponseBox.classList.add('box-pop-in');
}

function colorResponseBoxes(i, colors) {
    let j = 0;
    for (let color of colors) {
        let guessResponseItem = document.getElementById('guess-response-item-' + i + '-' + j);
        guessResponseItem.style.backgroundColor = color;

        j++;
    }
}

function animateGuessResponseItems(i) {
    for (let j = 0; j < columns; j++) {
        let guessResponseItem = document.getElementById('guess-response-item-' + i + '-' + j);
        guessResponseItem.classList.add('animate-guess-response-item');
    }
}

function colorAndAnimateGuessResponseItems(i, colors) {
    colorResponseBoxes(i, colors);

    animateGuessResponseItems(i);
}

function recieveAndProcessResponse() {
    let colors = recieveResponse();

    console.log('Message recieved:');
    console.log(colors);

    setTimeout(colorAndAnimateGuessResponseItems, 400, currentGuess, colors);
}

function checkGameLogic(colors) {
    if (!allColorsSet(colors)) {
        alert("Not all colors set!");
        return false;
    }

    if (currentGuess >= guesses) {
        alert("No more guesses left!");
        return false;
    }

    return true;
}

function onGuessButtonClick(guessButton) {
    let colors = getColorSelectorsColors();

    if (!checkGameLogic(colors))
        return;

    sendMessage(colors);

    colorAndAnimateGuessBoxes();
    animateAndResetColorElements();

    animateGuessResponseBox(currentGuess);

    recieveAndProcessResponse();

    setTimeout(currentGuess++, 400);
}

function getGrid() {
    return document.getElementById('game-grid');
}

function getNewDiv() {
    return document.createElement('div');
}

function getBackgroundColor(element) {
    return window.getComputedStyle(element).getPropertyValue('background-color');
}

function sendMessage(colors) {
    console.log('Comms not implemented!');

    console.log('Message sent:');
    console.log(colors);
}

function recieveResponse() {
    console.log('Comms not implemented!');

    let response = ['black', 'black', 'white'];

    return response;
}

window.onload = function () {
    setGridLayout();
    generateColorSelectors();
    generateColorButtons();
    generateInnerBoxesAndColorElements();
    generateGuessBoxesAndGuessResponseBoxes();
    generateGuessResponseItems();

}

const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function (event) {
    alert(event);
    // target.innerHTML = event.data;
};

socket.onopen = function () {
    socket.send("Hello from the client!");
    // target.innerHTML = "Sending a first message to the server ...";

    removeWaiting();
};