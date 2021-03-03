import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Modal from './Modal';

import Editor from './Editor';
import Console from './Console';
import Question from './Question';
import Tests from './Tests';

import { EXanswer, EXquestion, EXtests } from '../testdata.js';

const App = () => {

    const [id, setID] = useState<string>('');
    const [time, updateTime] = useState<Number>(600);
    const [totalRounds, setTotalRounds] = useState<Number>(3);
    const [round, nextRound] = useState<number>(1);
    const [wins, addWin] = useState<number>(0);
    const [score, calculateScore] = useState<String>(100 * (wins / round) + '%');

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('const test = (arg) => { console.log("hello!"); }');

    const [js, writeJS] = useState<string>('');

    const [question, setQuestion] = useState<string>(``);
    const [tests, setTests] = useState<string>('');

    const [playerConsole, writeConsole] = useState<string>('');

    const [collapsed, collapseChallenger] = useState<Boolean>(false);
    const [modal, toggleModal] = useState<Boolean>(false);
    const [modalTitle, setModalTitle] = useState<String>('');
    const [modalContent, setModalContent] = useState<any>(null);

    const [theme, setTheme] = useState<String>('dark');
    // compAlgos array holds completed algo names - need to invoke addAlgo(...compAlgos, curAlgo) on successful algo completion
    const [compAlgos, setCompAlgos] = useState<string[]>([]);
    // will hold current algo's name
    const [curAlgo, setCurAlgo] = useState<string>('');

    useEffect(() => {
        //Grab socket information
        setID('benji');
        setPlayerCode(EXanswer);        
    }, []);

    useEffect(() => {
        setChallengerCode(playerCode);
    }, [playerCode]);

    // request new algo from db onmount & when a new completed algo is added to compAlgos
    // not sure where this goes, inside socket server?
    useEffect(() => {
      // pass compAlgos array to get non-completed algo
      fetch('/algo', {
        method: 'POST', 
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(compAlgos)
      })
      .then(res => res.json())
      .then(algo => {
        console.log('algo returned from fetch:', algo);
        // sets returned algo question
        setQuestion(algo.question);
        // sets returned algo tests
        setTests(algo.tests);
        // store current algo name
        setCurAlgo(algo.algoName);
      })
  }, [compAlgos]);

    const writeToDom = () => {
        // createModal('submit', (
        // <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
        //     <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Are you sure you want to submit this answer?</h1>
        //     <button>Confirm</button>
        // </div>));

        // on successful question completion, add algo name to compAlgos
        if(curAlgo.length) {
          setCompAlgos([...compAlgos, curAlgo])
        }

        // writeJS(playerCode);
    }

    const evaluateCode = () => {
        try {
            console.log(playerCode);
            writeConsole(eval(playerCode).toString()); 
        } catch (e) {
            if (e instanceof SyntaxError) {
                writeConsole((e.message).toString());
            } else {
                throw e;
            }
        }
    }

    const createModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);

        toggleModal(true);
    }

    return (
        <>

            <Navbar createModal={createModal} />
            {modal ? <Modal title={modalTitle} contents={modalContent} /> : ''}
            <div id='preventclick' onClick={() => toggleModal(false)} style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: modal ? 50 : -10, backgroundColor: `${modal ? 'rgba(0,0,0,.3)' : 'transparent'}`}} />

            <div id='appcontainer' style={{filter: `${modal ? 'blur(5px)' : ''}`}}>

                <div id='questioncontainer'>
                    <Question value={question} theme={theme} />
                </div>

                <div id='editorcontainer' className={`${collapsed ? 'collapsed' : ''}`}>
                    <Editor user='player' username={`${id} (You)`} lanuage='js' value={playerCode} onChange={setPlayerCode} collapse={collapseChallenger} collapsed={collapsed} theme={theme} />
                    {collapsed ? '' : <Editor user='challenger' username={'challenger'} lanuage='js' value={challengerCode} onChange={setChallengerCode} theme={theme} />}
                </div>
                
                <div id='testcontainer'>
                    <Tests value={tests} theme={theme} js={js} />
                </div>

                <div id='consolecontainer'>
                    <Console value={playerConsole} />
                </div>

                <div id='optionscontainer'>
                    <h1 id='timer' >00:30.999</h1>

                    <div id='scoreboard'>
                        <h2 id='score' >{score}</h2>
                        <h3 id='round' >{round} of {totalRounds}</h3>
                    </div>

                    <div id='btncontainer' >
                        <button id='testbtn' onClick={evaluateCode} >TEST</button>
                        <button id='submitbtn' onClick={writeToDom} >SUBMIT</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default App;