const gameStats = {
    since: Date.now() /* since we keep it simple and in-memory, keep track of when this object was created */,
    startedGames: 0 /* number of games initialized */,
    abortedGames: 0 /* number of games aborted */,
    completedGames: 0 /* number of games successfully completed */
};

module.exports = gameStats;