"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GitHubIcon_1 = __importDefault(require("./GitHubIcon"));
const react_google_login_1 = require("react-google-login");
const react_github_login_1 = __importDefault(require("react-github-login"));
const refreshToken_1 = require("../utils/refreshToken");
const googleAuth_1 = require("../utils/googleAuth");
const githubAuth_1 = require("../utils/githubAuth");
const googleClientID = googleAuth_1.clientIdGoogle;
const ghClientId = githubAuth_1.githubClientId;
const redirectURL = githubAuth_1.githubRedirectURL;
const Login = (props) => {
    let username;
    let password;
    const usernameInput = (e) => { username = e.target.value; };
    const passwordInput = (e) => { password = e.target.value; };
    const submitButton = (e) => {
        e.preventDefault();
        const body = { username, password };
        fetch('/user/signup', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
            .then(res => {
            if (res.status === 200)
                console.log('POSTED --------------', res.json());
        });
        props.toggleModal(false);
    };
    const onSuccessGoogle = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        refreshToken_1.refreshTokenSetup(res);
    };
    const onFailureGoogle = (res) => {
        console.log('[Login failed] res:', res);
    };
    const onSuccessGithub = (res) => {
        console.log('[Login Success] currentUser:', res);
    };
    const onFailureGithub = (res) => {
        console.log('[Login failed] res:', res);
    };
    return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
        react_1.default.createElement("h1", { style: { fontFamily: 'monospace', fontSize: '16px' } }, "Username"),
        react_1.default.createElement("input", { type: 'text', onChange: usernameInput }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("h1", { style: { fontFamily: 'monospace', fontSize: '16px' } }, "Password"),
        react_1.default.createElement("input", { type: 'text', onChange: passwordInput }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { onClick: submitButton, type: "button" }, "Confirm"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("div", { id: 'authbtn' },
            react_1.default.createElement(react_google_login_1.GoogleLogin, { clientId: googleClientID, cookiePolicy: 'single_host_origin', isSignedIn: true, onSuccess: onSuccessGoogle, onFailure: onFailureGoogle }),
            react_1.default.createElement(react_github_login_1.default, { clientId: ghClientId, onSuccess: onSuccessGithub, onFailure: onFailureGithub, redirectUri: redirectURL },
                react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    react_1.default.createElement(GitHubIcon_1.default, null),
                    " Sign in with GitHub")))));
};
exports.default = Login;
//# sourceMappingURL=Login.js.map