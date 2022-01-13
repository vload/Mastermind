'use strict';

let generated = false;
let feedbackColors;

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
    if (feedbackColors === undefined)
        setTimeout(recieveAndProcessResponse, 10);
    else
        colorAndAnimateGuessResponseItems(currentGuess++, feedbackColors);
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

    sendGuess(colors);

    colorAndAnimateGuessBoxes();
    animateAndResetColorElements();

    animateGuessResponseBox(currentGuess);

    setTimeout(recieveAndProcessResponse, 400);
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

function sendGuess(colors) {
    feedbackColors = undefined;

    let message = Messages.O_GUESS;
    message.data = colors;

    socket.send(JSON.stringify(message));
}

function handleMessage(event) {
    let incomingMsg = JSON.parse(event.data);
    console.log("[LOG] Message: " + incomingMsg);

    switch (incomingMsg.type) {
        case Messages.T_FEEDBACK:
            feedbackColors = incomingMsg.data;
            break;
        case Messages.T_ABORT:
            generateAbortMessage();
            break;
        case Messages.T_WIN:
            generateWinMessage();
            break;
        case Messages.T_LOSE:
            generateLoseMessage();
            break;
        default:
            console.log("[WARN] Unhandled message: " + incomingMsg);
    }
}

const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = handleMessage;

socket.onopen = function () {
    generatePage();
};