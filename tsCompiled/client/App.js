"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Navbar_1 = __importDefault(require("./Navbar"));
const Modal_1 = __importDefault(require("./Modal"));
const CreateRoom_1 = __importDefault(require("./CreateRoom"));
const Editor_1 = __importDefault(require("./Editor"));
const Console_1 = __importDefault(require("./Console"));
const Question_1 = __importDefault(require("./Question"));
const Tests_1 = __importDefault(require("./Tests"));
const Submit_1 = __importDefault(require("./Submit"));
const socket_io_client_1 = require("socket.io-client");
const execute_1 = __importDefault(require("./execute"));
var gameState;
(function (gameState) {
    gameState[gameState["lobby"] = 0] = "lobby";
    gameState[gameState["ready"] = 1] = "ready";
    gameState[gameState["play"] = 2] = "play";
    gameState[gameState["review"] = 3] = "review";
    gameState[gameState["end"] = 4] = "end";
})(gameState || (gameState = {}));
const App = () => {
    const [id, setID] = react_1.useState('');
    const [challengerid, setChallengerID] = react_1.useState('Waiting for partner...');
    const socket = react_1.useRef();
    const [room, setRoom] = react_1.useState('');
    const [game, setGameState] = react_1.useState(gameState.lobby);
    const [totalRounds, setTotalRounds] = react_1.useState(3);
    const [round, nextRound] = react_1.useState(0);
    const [wins, addWin] = react_1.useState(0);
    const [score, calculateScore] = react_1.useState(`0%`);
    const [playerCode, setPlayerCode] = react_1.useState('');
    const [challengerCode, setChallengerCode] = react_1.useState('asgdsgags');
    const [playerConsole, writeConsole] = react_1.useState('console.log "start" to begin the game...');
    const [question, setQuestion] = react_1.useState(``);
    const [tests, setTests] = react_1.useState('');
    const [collapsed, collapseChallenger] = react_1.useState(false);
    const [modal, toggleModal] = react_1.useState(true);
    const [modalTitle, setModalTitle] = react_1.useState('');
    const [modalContent, setModalContent] = react_1.useState(null);
    const [theme, setTheme] = react_1.useState('');
    // compAlgos array holds completed algo names - need to invoke addAlgo(...compAlgos, curAlgo) on successful algo completion
    const [compAlgos, setCompAlgos] = react_1.useState([]);
    // will hold current algo's name
    const [curAlgo, setCurAlgo] = react_1.useState('');
    react_1.useEffect(() => {
        socket.current = socket_io_client_1.io();
        socket.current.on('connect', () => { var _a; return (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('connectClient'); });
        socket.current.on('connectSuccess', data => setID(data.socketID));
        return () => { var _a; (_a = socket.current) === null || _a === void 0 ? void 0 : _a.disconnect(); };
    }, []);
    // request new algo from db onmount & when a new completed algo is added to compAlgos
    // not sure where this goes, inside socket server?
    react_1.useEffect(() => {
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
        });
    }, [compAlgos]);
    react_1.useEffect(() => {
        var _a, _b, _c, _d, _e;
        // writeJS(playerCode);
        if (id === '')
            return;
        createModal('Enter a Room', react_1.default.createElement(CreateRoom_1.default, { createRoom: createRoom, joinRoom: joinRoom }));
        (_a = socket.current) === null || _a === void 0 ? void 0 : _a.on('playerJoined', ({ totalPlayers }) => {
            if (totalPlayers.length > 1)
                setChallengerID(totalPlayers.filter(playerID => playerID !== id)[0]);
        });
        (_b = socket.current) === null || _b === void 0 ? void 0 : _b.on('writeCode', ({ userID, code }) => {
            if (userID === id)
                return;
            setChallengerCode(code);
        });
        (_c = socket.current) === null || _c === void 0 ? void 0 : _c.on('createSuccess', ({ roomID }) => {
            joinRoom(roomID);
        });
        (_d = socket.current) === null || _d === void 0 ? void 0 : _d.on('readySuccess', data => {
            console.log(data);
            setGameState(gameState.ready);
        });
        (_e = socket.current) === null || _e === void 0 ? void 0 : _e.on('startGame', data => {
            nextRound(round + 1);
            setGameState(gameState.play);
        });
    }, [id]);
    const createRoom = (roomID) => {
        var _a;
        setRoom(roomID);
        (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('createRoom', { roomID });
        toggleModal(false);
    };
    const joinRoom = (roomID) => {
        var _a;
        setRoom(roomID);
        (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('joinRoom', { userID: id, roomID });
        toggleModal(false);
    };
    react_1.useEffect(() => {
        var _a;
        if (room === '')
            return;
        (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('keyDown', { roomID: room, userID: id, code: playerCode });
    }, [playerCode]);
    react_1.useEffect(() => {
        var _a;
        if (gameState[game] === 'review') {
            (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('resetRound', { roomID: room });
            writeConsole(`\n console.log "next" to begin the next round...`);
        }
    }, [game]);
    react_1.useEffect(() => {
        wins === 0 ? calculateScore('0%') : calculateScore(100 * (wins / round) + '%');
    }, [round]);
    const evaluateCode = () => {
        var _a;
        const { code, log } = execute_1.default(playerCode);
        writeConsole(playerConsole + '\n' + log);
        if ((game === gameState.lobby && log === 'start') || (game === gameState.review && log === 'next'))
            (_a = socket.current) === null || _a === void 0 ? void 0 : _a.emit('readyup', { roomID: room });
    };
    // placeholder function to test getting new algos
    const submitCode = () => {
        // adds completed algo name to array on sucessfull answer
        if (curAlgo.length) {
            setCompAlgos([...compAlgos, curAlgo]);
        }
    };
    const createModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        toggleModal(true);
    };
    react_1.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Navbar_1.default, { createModal: createModal, room: room, createRoom: createRoom, joinRoom: joinRoom, theme: theme, setTheme: setTheme }),
        modal ? react_1.default.createElement(Modal_1.default, { title: modalTitle, contents: modalContent }) : '',
        react_1.default.createElement("div", { id: 'preventclick', onClick: () => { if (room !== '')
                toggleModal(false); }, style: { width: '100vw', height: '100vh', position: 'fixed', zIndex: modal ? 50 : -10, backgroundColor: `${modal ? 'rgba(0,0,0,.3)' : 'transparent'}` } }),
        react_1.default.createElement("div", { id: 'appcontainer', style: { filter: `${modal ? 'blur(5px)' : ''}` } },
            react_1.default.createElement("div", { id: 'questioncontainer' },
                react_1.default.createElement(Question_1.default, { value: question, theme: theme })),
            react_1.default.createElement("div", { id: 'editorcontainer', className: `${collapsed ? 'collapsed' : ''}` },
                react_1.default.createElement(Editor_1.default, { user: 'player', username: `${id} (You)`, lanuage: 'js', value: playerCode, onChange: setPlayerCode, collapse: collapseChallenger, collapsed: collapsed, gameState: gameState, game: game, theme: theme }),
                collapsed ? '' : react_1.default.createElement(Editor_1.default, { user: 'challenger', username: `${challengerid} (Them)`, lanuage: 'js', value: challengerCode, gameState: gameState, game: game, onChange: setChallengerCode, theme: theme })),
            react_1.default.createElement("div", { id: 'testcontainer' },
                react_1.default.createElement(Tests_1.default, { value: tests, theme: theme })),
            react_1.default.createElement("div", { id: 'consolecontainer' },
                react_1.default.createElement(Console_1.default, { value: playerConsole })),
            react_1.default.createElement("div", { id: 'optionscontainer' },
                react_1.default.createElement(Submit_1.default, { score: score, round: round, totalRounds: totalRounds, game: game, setGameState: setGameState, evaluateCode: evaluateCode, submitCode: submitCode })))));
};
exports.default = App;
//# sourceMappingURL=App.js.map