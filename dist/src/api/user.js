"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webapi_1 = require("@tslib/webapi");
exports.userApi = {
    // 恢复登录，尝试恢复当前登录的会话信息
    // 如无法恢复，则返回一个key，用于下一步进行login使用的临时码
    check: webapi_1.HTTP()
};
//# sourceMappingURL=user.js.map