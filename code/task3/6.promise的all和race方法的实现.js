// promise源码分析

// 9. Promise.all和Promise.race方法的实现
// 9.1 all方法返回一个新的promise
// 9.2 all参数里面每一项执行完成，才把所有结果依次按原顺序resolve出去
// 9.3 只要一个promise失败就reject失败的promise结果
// 10. Promise.race方法，谁执行的快就返回谁
const MyPromise = require("./6.MyPromise.js");

// 创建promise对象
let promise = new MyPromise((resolve, reject) => {});

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 1000);
});
let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("p2");
  }, 900);
});
let p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3");
  }, 1000);
});

// let allPromise = MyPromise.all(["a", "b", p1, p2, p3, "c"]);
let allPromise = MyPromise.race([p1, p2, p3]);
allPromise.then(
  (res) => {
    // 原生promise输出    [ 'a', 'b', 'p1', 'p2', 'p3', 'c' ]
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
