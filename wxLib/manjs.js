/**
 * Created by mq on 17-9-6.
 * 主接口
 */
const fs = require('fs');
const path = require('path');
const debug = require('debug')('wx:manjs');
const wxEvent = require('./lib/wxEvent');
/** ******************************   私有变量    ******************************** * */
const man = {};
/** ******************************   私有函数    ******************************** * */
// 遍历挂载wxApi目录下全部接口文件
man.useInterface = function (app) {
  const dir = path.join(__dirname, './wxApi');  // 接口文件目录
  const url = '/wxApi';                         // 挂载接口

  let files = [];
  try { // 读取文件列表
    files = fs.readdirSync(dir);
  } catch (e) {
    debug('加载API目录失败:', dir);
    return;
  }

  for (const f in files) {
    const fn = `${dir}/${files[f]}`;
    debug('FIND API :', fn);

    const st = fs.statSync(fn);
    if (st.isFile()) {
      if (path.extname(files[f]) == '.js') {
        const cmd = path.basename(files[f], '.js');
        const use_point = `${url}/${cmd}`;
        app.use(use_point, require(fn));
        debug('add API cmd:', cmd, ' to:', use_point);
      }
    } else if (st.isDirectory()) {
          // debug('add API PATH:',fn);
          // utils.UseDir(route,fn,url + '/' +files[f]);
    }
  }

  // 挂载微信事件处理到app
  wxEvent.useAllAppEventRouter(app, '/wxEvent');
};

// 根据配置文件生成wx内部函数
man.createWx = function (wxCfg) {
  man.wx = require('./lib/wx.enterprise')(wxCfg);
  // 初始化微信消息型应用
  wxEvent.initWxEventApp(wxCfg.apps, man.wx.wxApi.getAppId());
};

man.saveTradeOrder = () => {};

man.setDB = function (dbParam) {
  man.db = dbParam;  // 外部数据库
};
/** ******************************   对外接口    ******************************** * */

module.exports = man;
