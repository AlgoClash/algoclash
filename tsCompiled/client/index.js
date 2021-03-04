"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
require("../public/styles/global.scss");
require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/lesser-dark.css");
require("codemirror/theme/base16-dark.css");
require("codemirror/theme/colorforth.css");
require("codemirror/theme/dracula.css");
react_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map