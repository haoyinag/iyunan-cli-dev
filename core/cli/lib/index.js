/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-02-17 08:02:59
 * @LastEditTime: 2022-05-18 22:53:21
 * @FilePath: /iyunan-cli/core/cli/lib/index.js
 * @Description:
 */
"use strict";
/**
 * reqiure解释module的集中方式：
 * 1、加载 .js/.json/.node 三种方式文件
 * 2、加载保函 module.expots/exports
 * 3、加载：.json==>JOSN.parse( )
 */
const colors = require("colors/safe");
const semver = require("semver");
const log = require("@iyunan-cli-dev/log");

const CONST = require("./const");
const pkg = require("../package.json");

module.exports = core;

// core
function core() {
  try {
    checkRoot();
    checkPkgVersion();
    checkNodeVersion();
  } catch (error) {
    log.error(error.message);
  }
}

// 判断是否root用户
function checkRoot() {
  /**
   * 也可以用process.geteuid()获取，
   *  0的时候是root，否则不是。但不严谨
   */
  const __checkRoot = require("root-check");
  __checkRoot();
}

// 查询package.json版本号
function checkPkgVersion() {
  const version = pkg.version;
  log.info(version);
}

// 查询node版本号，不正确时报错提示
function checkNodeVersion() {
  // 获取当前node版本号
  const currentVersion = process.version;
  // 比对最低版本号
  const lowEstVersion = CONST.LOWEST_NODE_VERSION;
  // console.log(currentVersion,lowEstVersion);
  if (!semver.gte(currentVersion, lowEstVersion)) {
    throw new Error(
      colors.red(`iyunan-cli-dev 需要安装${lowEstVersion}以上版本的 Node.js`)
    );
  }
}
