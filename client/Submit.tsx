import React, { useRef } from 'react';
import Countdown, {zeroPad} from 'react-countdown';

const Submit = (props) => {
    // https://stackoverflow.com/questions/59130667/how-to-call-start-and-pause-functions-from-the-react-countdown-now-library#59132405
    const clockRef = useRef();
    const handleStart = () => clockRef.current.start();

    const renderer = ({ minutes, seconds, completed, api}) => {
        console.log(api)
        if (completed) {
          // Render a completed state
          return <span>Times Up</span>;
        } else {
          // Render a countdown
          return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
      };

    return (
        <div id='options'>
            <div>
                <h1>
                    <Countdown 
                        date={Date.now() + (.1 * 60 * 1000)}
                        autoStart={false}
                        renderer={renderer}
                        ref={clockRef}
                    />
                </h1>
                <button id='testbtn' onClick={handleStart} >Start Counter</button>
                <button id='testbtn' onClick={props.startTimer} >Start Counter</button>
            </div>

            <div id='scoreboard'>
                <h2 id='score' >{props.score}</h2>
                <h3 id='round' >{props.round} of {props.totalRounds}</h3>
            </div>

            <div id='btncontainer' >
                <button id='testbtn' onClick={props.evaluateCode} >TEST</button>
                <button>SUBMIT</button>
            </div>
        </div>
    )
}

export default Submit;

//<h1 id='timer' >{props.time}</h1>