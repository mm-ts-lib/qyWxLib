/**
 * Created by mq on 17-9-6.
 * wx内部逻辑
 */
const request = require('request');
const _ = require('lodash');
const url = require('url');
const querystring = require('querystring');
const debug = require('debug')('wx:enterprise');


// const jsapiTicket = {};
let wxCfg = {}; // 记录配置信息

/** ******************************   对外接口    ******************************** * */
module.exports = (wxCfgParam) => {
  wxCfg = wxCfgParam; // 记录配置信息


  return new function () {

    const self = this;

    // 定义微信API函数
    self.wxApi = {};

    self.wxApi.getAppId = () => wxCfg.corpId;
    // 取对应应用的accessToken
    self.wxApi.accessToken = agentId => accessToken[agentId];
    // self.wxApi.getJsapiTicket = (agentId) => {
    //     return jsapiTicket[agentId];  // jsapi未使用
    // };
    self.wxApi.wxApiGet = (cmd, agentId, queryParam, callback) => {
      wxApiGet(cmd, agentId, queryParam, callback);
    };
    self.wxApi.wxApiPost = (cmd, agentId, queryParam, postData, callback, postType) => {
      wxApiPost(cmd, agentId, queryParam, postData, callback, postType);
    };
    /**
     * 构建微信认证进行跳转的url,去除url的所有请求参数,执行跳转认证
     * @param reqUrl 请求的url
     * @returns {string} 拼接的微信认证url字符串
     */
    self.wxApi.makeWeixinAuthUrl = (reqUrl) => {
      // 去除url的code,stat参数
      const u1 = url.parse(reqUrl, true);
      const u = `${u1.protocol}//${u1.host}${u1.pathname}`;

      // 否则通知进行跳转,获取用户code
      const wxurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxCfg.corpId
             }&redirect_uri=${encodeURIComponent(u)
             }&response_type=code&scope=snsapi_base#wechat_redirect`; // &wxurl=zf

      return url.format(wxurl);
    };

    /**
     * 通过code获取用户信息
     * @param code
     * @param callback
     */
    self.wxApi.userFromCode = (code, agentId, callback) => {
      wxApiGet('user/getuserinfo', agentId, {
        access_token: accessToken[agentId],
        code,
      }, (err, retval) => {
        debug('微信接口:userFromCode:', err, retval);
        callback(err, retval);
      });
    };

    /**
     * 通过id获取用户信息
     * @param userid
     * @param callback
     */
    self.wxApi.getUserInfo = function (userid, agentId, callback) {
      wxApiGet('user/get', agentId, {
        access_token: accessToken[agentId],
        userid,
      }, (err, retval) => {
        debug('微信接口:getUserInfo', err, retval);
        callback(err, retval);
      });
    };

    /*
     * userId--->openId
     * */
    self.wxApi.getOpenId = (userId, agentId, callback) => {
      wxApiPost('user/convert_to_openid', agentId, {
        access_token: accessToken[agentId],
      }, {
        userid: userId,
      }, callback);
    };

    // 返回对象
    return self;
  }();
};
