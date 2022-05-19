/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-05-19 12:12:36
 * @LastEditTime: 2022-05-19 16:41:29
 * @FilePath: /iyunan-cli/utils/get-npm-info/lib/index.js
 * @Description:
 */
"use strict";
const axios = require("axios");
const semver = require("semver");
const urlJoin = require("url-join");

async function getNpmInfo(name, registry) {
  // TODO
  if (!name) {
    return null;
  }

  const __registry = registry || getDefaultRegistry();
  const npmUrl = urlJoin(__registry, name);
  //   console.log(npmUrl);
  return await npmRequest(npmUrl);
}

// 获取默认的注册地址
function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? "https://registry.npmjs.org/" : "https://r.cnpmjs.org/";
}

// 请求npm信息
async function npmRequest(url = "") {
  return axios
    .get(url)
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

// 获取 npmName 对应的 versions
async function getNpmVersions(npmName, registry) {
  const data = await getNpmInfo(npmName, registry);
  //   console.log("data:", data);
  if (data && data.versions) {
    return Object.keys(data.versions);
  }

  return [];
}

// 获取当前版本号之后的所有版本号
function getSemverVersions(baseVersion, versions = []) {
  return versions
    .filter((version) => semver.satisfies(version, `>${baseVersion}`))
    .sort((a, b) => (semver.gt(b, a) ? 1 : -1));
}

// 获取需要更新的最新version
async function getNpmSemverVersion(baseVersion, npmName, registry) {
  if (!baseVersion || !npmName) {
    return new Error(`请传入正确的${!baseVersion ? "版本号" : "仓库名称"}`);
  }
  // 获取 npmName 对应的 versions
  const versions = await getNpmVersions(npmName, registry);
  //   console.log(versions);
  // 获取当前版本号之后的所有版本号
  const sortVersions = getSemverVersions(baseVersion, versions);
  //   console.log(sortVersions);
  // 获取最新的版本号
  if (sortVersions && sortVersions.length > 0) {
    sortVersions[0];
  }
  return baseVersion;
}

module.exports = {
  getNpmInfo,
  getNpmVersions,
  getSemverVersions,
  getNpmSemverVersion,
};
