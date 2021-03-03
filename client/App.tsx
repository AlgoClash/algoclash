import React, { useState, useEffect, useRef } from 'react';

import Navbar from './Navbar';
import Modal from './Modal';

import CreateRoom from './CreateRoom';

import Editor from './Editor';
import Console from './Console';
import Question from './Question';
import Tests from './Tests';
import Submit from './Submit';

import { io, Socket } from "socket.io-client";

import { EXanswer, EXquestion, EXtests } from '../testdata.js';
import executeCode from './execute';

const App = () => {

    const [id, setID] = useState<string>('');
    const [challengerid, setChallengerID] = useState<string>('Waiting for partner...');
    const socket = useRef<Socket>();
    const [room, setRoom] = useState<string>('');
    
    const [time, updateTime] = useState<Number>(600);
    const [totalRounds, setTotalRounds] = useState<Number>(3);
    const [round, nextRound] = useState<number>(1);
    const [wins, addWin] = useState<number>(0);
    const [score, calculateScore] = useState<string>('0%'); //100 * (wins / round) +'%'

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('const test = (arg) => { console.log("hello!"); }');

    const [question, setQuestion] = useState<string>(``);
    const [tests, setTests] = useState<string>('');

    const [playerConsole, writeConsole] = useState<any>('');

    const [collapsed, collapseChallenger] = useState<Boolean>(false);
    const [modal, toggleModal] = useState<Boolean>(true);
    const [modalTitle, setModalTitle] = useState<String>('');
    const [modalContent, setModalContent] = useState<any>(null);

    const [theme, setTheme] = useState<String>('dark');

    const [ready, setTimer] = useState<Boolean>(false);

    useEffect(() => {

        socket.current = io();

        socket.current.on('connect', () => socket.current?.emit('connectClient'));
        socket.current.on('connectSuccess', data => setID(data.socketID));

        setPlayerCode(EXanswer);
        setQuestion(EXquestion);
        setTests(EXtests);

        return () => { socket.current?.disconnect(); };

    }, []);

    useEffect(() => {

        if (id === '') return;

        createModal('Enter a Room', <CreateRoom createRoom={createRoom} joinRoom={joinRoom} />)

        socket.current?.on('playerJoined', ({totalPlayers}) => {
            if (totalPlayers.length > 1) setChallengerID(totalPlayers.filter(playerID => playerID !== id)[0]);
        });

        socket.current?.on('writeCode', ({userID, code}) => {
            if (userID === id) return;
            setChallengerCode(code);
        });

        socket.current?.on('createSuccess', ({roomID}) => {
            joinRoom(roomID);
        })

    }, [id]);

    const createRoom = (roomID: string): void => {
        setRoom(roomID);
        socket.current?.emit('createRoom', {roomID});
        toggleModal(false);
    }

    const joinRoom = (roomID: string): void => {
        setRoom(roomID);
        socket.current?.emit('joinRoom', {userID: id, roomID});
        toggleModal(false);

    }

    useEffect(() => {
        if (room === '') return;
        socket.current?.emit('keyDown', {roomID: room, userID: id, code: playerCode});
    }, [playerCode]);

    const evaluateCode = () => {
        const code = executeCode(playerCode);
        writeConsole(code);
    }

    const createModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);

        toggleModal(true);
    }

    const startTimer = () => {
        console.log('challenger id', challengerid)
        if (challengerid === 'Waiting for partner...') {
            console.log('timer can start')
        } else {
            console.log('waiting on other player')
        }
        if (!ready) setTimer(true)
    }

    useEffect(() => {
        if (ready === false) return;
        console.log('useEffect for ready working')
        socket.current?.emit('ready', {key: 'ready button clicked'});
        socket.current?.on('ready2', (data) => {
            console.log('ready2 response triggered')
        })
    }, [ready]);

    return (
        <>


            <Navbar createModal={createModal} room={room} createRoom={createRoom} joinRoom={joinRoom} />
            {modal ? <Modal title={modalTitle} contents={modalContent} /> : ''}
            <div id='preventclick' onClick={() => {if (room !== '') toggleModal(false)}} style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: modal ? 50 : -10, backgroundColor: `${modal ? 'rgba(0,0,0,.3)' : 'transparent'}`}} />

            <div id='appcontainer' style={{filter: `${modal ? 'blur(5px)' : ''}`}}>

                <div id='questioncontainer'>
                    <Question value={question} theme={theme} />
                </div>

                <div id='editorcontainer' className={`${collapsed ? 'collapsed' : ''}`}>
                    <Editor user='player' username={`${id} (You)`} lanuage='js' value={playerCode} onChange={setPlayerCode} collapse={collapseChallenger} collapsed={collapsed} theme={theme} />
                    {collapsed ? '' : <Editor user='challenger' username={`${challengerid} (Them)`} lanuage='js' value={challengerCode} onChange={setChallengerCode} theme={theme} />}
                </div>
                
                <div id='testcontainer'>
                    <Tests value={tests} theme={theme} />
                </div>

                <div id='consolecontainer'>
                    <Console value={playerConsole} />
                </div>

                <div id='optionscontainer'>
                    <Submit score={score} round={round} totalRounds={totalRounds} time={time} startTimer={startTimer}/>
                </div>

            </div>
        </>
    );
}

export default App;
       