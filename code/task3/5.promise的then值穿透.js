// promise源码分析

// 8.then方法的值穿透
const MyPromise = require("./5.MyPromise.js");
let promise = new MyPromise((resolve, reject) => {
  console.log("执行器函数直接执行");
  resolve("成功");
  // reject("失败");
  // throw new Error("手动抛出错误");
  setTimeout(() => {
    throw new Error("手动抛出错误");
  }, 0);
});
promise
  .then(
    (value) => {
      console.log("成功回调1", value);
      return value;
    },
    (err) => {
      console.log("失败回调1", err && err.message);
      // throw new Error("手动抛出错误1");
    }
  )
  .then()
  .then()
  .then(
    (value) => {
      console.log("成功回调2", value);
    },
    (err) => {
      console.log("失败回调1", err);
    }
  );
