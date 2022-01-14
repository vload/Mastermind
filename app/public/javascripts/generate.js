'use strict';

const columns = 4;
const guesses = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta'];
let currentGuess = 0;

function Generator() {
    this.generateGuessResponseItem = (i, j) => {
        let guessResponseItem = this.getNewDiv();
        guessResponseItem.id = 'guess-response-item-' + i + '-' + j;
        guessResponseItem.classList.add('guess-response-item');
        guessResponseItem.classList.add('circle');

        return guessResponseItem;
    }

    this.generateGuessResponseItems = () => {
        for (let i = 0; i < guesses; i++) {
            let guessResponse = document.getElementById('guess-response-' + i);

            for (let j = 0; j < columns; j++)
                guessResponse.appendChild(this.generateGuessResponseItem(i, j));
        }
    }

    this.generateGuessResponse = (i) => {
        let guessResponse = this.getNewDiv();
        guessResponse.id = 'guess-response-' + i;
        guessResponse.classList.add('guess-response');
        guessResponse.classList.add('box');

        return guessResponse;
    }

    this.generateGuessBox = (i, j) => {
        let guessBox = this.getNewDiv();
        guessBox.id = 'guess-box-' + i + '-' + j;
        guessBox.classList.add('guess-box');
        guessBox.classList.add('box');

        return guessBox;
    }

    this.generateGuessBoxesAndGuessResponseBoxes = () => {
        for (let i = 0; i < guesses; i++) {
            this.getGrid().appendChild(this.generateGuessResponse(i));

            for (let j = 0; j < columns; j++)
                this.getGrid().appendChild(this.generateGuessBox(i, j));
        }
    }

    this.generateColorElement = (j) => {
        let colorElement = this.getNewDiv();
        colorElement.id = 'color-element-' + j;
        colorElement.classList.add('color-element');
        colorElement.classList.add('box');

        return colorElement;
    }

    this.generateInnerBox = (j) => {
        let innerBox = this.getNewDiv();
        innerBox.id = 'inner-box-' + j;
        innerBox.classList.add('inner-box');
        innerBox.classList.add('box');

        innerBox.appendChild(this.generateColorElement(j));

        return innerBox;
    }

    this.generateInnerBoxesAndColorElements = () => {
        for (let j = 0; j < columns; j++) {
            let colorSelector = document.getElementById('color-selector-' + j);

            colorSelector.appendChild(this.generateInnerBox(j));
        }
    }

    this.generateColorButton = (j, color) => {
        let colorButton = this.getNewDiv();
        colorButton.id = color + '-button-' + j;
        colorButton.classList.add('color-button');
        colorButton.classList.add('circle');
        colorButton.style = 'background-color:' + color;
        colorButton.setAttribute('onclick', 'onColorButtonClick(this)');

        return colorButton;
    }

    this.generateColorButtons = () => {
        for (let j = 0; j < columns; j++) {
            let colorSelector = document.getElementById('color-selector-' + j);

            let div = this.getNewDiv();
            div.classList.add('button-container');

            for (let color of colors)
                div.appendChild(this.generateColorButton(j, color));

            colorSelector.appendChild(div);
        }
    }

    this.generateColorSelector = (j) => {
        let colorSelector = this.getNewDiv();
        colorSelector.id = 'color-selector-' + j;
        colorSelector.classList.add('color-selector');
        colorSelector.classList.add('box');

        return colorSelector;
    }

    this.generateColorSelectors = () => {
        for (let j = 0; j < columns; j++)
            this.getGrid().appendChild(this.generateColorSelector(j));
    }

    this.setGridLayout = () => {
        this.getGrid().style.gridTemplateColumns =
            '1fr '.repeat(columns + 1);

        this.getGrid().style.gridTemplateRows =
            '2fr ' + '1fr '.repeat(guesses);
    }

    this.showGameGrid = () => {
        this.getGrid().style.display = 'grid';
    }

    this.getGrid = () => {
        return document.getElementById('game-grid');
    }

    this.getNewDiv = () => {
        return document.createElement('div');
    }

    this.getBackgroundColor = (element) => {
        return window.getComputedStyle(element).getPropertyValue('background-color');
    }

    this.generateGameGrid = () => {
        let body = document.getElementsByTagName('body')[0];
        let gameGrid = this.getNewDiv();
        gameGrid.id = "game-grid";

        body.appendChild(gameGrid);
    }

    this.generateGuessButton = () => {
        let guessButton = this.getNewDiv();
        guessButton.id = "test-button";
        guessButton.classList.add('box');
        guessButton.classList.add('first-button');
        guessButton.setAttribute('onclick', 'onGuessButtonClick(this)');
        guessButton.innerHTML = "<p>Guess</p>";

        this.getGrid().appendChild(guessButton);
    }

    this.generatePage = () => {
        this.generateGameGrid();
        this.generateGuessButton();

        this.setGridLayout();
        this.generateColorSelectors();
        this.generateColorButtons();
        this.generateInnerBoxesAndColorElements();
        this.generateGuessBoxesAndGuessResponseBoxes();
        this.generateGuessResponseItems();
        this.showGameGrid();
    }

    // TODO: make this pretty
    this.generateAbortMessage = () => {
        let body = document.getElementsByTagName('body')[0];

        body.innerHTML = '<p style="font-size:10">Game Aborted<p>';
    }

    // TODO: make this pretty
    this.generateWinMessage = () => {
        let body = document.getElementsByTagName('body')[0];

        body.innerHTML = '<p style="font-size:10">You win<p>';
    }

    // TODO: make this pretty
    this.generateLoseMessage = () => {
        let body = document.getElementsByTagName('body')[0];

        body.innerHTML = '<p style="font-size:10">You lose<p>';
    }
}