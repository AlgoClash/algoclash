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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const CreateRoom = (props) => {
    const [createRoomID, setCreateRoomID] = react_1.useState('');
    const [joinRoomID, setJoinRoomID] = react_1.useState('');
    return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1rem' } },
        react_1.default.createElement("h1", { style: { fontFamily: 'monospace', fontSize: '16px', color: 'white' } }, "Create a New Room"),
        react_1.default.createElement("input", { type: 'text', value: createRoomID, placeholder: '25 Characters Max', onChange: (e) => setCreateRoomID(e.target.value), maxLength: 25 }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { onClick: () => props.createRoom(createRoomID), disabled: createRoomID.length < 3 ? true : false }, "New Room"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("h1", { style: { fontFamily: 'monospace', fontSize: '16px', color: 'white' } }, "Join an Existing Room"),
        react_1.default.createElement("input", { type: 'text', value: joinRoomID, placeholder: 'Enter a valid room ID', onChange: (e) => setJoinRoomID(e.target.value), maxLength: 25 }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { onClick: () => props.joinRoom(joinRoomID), disabled: joinRoomID.length < 3 ? true : false }, "Join Room")));
};
exports.default = CreateRoom;
//# sourceMappingURL=CreateRoom.js.map