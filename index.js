/*
 * @Author: 郁南
 * @LastEditors: 郁南
 * @Date: 2022-02-24 08:14:11
 * @LastEditTime: 2022-05-15 22:52:58
 * @FilePath: /iyunan-cli/index.js
 * @Description: 
 */
const core = require('@iyunan-cli/core');

core(13)

const obj ={
    fn:(str)=>console.log(str)
}

const fn = str=>obj.fn(str)

fn(123)
