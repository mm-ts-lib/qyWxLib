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
// 初始化数据库服务
// import { mongo } from './db';
// // 初始化http服务器
// import httpServer from './httpServer/httpServer';
// 异步启动应用服务
(async () => {
    console.log('================== Test Start');
    src_1.default.createWx(cfg_school_wx_1.default);
    // 等待数据库成功连接
    // await mongo.connect();
    // httpServer.start();
    try {
        // const _ret = await wx
        //   .getWxMsg()
        //   .sendText('26', '测试签到通知', '', '', '13');
        // console.log('================== _ret', _ret);
        const _ret = await src_1.default.getWxLib().getUserInfoById('mengqi', 'txl');
        console.log('================== _ret', _ret);
    }
    catch (e) {
        console.log('================== errr', e, typeof e);
    }
})();
//# sourceMappingURL=index.js.map