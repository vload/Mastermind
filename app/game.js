const websocket = require("ws");

const messages = require("./public/javascripts/messages");

const columns = 4;
const guesses = 12;
const colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 165, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 128, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)"];

function Game(id) {
    this.getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    this.endGame = () => {
        let winnerScore = 100;

        this.players.forEach(player => {
            if (winnerScore > player.guesses) {
                winnerScore = player.guesses;
            }
        });

        this.players.forEach(player => {
            if (player.guesses !== winnerScore)
                player.con.send(messages.S_LOSE);
            else
                player.con.send(messages.S_WIN);
        });

        this.finalStatus = true;
        this.players = null;
    }

    this.handleCorrectGuess = (player) => {
        player.finished = true;
        let allPlayersFinished = true;

        this.players.forEach(player => {
            if (!player.finished)
                allPlayersFinished = false;
        });

        if (allPlayersFinished)
            this.endGame();
    }

    this.handleGuess = (guessedColors, player) => {
        if (player.guesses == 12) {
            console.log(`[WARN] Player ${player} tried to guess too many times.`);
            return;
        }

        let blacks = 0;
        let whites = 0;

        player.guesses++;

        for (let i = 0; i < columns; i++) {
            if (guessedColors[i] == this.secret[i]) {
                guessedColors[i] = 'black';
                blacks++;
            }
        }

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < columns; j++) {
                if (guessedColors[i] == this.secret[j]) {
                    guessedColors[i] = 'white';
                    whites++;

                    break;
                }
            }
        }

        let feedback = [];

        for (let i = 0; i < blacks; i++)
            feedback.push("black");

        for (let i = 0; i < whites; i++)
            feedback.push("white");

        let message = messages.O_FEEDBACK;
        message.data = feedback;

        player.con.send(JSON.stringify(message));

        if (blacks == 4)
            this.handleCorrectGuess(player);
    }

    this.handleMessage = (message, player) => {
        let incomingMsg = JSON.parse(message);
        console.log(`[LOG] Message: ${message}`);

        switch (incomingMsg.type) {
            case messages.T_GUESS:
                this.handleGuess(incomingMsg.data, player);
                break;
            default:
                console.log("[WARN] Unhandled message: " + incomingMsg);
        }
    }

    this.getMessageHandler = (newPlayer) => {
        return (message) => {
            this.handleMessage(message, newPlayer);
        }
    }

    this.hasTwoConnectedPlayers = () => {
        return this.players.length == 2;
    }

    this.addPlayer = (con) => {
        function Player(con, playerAmount) {
            this.con = con;
            this.id = playerAmount++;
            this.finished = false;
            this.guesses = 0;
        }

        const newPlayer = new Player(con, this.playerAmount++);

        newPlayer.con.on("message", this.getMessageHandler(newPlayer));

        this.players.push(newPlayer);

        console.log(
            `[LOG] Player ${con["id"]} placed in game ${this.id}`
        );
        
        if(this.hasTwoConnectedPlayers()){
            this.players.forEach(player => {
                player.con.send(messages.S_PLAYERS_CONNECTED);
            });
        }
    }

    // TODO: Fix bug when a game is finihed.
    this.abort = () => {
        this.players.forEach(player => {
            try {
                player.con.send(messages.S_ABORT);
            } catch (e) {
                console.log(`[LOG] Player ${player.id} closing: ${e}`);
            } finally {
                player = null;
            }

            this.finalStatus = true;
        });
    }

    this.id = id;
    this.players = [];
    this.playerAmount = 0;
    this.secret = [];

    for (let i = 0; i < columns; i++)
        this.secret.push(this.getRandomColor());

    console.log(`[LOG] secret for game with id ${id} is ${this.secret}`);
}

module.exports = Game;