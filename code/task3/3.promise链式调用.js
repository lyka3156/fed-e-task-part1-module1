// promise源码分析

// 6. then链式调用  返回的是一个新的promise对象
// 6.1 判断then方法成功回调和失败回调的返回值 x
// 6.1.1 x返回的是一个pormise，判断x和当前then返回是不是同一个promise
// 是同一个promise就报错
// 6.1.2 x和then返回的不是同一个promise,将x的then方法执行返回给下一个then
// 6.1.3 x是常量直接当作下一个then的成功回调的参数
// 6.2 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值

const MyPromise = require("./3.MyPromise.js");

let promise = new MyPromise((resolve, reject) => {
  console.log("执行器函数直接执行");
  // resolve("成功");
  reject("失败");
  // setTimeout(() => {
  //   resolve("成功");
  //   // reject("失败");
  // }, 1000);
});
let promise1 = promise.then(
  (value) => {
    console.log("成功回调1", value);
    // return promise1; // x 返回的和then返回的promise是同一个
    // return new MyPromise((resolve, reject) => {
    //   resolve("x 返回的和then返回的promise不是同一个");
    // }); // x 返回的和then返回的promise不是同一个
    // return value; // x 返回的是常量
    throw Error("错误");
  },
  (err) => {
    console.log("失败回调1", err);
    return err;
  }
);

promise1
  .then(
    (value) => {
      console.log("成功回调2", value);
    },
    (err) => {
      console.log("失败回调2", err.message);
    }
  )
  .then(
    (value) => {
      console.log("成功回调3", value);
    },
    (err) => {
      console.log("失败回调3", err.message);
    }
  );
