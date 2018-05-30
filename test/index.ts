import debug from 'debug';
import path from 'path';
const _d = debug('app:' + path.basename(__filename, '.js'));

import wx from '../src';
import wxCfg from './cfg.school.wx';

// 异步启动应用服务
(async () => {
  console.log('================== Test Start');

  wx.createWx(wxCfg);

  try {
    const _postData = {
      touser: 'mengqi', // _userIdStr,
      msgtype: 'text',
      agentid: '26',
      text: {
        content: '211111111' // message + '(' + item.stuName + _time + ')',
      },
      safe: 0
    };
    const _ret = await wx.getWxLib().sendUserMSG(_postData, _postData.agentid);
    console.log('================== _ret', _ret);
  } catch (e) {
    console.log('================== errr', e, typeof e);
  }
})();
