"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const _d = debug_1.default('app:apiRouter');
const session_1 = require("./session");
const api_1 = __importDefault(require("../api"));
// import { checkPermission, reqData } from '../httpServer/httpServer';
const src_1 = __importDefault(require("../../src"));
/**
 * 检查用户信息,如果指定用户会话中不包含用户信息,则进行跳转,并认证设置会话参数
 * https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8e8e7f2fc400e61f&redirect_uri=http%3a%2f%2fwx.magicmind.cn%3a7600%2fkaihu.html&response_type=code&scope=snsapi_base&state=zf#wechat_redirect
 */
api_1.default.check = async (data) => {
    // 计算数据库中的密码sha1
    const session = session_1.getSession(data);
    console.log('-----------!', session);
    if (session.user) {
        return { user: session.user };
    }
    else if (data.usercode) {
        //首先获取用户信息,然后更新用户部门信息到会话
        //如果有usercode参数,则通过微信接口获取用户信息,获取用户更详细的信息
        //1.首先获取用户code->ID
        const _ret1 = await src_1.default.getWxLib().userFromCode(data.usercode, data.agentid);
        //2.然后获取id->info
        const userid = 'mengqi';
        const _ret2 = await src_1.default.getWxLib().getUserInfoById(userid, data.agentid);
        return { user: session.user };
    }
    else {
        console.log('用户会话无效,跳转微信认证:', data.url);
        // 跳转微信认证
        var url = src_1.default.getWxLib().makeWeixinAuthUrl(data.url);
        console.log('req.url:', data.url, 'WX-URL:', url);
        // throw new Error('not found user');
        // res.status(400).json();
        return { err: 'AUTH', redirect: url };
        // throw new Error({ err: 'AUTH', redirect: url });
    }
};
//# sourceMappingURL=api.js.map