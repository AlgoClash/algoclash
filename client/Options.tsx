import React, { useEffect, useRef, memo } from 'react';

enum gameState {
    lobby,
    ready,
    play,
    review,
    end
}

interface Props{
    score: string;
    round: number;
    game: gameState;
    totalRounds: number;
    evaluateCode: Function;
    submitCode: Function;
    timer: number;
}

const Options = memo<Props>(({score, round, game, timer, totalRounds, evaluateCode, submitCode}) => {

    return (
        <div id='options'>
            <>
                <div id='countdown'>
                    {timer}
                </div>    
                <div id='gamestate'>{gameState[game]}</div>
            </>

            <hr/>

            <div id='scoreboard'>
                <h2 id='score' >{score}</h2>
                <h3 id='round' >{round} of {totalRounds}</h3>
            </div>

            <div id='btncontainer' >
                <button id='testbtn' onClick={() => evaluateCode()} >TEST</button>
                <button id='submitbtn' onClick={() => submitCode()}>SUBMIT</button>
            </div>
        </div>
    );
});

export default Options;