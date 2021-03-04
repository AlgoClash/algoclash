"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_codemirror_1 = __importDefault(require("@skidding/react-codemirror"));
const Console = (props) => {
    const options = {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true,
        mode: 'language',
        theme: 'colorforth',
    };
    return (react_1.default.createElement("div", { className: 'console container' },
        react_1.default.createElement("div", { className: 'header' }, "Console"),
        react_1.default.createElement(react_codemirror_1.default, { options: options, value: props.value })));
};
exports.default = Console;
//# sourceMappingURL=Console.js.map