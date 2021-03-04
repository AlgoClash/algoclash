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
const react_codemirror_1 = __importDefault(require("@skidding/react-codemirror"));
const Tests = (props) => {
    const options = {
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        mode: 'javascript',
        theme: `${props.theme === 'light' ? 'default' : 'lesser-dark'}`,
    };
    const [checks, toggleChecks] = react_1.useState(false);
    return (react_1.default.createElement("div", { id: 'test', className: 'container' },
        react_1.default.createElement("div", { className: 'header' },
            react_1.default.createElement("a", { onClick: () => toggleChecks(false), style: { userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '14px' : '16px'}`, opacity: `${checks ? '.6' : '1'}` } }, "Tests"),
            " ",
            react_1.default.createElement("a", { onClick: () => toggleChecks(true), style: { userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '16px' : '14px'}`, opacity: `${checks ? '1' : '.6'}` } }, "/Checks")),
        checks ?
            react_1.default.createElement("div", { id: 'terminal' },
                react_1.default.createElement("iframe", { id: 'iframe', title: 'output', sandbox: 'allow-scripts', frameBorder: '0', width: '100%', height: '100%' })) : react_1.default.createElement(react_codemirror_1.default, { options: options, value: props.value })));
};
exports.default = Tests;
//# sourceMappingURL=Tests.js.map