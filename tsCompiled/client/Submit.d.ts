import React from 'react';
declare enum gameState {
    lobby = 0,
    ready = 1,
    play = 2,
    review = 3,
    end = 4
}
interface Props {
    score: string;
    round: number;
    game: gameState;
    setGameState: Function;
    totalRounds: number;
    evaluateCode: Function;
    submitCode: Function;
}
declare const Submit: React.NamedExoticComponent<Props>;
export default Submit;
