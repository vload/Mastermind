const express = require("express");
const http = require("http");
const websocket = require("ws");

const port = process.argv[2];
const app = express();

const indexRouter = require("./routes/index");

app.get("/play", indexRouter);
app.get("/", indexRouter);

app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function (ws) {
    /*
     * let's slow down the server response time a bit to
     * make the change visible on the client side
     */
    console.log("Connection state: " + ws.readyState);
    ws.send("Thanks for the message. --Your server.");
    ws.close();
    console.log("Connection state: " + ws.readyState);

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });
});

server.listen(port);