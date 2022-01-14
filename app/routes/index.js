const express = require('express');
const router = express.Router();

const gameStats = require("../gameStats");

router.get("/play", function (req, res) {
    res.sendFile("game.html", { root: "./public" });
});

router.get("/", function (req, res) {
    // res.sendFile("splash.html", { root: "./public" });

    res.render("splash.ejs", {
        startedGames: gameStats.startedGames,
        abortedGames: gameStats.abortedGames,
        completedGames: gameStats.completedGames 
    });
});
module.exports = router;
