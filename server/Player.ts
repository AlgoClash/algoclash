class Player{

    id: string;
    // userName?: string;
    score: number;

    constructor(id){//, userName){
        this.id = id;
        // this.userName = userName;
        this.score = 0;
    }

    addScore(): void{
        this.score++;
    }
  
}

module.exports = Player;