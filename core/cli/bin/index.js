#! /usr/bin/env node

const importLocal = require("import-local");

// console.log(123,importLocal(__filename));

if (importLocal(__filename)) {
  // console.log(111);
  require("npmlog").info("cli", "正在使用 iyunan-cli 本地版本");
} else {
  // console.log(222);
  require("../lib")(process.argv.slice(2));
}
