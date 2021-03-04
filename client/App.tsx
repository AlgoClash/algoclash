import React, { useState, useEffect, useRef } from 'react';

import Navbar from './Navbar';
import Modal from './Modal';

import CreateRoom from './CreateRoom';

import Editor from './Editor';
import Console from './Console';
import Question from './Question';
import Tests from './Tests';
import Options from './Options';

import { io, Socket } from "socket.io-client";

import executeCode from './execute';

enum gameState {
    lobby,
    ready,
    play,
    review,
    end
}

const App = () => {

    const [id, setID] = useState<string>('');
    const [challengerid, setChallengerID] = useState<string>('Waiting for partner...');
    const socket = useRef<Socket>();
    const [room, setRoom] = useState<string>('');

    const [game, setGameState] = useState<gameState>(gameState.lobby);
    
    const startTime = 30;
    const [timer, setTimer] = useState<number>(startTime);
    const [totalRounds, setTotalRounds] = useState<number>(3);
    const [round, nextRound] = useState<number>(0);
    const [wins, addWin] = useState<number>(0);
    const [score, calculateScore] = useState<string>(`0%`);

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('');
    const [playerConsole, writeConsole] = useState<any>('console.log "start" to begin the game...');

    const [questions, setQuestions] = useState<string[]>([]);
    const [question, setQuestion] = useState<string>(``);
    const [tests, setTests] = useState<string>('');
    
    const [test, runTest] = useState<boolean>(false);

    const [collapsed, collapseChallenger] = useState<Boolean>(false);
    const [modal, toggleModal] = useState<Boolean>(true);
    const [modalTitle, setModalTitle] = useState<String>('');
    const [modalContent, setModalContent] = useState<any>(null);

    const [theme, setTheme] = useState<string>('');

    useEffect(() => {

        socket.current = io();

        socket.current.on('connect', () => socket.current?.emit('connectClient'));
        socket.current.on('connectSuccess', data => setID(data.socketID));

        return () => { socket.current?.disconnect(); };

    }, []);

    useEffect(() => {
        if (id === '') return;

        createModal('Enter a Room', <CreateRoom createRoom={createRoom} joinRoom={joinRoom} />)

        socket.current?.on('playerJoined', ({totalPlayers, roomQuestions}) => {
            if (totalPlayers.length > 1) setChallengerID(totalPlayers.filter(playerID => playerID !== id)[0]);
            setQuestions(roomQuestions);
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
            setGameState(gameState.ready);
        });

    }, [id]);

    useEffect(() => {

        if (id === '') return;

        socket.current?.on('startGame', data => {
            setQuestion(data.roomQuestions[round].question);
            setTests(data.roomQuestions[round].tests);
            clearEditors();

            nextRound(round + 1);
            setGameState(gameState.play);
        });
        
    }, [id, round]);

    useEffect(() => {
        console.log(questions);
    }, [questions]);

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

    useEffect(() => {

        if (gameState[game] === 'review'){
            socket.current?.emit('resetRound', {roomID: room});
            writeConsole(`\n console.log "next" to begin the next round...`);
        }

    }, [game]);

    useEffect(() => {
        wins === 0 ? calculateScore('0%') : calculateScore(100 * (wins / round) + '%');
    }, [round]);

    const evaluateCode = () => {
        const { code, log } = executeCode(playerCode);
        writeConsole(playerConsole + '\n' + log);
        runTest(true);

        if ((game === gameState.lobby && log === 'start') || (game === gameState.review && log === 'next')) socket.current?.emit('readyup', {roomID: room});
    }

    const endRound = () => {
        round < totalRounds ? setGameState(gameState.review) : setGameState(gameState.end);
        setTimer(startTime);
    }

    const submitCode = () => {
        addWin(wins + 1);
        endRound();
    }

    const clearEditors = () => {
        setPlayerCode('');
        setChallengerCode('');
    }

    const createModal = (title, content) => {
      setModalTitle(title);
      setModalContent(content);

      toggleModal(true);
  }

    useEffect(() => {
        if (game !== 2) return;
        setTimeout(() => setTimer(timer - 1), 1000);
    }, [game]);

    useEffect(() => {

        if (game !== 2) return;

        if (timer === 0) endRound();
        else setTimeout(() => setTimer(timer - 1), 1000);

    },[timer]);

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
                    <Editor user='player' username={`${id} (You)`} lanuage='js' value={playerCode} onChange={setPlayerCode} collapse={collapseChallenger} collapsed={collapsed} gameState={gameState} game={game} theme={theme} />
                    {collapsed ? '' : <Editor user='challenger' username={`${challengerid} (Them)`} lanuage='js' value={challengerCode} gameState={gameState} game={game} onChange={setChallengerCode} theme={theme} />}
                </div>
                
                <div id='testcontainer'>
                    <Tests value={tests} test={test} runTest={runTest} playerCode={playerCode} theme={theme} submitCode={submitCode} />
                </div>

                <div id='consolecontainer'>
                    <Console value={playerConsole} />
                </div>

                <div id='optionscontainer'>
                    <Options score={score} round={round} totalRounds={totalRounds} game={game} timer={timer} evaluateCode={evaluateCode} submitCode={submitCode} />
                </div>

            </div>
        </>
    );
}


export default App;
