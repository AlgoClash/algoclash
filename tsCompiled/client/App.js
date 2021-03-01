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
const Editor_1 = __importDefault(require("./Editor"));
require("../public/styles.scss");
const App = () => {
    const [id, setID] = react_1.useState('');
    const [code, setCode] = react_1.useState('');
    react_1.useEffect(() => {
        //Grab socket information
        setID('benji');
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Algo Clash!!!"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Editor_1.default, { username: id, lanuage: 'js', value: code, onChange: setCode })),
        react_1.default.createElement("iframe", { title: 'output', sandbox: 'allow-scripts', frameBorder: '0', width: '100%', height: '100%' })));
};
exports.default = App;
//# sourceMappingURL=App.js.map