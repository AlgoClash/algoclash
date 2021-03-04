import React, { useEffect, useRef } from 'react';
import Countdown, {zeroPad} from 'react-countdown';

const Submit = (props) => {

    const clockRef: any = useRef<Countdown>();

    const handleStart = (): void => clockRef.current?.start();
    const handleStop = (): void => clockRef.current?.stop();
    const renderer: any = ({ minutes, seconds, completed, _}) => completed ? <span>Times Up</span> : <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;

    useEffect(() => {

    }, []);

    return (
        <div id='options'>
            <>
                <div id='countdown'>
                    <Countdown 
                        date={Date.now() + (600000)}
                        autoStart={false}
                        renderer={renderer}
                        ref={clockRef}
                    />
                </div>

                {/* <button id='testbtn' onClick={handleStart} >Start Counter</button> */}
            </>

            <div id='scoreboard'>
                <h2 id='score' >{props.score}</h2>
                <h3 id='round' >{props.round} of {props.totalRounds}</h3>
            </div>

            <div id='btncontainer' >
                <button id='testbtn' onClick={props.evaluateCode} >TEST</button>
                <button>SUBMIT</button>
            </div>
        </div>
    );
}

export default Submit;