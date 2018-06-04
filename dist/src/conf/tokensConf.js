"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mq on 18-06-01.
 * 本地保存 accesstoken、jsapi_ticket
 * 写入文件中 {
 *  agentid, accesstoken、jsapi_ticket, expires过期时间
 * }
 * 每次启动时初始化本地记录，定时检测过期，
 */
const path_1 = require("path");
const debug_1 = require("debug");
const _d = debug_1.default('@tslib/qyWxLib:' + path_1.default.basename(__filename));
const conf_1 = require("@tslib/conf");
// 配置文件路径
const CONFIG_PATH = path_1.default.resolve(__dirname, 'tokens.json5');
_d('using config file:', CONFIG_PATH);
// 配置文件定义
exports.default = conf_1.conf(CONFIG_PATH, {
    tokens: {}
});
//# sourceMappingURL=tokensConf.js.map