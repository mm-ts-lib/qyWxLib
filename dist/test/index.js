"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const path_1 = require("path");
const _d = debug_1.default('app:' + path_1.default.basename(__filename, '.js'));
const moment_1 = require("moment");
const src_1 = require("../src");
const cfg_school_wx_1 = require("./cfg.school.wx");
require("../src/conf/tokensConf");
// 初始化数据库服务
// import { mongo } from './db';
// // 初始化http服务器
// import httpServer from './httpServer/httpServer';
const _testFn = async () => {
    try {
        _d('==============定时检测token', moment_1.default().format('HH:mm:ss'));
        const _ret = await src_1.default.getWxUser().getUserInfoById('mengqi', 'txl');
        setTimeout(() => {
            _testFn();
        }, 30 * 1000);
    }
    catch (e) {
        console.log('================== errr', e, typeof e);
    }
};
// 异步启动应用服务
(async () => {
    console.log('================== Test Start');
    src_1.default.createWx(cfg_school_wx_1.default);
    // 等待数据库成功连接
    // await mongo.connect();
    // httpServer.start();
    _testFn();
    try {
        // 发送家校通消息
        // const _ret = await wx
        //   .getWxMsg()
        //   .sendText('26', '测试签到通知', '', '', '13');
        // console.log('================== _ret', _ret);
        // code->userid
        // const _ret1 = await wx.getWxLib().userFromCode('aaaaa', 'txl');
        // console.log('================== _ret', _ret1);
        // 获取用户信息
        // const _ret = await wx.getWxUser().getUserInfoById('mengqi', 'txl');
        // console.log('================== _ret', _ret);
        // const reqUrl = 'http://www.baidu.com?code=aaaa&path=bbbb#/';
        // const reqUrl = 'http://www.baidu.com#/';
        // const _ret = await wx.getWxLib().makeWeixinAuthUrl(reqUrl);
        // console.log('================== _ret', _ret);
    }
    catch (e) {
        console.log('================== errr', e, typeof e);
    }
})();
//# sourceMappingURL=index.js.map