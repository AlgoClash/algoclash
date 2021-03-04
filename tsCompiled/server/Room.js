"use strict";
class Room {
    constructor(id, questions) {
        this.id = id;
        this.players = [];
        this.questions = questions;
        this.answered = 0;
        this.winner = '';
        this.ready = 0;
    }
    addPlayer(player) {
        if (this.players.length >= 2)
            return;
        this.players.push(player);
    }
    removePlayer(userID) {
        if (this.players.length <= 0)
            return;
        this.players[0].id === userID ? this.players.shift() : this.players.pop();
    }
    readyup() {
        return ++this.ready;
    }
    resetReady() {
        this.ready = 0;
    }
    nextQuestion() {
        this.answered++;
    }
}
module.exports = Room;
//# sourceMappingURL=Room.js.map