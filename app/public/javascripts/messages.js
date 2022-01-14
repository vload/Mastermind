(function (exports) {
    /*
     * Guesser to server: send guess data
     */
    exports.T_GUESS = "GUESS";
    exports.O_GUESS = {
        type: exports.T_GUESS,
    };

    /*
     * Server to guesser: send feedback data
     */
    exports.T_FEEDBACK = "FEEDBACK";
    exports.O_FEEDBACK = {
        type: exports.T_FEEDBACK,
    };

    /*
     * Server to guesser: you win
     */
    exports.T_WIN = "WIN";
    exports.O_WIN = {
        type: exports.T_WIN,
    };
    exports.S_WIN = JSON.stringify(exports.O_WIN);

    /*
     * Server to guesser: you lose
     */
    exports.T_LOSE = "LOSE";
    exports.O_LOSE = {
        type: exports.T_LOSE,
    };
    exports.S_LOSE = JSON.stringify(exports.O_LOSE);

    /*
     * Server to guesser: game aborted
     */
    exports.T_ABORT = "ABORT";
    exports.O_ABORT = {
        type: exports.T_ABORT,
    };
    exports.S_ABORT = JSON.stringify(exports.O_ABORT);

    /*
     * Server to guesser: all players connected
     */
    exports.T_PLAYERS_CONNECTED = "PLAYERS CONNECTED";
    exports.O_PLAYERS_CONNECTED = {
        type: exports.T_PLAYERS_CONNECTED,
    };
    exports.S_PLAYERS_CONNECTED = JSON.stringify(exports.O_PLAYERS_CONNECTED);
})(typeof exports === "undefined" ? (this.Messages = {}) : exports);
//if exports is undefined, we are on the client; else the server
