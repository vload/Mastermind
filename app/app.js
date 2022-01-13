const express = require("express");
const http = require("http");
const websocket = require("ws");

const indexRouter = require("./routes/index");
const messages = require("./public/javascripts/messages");

const Game = require("./game");

if (process.argv.length < 3) {
    console.log("[ERROR] expected a port as argument (eg. 'node app.js 3000').");
    process.exit(1);
}

const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);
app.get("/", indexRouter);

const server = http.createServer(app);
const wss = new websocket.Server({ server });

const websockets = {}; //property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function () {
    for (let i in websockets) {
        if (Object.prototype.hasOwnProperty.call(websockets, i)) {
            let gameObj = websockets[i];
            //if the gameObj has a final status, the game is complete/aborted
            if (gameObj.finalStatus != null) {
                delete websockets[i];
            }
        }
    }
}, 50000);

const gameStatus = {
    since: Date.now() /* since we keep it simple and in-memory, keep track of when this object was created */,
    gamesInitialized: 0 /* number of games initialized */,
    gamesAborted: 0 /* number of games aborted */,
    gamesCompleted: 0 /* number of games successfully completed */
};

let currentGame = new Game(gameStatus.gamesInitialized++);
let connectionID = 0; //each websocket receives a unique ID

wss.on("connection", function connection(ws) {
    /*
     * two-player game: every two players are added to the same game
     */
    const con = ws;
    con["id"] = connectionID++;
    websockets[con["id"]] = currentGame;

    console.log(
        `[LOG] Player ${con["id"]} placed in game ${currentGame.id}`
    );

    /*
     * once we have two players, there is no way back;
     * a new game object is created;
     * if a player now leaves, the game is aborted (player is not preplaced)
     */
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
    }

    con.on("close", function (code) {
        /*
         * code 1001 means almost always closing initiated by the client;
         * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
         */
        console.log(`[LOG] ${con["id"]} disconnected ...`);

        if (code == 1001)
            websockets[con["id"]].abort();
        else
            console.log(`[WARN] ${con["id"]} disconnected with un4d code ${code}`);
    });
});

server.listen(port);