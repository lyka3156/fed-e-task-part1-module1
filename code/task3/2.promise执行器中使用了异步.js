// promise源码分析
// 5. 执行器中resolve和reject在异步中执行的时候，当前状态还是等待态
// 需要把then方法的成功回调和失败回调存起来，等异步调用resolve的时候调用成功回调，reject的时候调用失败回调

const MyPromise = require("./2.MyPromise.js");

let promise = new MyPromise((resolve, reject) => {
  console.log("执行器函数直接执行");
  setTimeout(() => {
    // resolve("成功");
    reject("失败");
  }, 1000);
});
promise.then(
  (value) => {
    console.log("成功回调", value);
  },
  (err) => {
    console.log("失败回调", err);
  }
);
