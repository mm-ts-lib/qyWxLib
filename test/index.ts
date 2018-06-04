import debug from 'debug';
import path from 'path';
const _d = debug('app:' + path.basename(__filename, '.js'));

import moment from 'moment';
import wx from '../src';
import wxCfg from './cfg.school.wx';
import '../src/conf/tokensConf';
// 初始化数据库服务
// import { mongo } from './db';
// // 初始化http服务器
// import httpServer from './httpServer/httpServer';

const _testFn = async () => {
  try {
    _d('==============定时检测token', moment().format('HH:mm:ss'));
    const _ret = await wx.getWxTxl().getUserMgt().getUserInfoById('mengqi');
    setTimeout(() => {
      _testFn();
    }, 30 * 1000);
  } catch (e) {
    console.log('================== errr', e, typeof e);
  }
};

// 异步启动应用服务
(async () => {
  console.log('================== Test Start');
  wx.createWx(wxCfg);
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
  } catch (e) {
    console.log('================== errr', e, typeof e);
  }
})();
