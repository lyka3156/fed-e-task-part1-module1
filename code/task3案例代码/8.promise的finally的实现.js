// promise源码分析

// 13 finally的实现
// 13.1 不管是成功状态还是失败态都会进这个finally方法 (等待态不会进)
// 13.2 finally方法返回一个新的promise，它拿不到上次then执行的结果(所以没有参数)，内部会手动执行一次promise的then方法
// 13.3 finally方法有错误会把错误作为下次then方法的失败回调的参数
const MyPromise = require("./8.MyPromise.js");

// 创建promise对象
let promise1 = new Promise((resolve, reject) => {
  resolve("成功");
  // reject("失败");
});
let promise = new MyPromise((resolve, reject) => {
  resolve("成功");
  // reject("失败");
});
promise
  .then(
    (value) => {
      console.log("value1", value);
    },
    (reason) => {
      console.log("reason1", reason);
    }
  )
  .finally(() => {
    // return 1;
    // return MyPromise.resolve("正确");
    return MyPromise.reject("错误");
    // throw Error("错误");
  })
  .then(
    (value) => {
      console.log("value2", value);
    },
    (reason) => {
      console.log("reason2", reason);
    }
  );
