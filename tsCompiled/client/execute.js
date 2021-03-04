"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transpile_1 = __importDefault(require("./transpile"));
const executeCode = (code) => {
    try {
        const [output, error] = transpile_1.default(code);
        let consolelog = '';
        const override = (log) => {
            let text = String(log);
            let parsed;
            try {
                parsed = String(JSON.parse(text));
            }
            catch (error) {
                parsed = text;
            }
            return consolelog = parsed;
        };
        (function () {
            const originalError = console.error;
            const originalLog = console.log;
            console.error = function (error) {
                override(error.stack);
                originalError.apply(console, arguments);
            };
            console.log = function (...args) {
                args.forEach(override);
                originalLog.apply(console, args);
            };
        })();
        (new Function(output))();
        const message = {
            code: new Function(output),
            log: error.show ? error.errorMessage : consolelog
        };
        return message;
    }
    catch (error) {
        const message = {
            code: new Function(''),
            log: error.toString()
        };
        return error.toString();
    }
};
exports.default = executeCode;
//# sourceMappingURL=execute.js.map