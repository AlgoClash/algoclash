"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSetup = void 0;
const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = () => __awaiter(void 0, void 0, void 0, function* () {
        const newAuthRes = yield res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log('newAuthRes:', newAuthRes);
        console.log('new auth token:', newAuthRes.id_token);
        setTimeout(refreshToken, refreshTiming);
    });
    setTimeout(refreshToken, refreshTiming);
};
exports.refreshTokenSetup = refreshTokenSetup;
//# sourceMappingURL=refreshToken.js.map