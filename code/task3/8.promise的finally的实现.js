// promise源码分析

// 13 finally的实现
const MyPromise = require("./7.MyPromise.js");

// 创建promise对象
let promise = new Promise((resolve, reject) => {
  resolve("成功");
});
