"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_codemirror_1 = __importDefault(require("@skidding/react-codemirror"));
require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/lesser-dark.css");
const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'lesser-dark',
};
const Editor = (props) => {
    const handleChange = (editor, data, value) => {
        props.onChange(value);
    };
    return (react_1.default.createElement("div", { className: 'editorcontainer' },
        react_1.default.createElement("div", { className: 'header' }, props.username),
        react_1.default.createElement(react_codemirror_1.default, { onChange: handleChange, options: options, value: props.value })));
};
exports.default = Editor;
//# sourceMappingURL=Editor.js.map