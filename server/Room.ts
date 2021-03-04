class Room {

    id: string;
    players: Player[];
    questions: string;
    answered: number;
    winner: string;
    ready: number;

    constructor(id: string, questions){
        this.id = id;
        this.players = [];
        this.questions = questions;
        this.answered = 0;
        this.winner = '';
        this.ready = 0;
    }

    addPlayer(player: Player): void{
        if (this.players.length >= 2) return;
        this.players.push(player);
    }

    removePlayer(userID: string): void{
        if (this.players.length <= 0) return;
        this.players[0].id === userID ? this.players.shift() : this.players.pop();
    }

    readyup(): number{
        return ++this.ready;
    }

    resetReady(): void{
        this.ready = 0;
    }
    
    nextQuestion(): void{
        this.answered++;
    }
}

module.exports = Room;
