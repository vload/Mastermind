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
    for (let i = 0; i < guesses; i++) {
        getGrid().appendChild(generateGuessResponse(i));

        for (let j = 0; j < columns; j++)
            getGrid().appendChild(generateGuessBox(i, j));
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
    colorButton.id = color + '-button-' + j;
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
    for (let j = 0; j < columns; j++)
        getGrid().appendChild(generateColorSelector(j));
}

function setGridLayout() {
    getGrid().style.gridTemplateColumns =
        '1fr '.repeat(columns + 1);

    getGrid().style.gridTemplateRows =
        '2fr ' + '1fr '.repeat(guesses);
}

function showGameGrid() {
    getGrid().style.display = 'grid';
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

function generateGameGrid() {
    let body = document.getElementsByTagName('body')[0];
    let gameGrid = getNewDiv();
    gameGrid.id = "game-grid";

    body.appendChild(gameGrid);
}

function generateGuessButton() {
    let guessButton = getNewDiv();
    guessButton.id = "test-button";
    guessButton.classList.add('box');
    guessButton.classList.add('first-button');
    guessButton.setAttribute('onclick', 'onGuessButtonClick(this)');
    guessButton.innerHTML = "<p>Guess</p>";

    getGrid().appendChild(guessButton);
}

function generatePage() {
    generateGameGrid();
    generateGuessButton();

    setGridLayout();
    generateColorSelectors();
    generateColorButtons();
    generateInnerBoxesAndColorElements();
    generateGuessBoxesAndGuessResponseBoxes();
    generateGuessResponseItems();
    showGameGrid();
}

function generateAbortMessage() {
    let body = document.getElementsByTagName('body')[0];

    body.innerHTML = '<p style="font-size:10">Game Aborted<p>';
}


function generateWinMessage() {
    let body = document.getElementsByTagName('body')[0];

    body.innerHTML = '<p style="font-size:10">You win<p>';
}

function generateLoseMessage() {
    let body = document.getElementsByTagName('body')[0];

    body.innerHTML = '<p style="font-size:10">You lose<p>';
}