// promise源码分析

// 7. executor执行器函数 / then方法可能有错误，有错误直接调用reject方法
const MyPromise = require("./4.MyPromise.js");

let promise = new MyPromise((resolve, reject) => {
  console.log("执行器函数直接执行");
  throw new Error("抛出错误");
  // resolve("成功");
  reject("失败");
});
promise.then(
  (value) => {
    console.log("成功回调1", value);
    throw Error("错误");
  },
  (err) => {
    console.log("失败回调1", err.message);
    return err;
  }
);
