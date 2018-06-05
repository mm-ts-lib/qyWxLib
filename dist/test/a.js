"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const _d = debug_1.default('app:' + path_1.default.basename(__filename, '.js'));
const request_promise_1 = __importDefault(require("request-promise"));
const reqData = {
    url: 'http://school.shine.com.cn:7000/api/user-manager/check',
    headers: {
        'Content-type': 'application/json'
    },
    json: { url: 'http://www.baidu.com' }
};
(async () => {
    const ret = await request_promise_1.default.post(reqData);
    _d('===============', ret);
})();
//# sourceMappingURL=a.js.map