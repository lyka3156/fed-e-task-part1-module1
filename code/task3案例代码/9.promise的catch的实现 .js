// promise源码分析

// 14. catch方法的实现
// catch方法相当于执行then方法的失败回调
const MyPromise = require("./9.MyPromise.js");

// 创建promise对象
let promise1 = new Promise((resolve, reject) => {
  resolve("成功");
  // reject("失败");
});
let promise = new MyPromise((resolve, reject) => {
  // resolve("成功");
  reject("失败");
});

promise
  .then((value) => {
    console.log("value1", value);
  })
  .catch((reason) => {
    console.log("catch1", reason);
    // return 1;
    throw Error("错误");
  })
  .then(
    (value) => {
      console.log("value2", value);
    },
    (reason) => {
      console.log("reason2", reason.message);
    }
  )
  .catch((reason) => {
    console.log("catch2", reason);
    return 1;
  })
  .then(
    (res) => {
      console.log(res);
    },
    (reason) => {
      console.log("reason3", reason);
    }
  );
