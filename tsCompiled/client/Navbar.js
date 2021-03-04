"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Login_1 = __importDefault(require("./Login"));
const Navbar = (props) => {
    const createSignInModal = () => {
        props.createModal('Login/Sign Up', (react_1.default.createElement(Login_1.default, { toggleModal: props.toggleModal })));
    };
    const toggleTheme = () => {
        if (props.theme === 'dark')
            props.setTheme('light');
        if (props.theme === 'light')
            props.setTheme('');
        if (props.theme === '')
            props.setTheme('dark');
    };
    return (react_1.default.createElement("div", { id: 'navbar' },
        react_1.default.createElement("a", { href: "/" }, "Algo Clash"),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement("p", null, "Room:"),
            " ",
            react_1.default.createElement("h1", null, props.room)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("a", { onClick: createSignInModal }, "Login/Sign Up"),
            react_1.default.createElement("a", { onClick: toggleTheme }, `≡`))));
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map