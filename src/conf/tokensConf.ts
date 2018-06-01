/**
 * Created by mq on 18-06-01.
 * 本地保存 accesstoken、jsapi_ticket
 * 写入文件中 {
 *  agentid, accesstoken、jsapi_ticket, expires过期时间
 * }
 * 每次启动时初始化本地记录，定时检测过期，
 */
import path from 'path';
import debug from 'debug';
const _d = debug('@tslib/qyWxLib:' + path.basename(__filename));

import _ from 'lodash';
import { conf, IConfig } from '@tslib/conf';

// 配置文件路径
const CONFIG_PATH = path.resolve(__dirname, 'tokens.json5');
_d('using config file:', CONFIG_PATH);

// 配置文件格式 本地保存token
export interface ILOCAL_TOKENS {
  [Name: string]: {
    agentid: string;
    access_token: string;
    ticket: string; // jsapi_ticket
    expires: number; // 过期时间
  };
}

// 配置文件定义
export default conf(CONFIG_PATH, {
  tokens: {} as ILOCAL_TOKENS
});
