"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const _d = debug_1.default('app:' + path_1.default.basename(__filename, '.js'));
const src_1 = __importDefault(require("../src"));
const cfg_school_wx_1 = __importDefault(require("./cfg.school.wx"));
// 异步启动应用服务
(async () => {
    console.log('================== Test Start');
    src_1.default.createWx(cfg_school_wx_1.default);
    try {
        const _postData = {
            touser: 'mengqi',
            msgtype: 'text',
            agentid: '26',
            text: {
                content: '211111111' // message + '(' + item.stuName + _time + ')',
            },
            safe: 0
        };
        const _ret = await src_1.default.getWxLib().sendUserMSG(_postData, _postData.agentid);
        console.log('================== _ret', _ret);
    }
    catch (e) {
        console.log('================== errr', e, typeof e);
    }
})();
//# sourceMappingURL=index.js.map