import debug from 'debug';
import path from 'path';
const _d = debug('app:' + path.basename(__filename, '.js'));

import request from 'request-promise';

const reqData = {
  url: 'http://school.shine.com.cn:7000/api/user-manager/check',
  headers: {
    'Content-type': 'application/json'
  },
  json: { url: 'http://www.baidu.com' }
};

(async () => {
  const ret = await request.post(reqData);
  _d('===============', ret);
})();
