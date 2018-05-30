/* eslint-disable no-underscore-dangle,no-param-reassign,class-methods-use-this */
/**
 * Created by mq on 17-9-6.
 * wx内部逻辑
 */
const _ = require('lodash');
// const url = require('url');
const debug = require('debug')('wx:lib');
const wxToken = require('./wx.token');

class WxLib {
  constructor() {
    /** ******************************   私有变量    ******************************** * */
    debug('');
  }
  /** ******************************   公有函数    ******************************** * */
  /**
   * 初始化配置文件
   */
  init(wxCfgParam) {
    if (!wxCfgParam || !wxCfgParam.corpId || !wxCfgParam.agents) {
      throw new Error('需要设置wx_config参数');
    }
    wxToken.init(wxCfgParam);
  }
  /**
   * 发送用户信息
   */
  sendUserMSG(postData, agentId) {
    return wxToken.wxApiPost('message/send', {
      access_token: wxToken.getLocalToken(agentId),
    }, postData);
  }
  /**
   * 上传图片资源
   */
  uploadMedia(formData, agentId) {
    return wxToken.wxApiPost('media/upload', {
      access_token: wxToken.getLocalToken(agentId),
      type: 'image',
    }, formData, 'postIMG');
  }
  /** ******************************   私有函数    ******************************** * */

}

module.exports = new WxLib();
