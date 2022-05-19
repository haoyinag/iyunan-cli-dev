#! /usr/bin/env node

const commander = require("commander");

const pkg = require("../package.json");

// 获取commander的单实例
// const { program } = commander;

// 获取实例
const program = new commander.Command();

program
  // 获取指令
  .name(Object.keys(pkg.bin)[0])
  // 指令描述
  .usage("<command> [options]")
  // 获取version信息并处理
  .version(pkg.version)
  // 参数 debug 模式
  .option("-d, --debug", "是否开启debug模式", false)
  .option("-e, --env <envName>", "获取环境变量名称")
  // 执行
  .parse(process.argv);
// console.log(command.opts());

// 注册命令方式一：command.command('命令名称')
const clone = program.command("clone <source> [destination]");
clone.action((source, destination) => {
  console.log("command clone", source, destination);
});

// 注册命令方式二：command.addCommand('命令名称') 注册子命令
const service = new commander.Command("service");
// 启动start命令
service
  .command("start [port]")
  .description("start a service")
  .action((port, agv) => {
    console.log("start a service at", port, agv);
  });
// 关闭命令
service
  .command("stop [port]")
  .description("stop a service")
  .action((port, agv) => {
    console.log("stop a service at", port, agv);
  });
program.addCommand(service);

// 注册命令之后必须执行program.parse(process.argv)
program.parse(process.argv);
