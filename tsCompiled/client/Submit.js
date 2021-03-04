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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_countdown_1 = __importStar(require("react-countdown"));
var gameState;
(function (gameState) {
    gameState[gameState["lobby"] = 0] = "lobby";
    gameState[gameState["ready"] = 1] = "ready";
    gameState[gameState["play"] = 2] = "play";
    gameState[gameState["review"] = 3] = "review";
    gameState[gameState["end"] = 4] = "end";
})(gameState || (gameState = {}));
const Submit = react_1.memo(({ score, round, game, setGameState, totalRounds, evaluateCode, submitCode }) => {
    const clockRef = react_1.useRef();
    const handleStart = () => { var _a; return (_a = clockRef.current) === null || _a === void 0 ? void 0 : _a.start(); };
    const handleStop = () => { var _a; return (_a = clockRef.current) === null || _a === void 0 ? void 0 : _a.stop(); };
    const renderer = ({ minutes, seconds, completed, _ }) => {
        if (completed) {
            round < totalRounds ? setGameState(gameState.review) : setGameState(gameState.end);
            return react_1.default.createElement("span", null, "Times Up");
        }
        else
            return react_1.default.createElement("span", null,
                react_countdown_1.zeroPad(minutes),
                ":",
                react_countdown_1.zeroPad(seconds));
    };
    react_1.useEffect(() => {
        if (gameState[game] === 'play')
            handleStart();
        else
            handleStop();
    }, [game]);
    return (react_1.default.createElement("div", { id: 'options' },
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { id: 'countdown' },
                react_1.default.createElement(react_countdown_1.default, { date: Date.now() + (600000 / 20), autoStart: false, renderer: renderer, ref: clockRef })),
            react_1.default.createElement("div", { id: 'gamestate' }, gameState[game])),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", { id: 'scoreboard' },
            react_1.default.createElement("h2", { id: 'score' }, score),
            react_1.default.createElement("h3", { id: 'round' },
                round,
                " of ",
                totalRounds)),
        react_1.default.createElement("div", { id: 'btncontainer' },
            react_1.default.createElement("button", { id: 'testbtn', onClick: () => evaluateCode() }, "TEST"),
            react_1.default.createElement("button", { onClick: () => submitCode() }, "SUBMIT"))));
});
exports.default = Submit;
//# sourceMappingURL=Submit.js.map