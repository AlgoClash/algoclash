import React, { useEffect, useRef, memo } from 'react';
import Countdown, {zeroPad} from 'react-countdown';

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
    setGameState: Function;
    totalRounds: number;
    evaluateCode: Function;
    submitCode: Function;
}

const Options = memo<Props>(({score, round, game, setGameState, totalRounds, evaluateCode, submitCode}) => {

    const clockRef: any = useRef<Countdown>();

    const handleStart = (): void => clockRef.current?.start();
    const handleStop = (): void => clockRef.current?.stop();
    const renderer: any = ({ minutes, seconds, completed, _}) => {
        if (completed){
            round < totalRounds ? setGameState(gameState.review) : setGameState(gameState.end);
            return <span>Times Up</span>;
        } else return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };

    useEffect(() => {

        if (gameState[game] === 'play') handleStart();
        else handleStop();

    }, [game]);

    return (
        <div id='options'>
            <>
                <div id='countdown'>
                    <Countdown 
                        date={Date.now() + (600000 / 20)}
                        autoStart={false}
                        renderer={renderer}
                        ref={clockRef}
                    />
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