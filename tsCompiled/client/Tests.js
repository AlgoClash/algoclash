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
    const [code, testCode] = react_1.useState('');
    react_1.useEffect(() => {
        if (!props.test)
            return;
        testCode(props.playerCode);
        props.runTest(false);
    }, [props.test]);
    const srcDoc = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>

    <script src="https://unpkg.com/chai/chai.js"></script>
    <script src="https://unpkg.com/mocha/mocha.js"></script>

    <script class="mocha-init">
      mocha.setup('bdd');
      mocha.checkLeaks();
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/expect.js/0.3.1/index.min.js"></script>

    <script>${code}</script>
    
    <script>describe('clone', function() {
        it('should return shallow copy of object', function() {
          var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
          var shallowClone = clone(users);
          expect(shallowClone[0].user).to.equal(users[0].user);
          expect(shallowClone[0]).to.equal(users[0]);
        });
      });</script>

    <script class="mocha-exec">
      mocha.run();
    </script>

    <style>html{background-color:white;}</style>

  </body>
</html>`;
    return (react_1.default.createElement("div", { id: 'test', className: 'container' },
        react_1.default.createElement("div", { className: 'header' },
            react_1.default.createElement("a", { onClick: () => toggleChecks(false), style: { userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '14px' : '16px'}`, opacity: `${checks ? '.6' : '1'}` } }, "Tests"),
            " ",
            react_1.default.createElement("a", { onClick: () => toggleChecks(true), style: { userSelect: 'none', cursor: 'pointer', fontSize: `${checks ? '16px' : '14px'}`, opacity: `${checks ? '1' : '.6'}` } }, "/Checks")),
        checks ?
            react_1.default.createElement("div", { id: 'mocha' },
                react_1.default.createElement("iframe", { srcDoc: srcDoc, id: 'iframe', title: 'output', sandbox: 'allow-scripts', frameBorder: '0', width: '100%', height: '100%' })) : react_1.default.createElement(react_codemirror_1.default, { options: options, value: props.value })));
};
exports.default = Tests;
//# sourceMappingURL=Tests.js.map