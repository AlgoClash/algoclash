import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Modal from './Modal';

import Editor from './Editor';
import Console from './Console';
import Question from './Question';
import Tests from './Tests';

const App = () => {

    const [id, setID] = useState<string>('');
    const [time, updateTime] = useState<Number>(600);
    const [totalRounds, setTotalRounds] = useState<Number>(3);
    const [round, nextRound] = useState<Number>(1);
    const [wins, addWin] = useState<Number>(0);
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

    const srcDoc = `
        <html>
            <script>${js}</script>
        </html>
    `;

    useEffect(() => {
        //Grab socket information
        setID('benji');

        setPlayerCode(
`const twoSum = (arr, target) => {
    let pair = false;

    arr.forEach((val, index) => {
        if (arr.slice(index+1, arr.length).includes(target - val))
        pair = true;
    })

    return;
}
    

const nums = [2, 5, 11, 15]
twoSum(nums, 7);`
        );

        setQuestion(
`/*
  Given an array of numbers and a target number,
  return true if two of the numbers in the array add up to the target.
  Otherwise, return false.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  The straightforward way to solve this problem would take O(n²)time. Is it possible to do this in O(n) time? 

  Example:

  const nums = [2, 5, 11, 15]
  twoSum(num, 7) -> true
  Rational:  nums[0] + nums[1] = 2 + 5 = 7,

  twoSum(nums, 9) -> false
  Rational: No elements inside the array sum up to the target number
*/
        `);

        setTests(
`const { twoSum, threeSum } = require('../challenges/two-sum.js');

describe('twoSum test', () => {
  let arr;

  it('should return true if two numbers sum to n', () => {
    arr = [1, 4, 6, 12, 9];
    expect(twoSum(arr, 10)).toBe(true);
    arr = [1, 4, 6, 12, 9];
    expect(twoSum(arr, 16)).toBe(true);
    arr = [1, 4, 7, 2, 9, 0];
    expect(twoSum(arr, 7)).toBe(true);
  });

  it('should work with negative numbers', () => {
    arr = [-1, 4, 6, 12, 9];
    expect(twoSum(arr, 8)).toBe(true);
    arr = [-1, -1, -2, -4, -5]
    expect(twoSum(arr, -2)).toBe(true);
  });

  it('should return false if two numbers DO NOT sum to n', () => {
    arr = [1, 4, 6, 12, 9];
    expect(twoSum(arr, 2)).toBe(false);
    arr = [1, 4, 6, 12, 9];
    expect(twoSum(arr, 45)).toBe(false);
    arr = [1, 4, 7, 2, 9, 0];
    expect(twoSum(arr, 17)).toBe(false);
  });

});

xdescribe('threeSum test', () => {
  let arr;

  it('should return true if three numbers sum to n', () => {
    arr = [2, 5, 11, 15];
    expect(threeSum(arr, 18)).toBe(true);
    arr = [2, 5, 11, 15];;
    expect(threeSum(arr, 22)).toBe(true);
    arr = [2, 5, 11, 15];;
    expect(threeSum(arr, 31)).toBe(true);
  });

  it('should work with negative numbers', () => {
    arr = [-1, 4, 6, 12, 9]
    expect(threeSum(arr, 22)).toBe(true);
    arr = [-1, 4, 6, 12, 9]
    expect(threeSum(arr, 9)).toBe(true);
    arr = [-1, 4, 6, 12, 9];
    expect(threeSum(arr, 20)).toBe(true);
    arr = [-1, -4, 5, 12, 9];
    expect(threeSum(arr, 0)).toBe(true);
    arr = [-1, -1, -2, -4, -5]
    expect(threeSum(arr, -4)).toBe(true);
  });

  it('should return false if three numbers DO NOT sum to n', () => {
    arr = [1, 4, 6, 12, 9];
    expect(threeSum(arr, 2)).toBe(false);
    arr = [1, 4, 6, 12, 9];
    expect(threeSum(arr, 45)).toBe(false);
    arr = [1, 4, 7, 2, 9, 0];
    expect(threeSum(arr, 19)).toBe(false);
  });

});

        `);
        
    }, []);

    useEffect(() => {
        setChallengerCode(playerCode);
    }, [playerCode]);

    const writeToDom = () => {
        
        createModal('submit', (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Are you sure you want to submit this answer?</h1>
            <button>Confirm</button>
        </div>));

        writeJS(playerCode);
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
            <div id='preventclick' onClick={() => toggleModal(false)} style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: `${modal ? '50' : '-10'}`, backgroundColor: `${modal ? 'rgba(0,0,0,.3)' : 'transparent'}`}} />

            <div id='appcontainer' style={{filter: `${modal ? 'blur(5px)' : ''}`}}>

                <div id='questioncontainer'>
                    <Question value={question} />
                </div>

                <div id='editorcontainer' className={`${collapsed ? 'collapsed' : ''}`}>
                    <Editor user='player' username={`${id} (You)`} lanuage='js' value={playerCode} onChange={setPlayerCode} collapse={collapseChallenger} collapsed={collapsed} />
                    {collapsed ? '' : <Editor user='challenger' username={'challenger'} lanuage='js' value={challengerCode} onChange={setChallengerCode} />}
                </div>
                
                <div id='testcontainer'>
                    <Tests value={tests} />
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

                {/* <div id='terminal'>
                    <iframe
                    id='iframe'
                    srcDoc={srcDoc}
                    title='output'
                    sandbox='allow-scripts'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    />
                </div> */}

            </div>
        </>
    );
}

export default App;