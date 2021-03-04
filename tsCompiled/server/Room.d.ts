declare class Room {
    id: string;
    players: Player[];
    questions: string;
    answered: number;
    winner: string;
    ready: number;
    constructor(id: string, questions: any);
    addPlayer(player: Player): void;
    removePlayer(userID: string): void;
    readyup(): number;
    resetReady(): void;
    nextQuestion(): void;
}
