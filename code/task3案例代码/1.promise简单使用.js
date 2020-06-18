// promise源码分析

// 1. Promise是一个类， 参数是一个执行器函数  执行器函数自执行
// 2. Promise 有3个状态
//      Pending     默认等待态
//      Fulfilled   成功态
//      Rejected    失败态
//      状态一改变就不能再次修改    Pending -> Fulfilled    ||  Pending -> Rejected
// 3. 执行器函数参数有resolve方法和reject方法
// resolve方法将 Pending - > Fulfilled
// reject 方法将 Rejected ->  Rejected
// resolve方法的参数将作为then方法成功回调的值， reject方法的参数将作为then方法失败回调的原因
// 4. then方法有两个参数，一个是成功回调的函数succesCallback，一个是失败回调的函数failCallback
//  promise的成功态会将成功的值传给成功的回调并且执行，失败态会将失败的原因传递给失败的回调并执行

const MyPromise = require("./1.MyPromise.js");

let promise = new MyPromise((resolve, reject) => {
  console.log("执行器函数直接执行");
  resolve("成功");
  reject("失败");
});
promise.then(
  (value) => {
    console.log("成功回调", value);
  },
  (err) => {
    console.log("失败回调", err);
  }
);
