/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-05-18 18:27:03
 * @LastEditTime: 2022-05-18 19:44:34
 * @FilePath: /iyunan-cli/utils/log/lib/index.js
 * @Description:
 */
"use strict";
const npmLog = require("npmlog");

// debug模式判断
npmLog.level = process.env.LOG_LEVEL || "info";

// 增加前缀
npmLog.heading = "iyunan";
// 前缀样式
npmLog.headingStyle = { fg: "white", bg: "black" };

// 新增success方法
npmLog.addLevel("success", 3500, { fg: "green", bg: "black" });

module.exports = npmLog;
