// promise源码分析

// 11. resolve方法
// 相当于实例化Promise对象，并且调用了resolve方法
// 12. reject方法
// 相当于实例化Promise对象，并且调用了reject方法
const MyPromise = require("./7.MyPromise.js");

// 创建promise对象
let promise = new MyPromise((resolve, reject) => {});

Promise.resolve(100).then((res) => {
  console.log("成功回调：", res);
});
Promise.reject(100).then(null, (reason) => {
  console.log("失败回调", reason);
});
