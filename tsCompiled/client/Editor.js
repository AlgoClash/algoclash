"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_codemirror_1 = __importDefault(require("@skidding/react-codemirror"));
const Editor = (props) => {
    const options = {
        lineNumbers: true,
        lineWrapping: true,
        lint: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };
    const handleChange = (value) => {
        props.onChange(value);
    };
    return (react_1.default.createElement("div", { className: 'ide container' },
        react_1.default.createElement("div", { className: 'header' },
            props.username,
            props.user === 'challenger' ? '' : react_1.default.createElement("button", { id: 'collapse', onClick: () => props.collapse(!props.collapsed) }, props.collapsed ? `<<` : `>>`)),
        react_1.default.createElement("div", { className: `editor ${props.user === 'challenger' ? 'challenger' : 'player'} ${props.gameState[props.game] === 'play' ? 'blur' : ''} ` },
            react_1.default.createElement(react_codemirror_1.default, { onChange: handleChange, options: options, value: props.value }))));
};
exports.default = Editor;
//# sourceMappingURL=Editor.js.map