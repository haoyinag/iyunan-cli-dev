/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-02-17 08:02:59
 * @LastEditTime: 2022-05-19 00:27:04
 * @FilePath: /iyunan-cli/core/cli/lib/index.js
 * @Description:
 */
"use strict";
/**
 * require 解析module的几种方式：
 * 1、加载 .js/.json/.node 三种方式文件
 * 2、加载保函 module.exports/exports
 * 3、加载：.json==>JSON.parse( )
 */
const path = require("path");
const dotenv = require("dotenv");
const semver = require("semver");
const colors = require("colors/safe");
const userHome = require("user-home");
const pathExists = require("path-exists").sync;
const log = require("@iyunan-cli-dev/log");

const constant = require("./constant");
const pkg = require("../package.json");

module.exports = core;

let args, config;

// core
function core() {
  try {
    checkNodeVersion(); // 判断node版本
    isRoot(); // 判断是否root
    checkPkgVersion(); // 判断当前库版本
    checkUserHome(); // 判断用户主目录
    checkInputArgs(); // 判断入参

    checkEnv(); // 查询环境变量
    // log.verbose("debug", "debug 测试...");
  } catch (error) {
    log.error(error.message);
  }
}

// 判断是否root用户
function isRoot() {
  /**
   * 也可以用process.geteuid()获取，
   *  0的时候是root，否则不是。但不严谨
   */
  const __checkRoot = process.getuid && process.getuid() === 0;
  return __checkRoot;
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
  const lowEstVersion = constant.LOWEST_NODE_VERSION;
  // console.log(currentVersion,lowEstVersion);
  if (!semver.gte(currentVersion, lowEstVersion)) {
    throw new Error(
      colors.red(`iyunan-cli-dev 需要安装${lowEstVersion}以上版本的 Node.js`)
    );
  }
}

// 判断是否存在用户主目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red(`当前登录用户主目录不存在!`));
  }
}

// 判断入参
function checkInputArgs() {
  const minimist = require("minimist");
  args = minimist(process.argv.slice(2));

  checkArgs();
}

// 判断参数
function checkArgs() {
  // 会和 log.verbose("debug", "debug 测试..."); 呼应
  // 输入脚手架命令 + --debug 会触发
  process.env.LOG_LEVEL = args.debug ? "verbose" : "info";
  // 必须要重置 log.level 的值，否则无法正常触发
  log.level = process.env.LOG_LEVEL;
}

// 查询环境变量
function checkEnv() {
  // 读取到的是根目录 /Users/chenhaoyin/ 下的 .env 文件
  const dotenvPath = path.resolve(userHome, ".env");

  // 存在 .env 文件
  if (pathExists(dotenvPath)) {
    config = dotenv.config({
      path: dotenvPath,
    });
  }

  // 配置默认路径home和cliHome字段
  config = createDefaultConfig();
  log.verbose("环境变量", config);
}

// 创建默认配置
function createDefaultConfig() {
  const cliConfig = {
    home: userHome,
  };

  // 配置（获取）全路径
  cliConfig["cliHome"] = path.join(
    userHome,
    process.env.CLI_HOME ? process.env.CLI_HOME : constant.DEFAULT_CLI_HOME
  );

  return cliConfig;
}
