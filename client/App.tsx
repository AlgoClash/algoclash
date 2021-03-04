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

    enum gameState {
        lobby,
        ready,
        play,
        review,
        end
    }

    const [game, setGameState] = useState<gameState>(gameState.lobby);
    
    const [time, updateTime] = useState<Number>(600);
    const [totalRounds, setTotalRounds] = useState<Number>(3);
    const [round, nextRound] = useState<number>(1);
    const [wins, addWin] = useState<number>(0);
    const [score, calculateScore] = useState<string>(100 * (wins / round) +'%');

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('');
    const [playerConsole, writeConsole] = useState<any>('console.log "start" to begin the game...');
    const [question, setQuestion] = useState<string>(``);
    const [tests, setTests] = useState<string>('');

    const [collapsed, collapseChallenger] = useState<Boolean>(false);
    const [modal, toggleModal] = useState<Boolean>(true);
    const [modalTitle, setModalTitle] = useState<String>('');
    const [modalContent, setModalContent] = useState<any>(null);

    const [theme, setTheme] = useState<string>('');

    useEffect(() => {

        socket.current = io();

        socket.current.on('connect', () => socket.current?.emit('connectClient'));
        socket.current.on('connectSuccess', data => setID(data.socketID));

        // setPlayerCode(EXanswer);
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

        socket.current?.on('readySuccess', data => {
            console.log(data);
        });

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
        const { code, log } = executeCode(playerCode);
        writeConsole(playerConsole + '\n' + log);

        if (game === gameState.lobby && log === 'start') socket.current?.emit('readyup', {roomID: room, userID: id});
    }

    const createModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);

        toggleModal(true);
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>

            <Navbar createModal={createModal} room={room} createRoom={createRoom} joinRoom={joinRoom} theme={theme} setTheme={setTheme} />

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

                    <Submit score={score} round={round} totalRounds={totalRounds} time={time} evaluateCode={evaluateCode} />

                </div>

            </div>
        </>
    );
}

export default App;
       