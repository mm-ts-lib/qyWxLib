import debug from 'debug';
import path from 'path';
const _d = debug('app:' + path.basename(__filename, '.js'));

import wx from '../src';
import wxCfg from './cfg.school.wx';

// 初始化数据库服务
// import { mongo } from './db';
// // 初始化http服务器
// import httpServer from './httpServer/httpServer';
// 异步启动应用服务
(async () => {
  console.log('================== Test Start');
  wx.createWx(wxCfg);
  // 等待数据库成功连接
  // await mongo.connect();

  // httpServer.start();

  try {
    // const _ret = await wx
    //   .getWxMsg()
    //   .sendText('26', '测试签到通知', '', '', '13');
    // console.log('================== _ret', _ret);
    const _ret = await wx.getWxLib().getUserInfoById('mengqi', 'txl');
    console.log('================== _ret', _ret);
  } catch (e) {
    console.log('================== errr', e, typeof e);
  }
})();
