/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-02-17 08:02:59
 * @LastEditTime: 2022-05-17 11:00:47
 * @FilePath: /iyunan-cli/core/cli/lib/index.js
 * @Description:
 */
"use strict";
const pkg = require("../package.json");

module.exports = core;

/**
 * reqiure解释module的集中方式：
 * 1、加载 .js/.json/.node 三种方式文件
 * 2、加载保函 module.expots/exports
 * 3、加载：.json==>JOSN.parse( )
 */

function core() {
  // TODO
  const version = pkg.version;
  console.log(version);
}
