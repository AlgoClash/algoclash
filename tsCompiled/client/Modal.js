"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Modal = (props) => {
    return (react_1.default.createElement("div", { id: 'modalcontainer', style: { opacity: `${!props.contents ? '0' : '1'}` } },
        react_1.default.createElement("div", { className: 'header' }, props.title),
        react_1.default.createElement("div", { id: 'contents' }, props.contents)));
};
exports.default = Modal;
//# sourceMappingURL=Modal.js.map