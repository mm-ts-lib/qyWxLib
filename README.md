# qyWxLib 企业微信公共库

* 仅封装与企业微信服务器通信接口函数
* 不提供 db、log 等操作

## 一、用法

1.  先在主工程 index.ts 中创建微信服务
2.  然后在其他文件中可以直接调用库文件接口函数

```js
// 主工程中创建
import wx from '@tslib/qy-wx-lib';
import wxCfg from './cfg.school.wx';
wx.createWx(wxCfg);
// 调用接口
import wx from '@tslib/qy-wx-lib';
await wx.getWxUser().userFromCode();
```

## 二、提供的接口

### 1. wxLib

* makeWeixinAuthUrl: 微信认证进行跳转的 url

### 2. wxMsg 发送应用消息

* sendText: 发送文本消息
* sendImage: 发送图片消息
* sendArticles: 发送图文消息

### 3. wxUser 用户管理

* userFromCode: 通过 code 获取用户信息

### 4. wsTxl 通讯录

* deptCreate: 创建部门
* deptUpdate: 更新部门
* deptDept: 删除部门
* getUserInfoById: 通过 id 获取用户信息
* userCreate: 创建成员
* userUpdate: 更新成员
* userDel: 批量删除成员
* userSimpleList: 通过部门 id，获取部门成员列表(简单信息)
* userList: 通过部门 id，获取部门成员列表(详情)

## 三、开发调试方法

### 1、调试主工程

* 将本地 html 的 webpack 的应用端口映射到与服务器的 nginx 对应响应端口上，
* webpack 自动将请求转到本地 server 上

```js
端口映射
ssh -CvNR 7001:127.0.0.1:本地html端口 root@school.shine.com.cn
```

### 2、修改库文件时

vscode 单独打开 qyWxLib，开启 tsc 监视任务

```js
// 启动调试主程序 test
DEBUG=* node dist/test/index.js
```
