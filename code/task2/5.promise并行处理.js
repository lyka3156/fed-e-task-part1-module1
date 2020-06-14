// 5. 并行处理

// 5.1) 同时执行多个promise
var promise = Promise.all([
  Promise.reject("33"),
  Promise.resolve("111"),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("延迟执行all");
      resolve("222");
    }, 1000);
  }),
]);

// 拿到所有promise执行的结果
// 只要有一个promise是失败态就直接返回，但是不会影响其他的promise执行
promise.then(
  (res) => {
    // 全部成功才进onFulfilled回调函数
    console.log(res, "all正确");
  },
  (error) => {
    // 如果promise有一个返回rejected状就进onRejected的回调函数
    console.log(error, "all错误");
  }
);

// 5.2  promise.race   谁执行的快就返回谁
// 实现超时控制;

const request = new Promise((resolve, reject) => {
  // 执行ajax请求操作
  // ajax("/api/posts.json");
  setTimeout(() => {
    resolve("race请求成功");
  }, 200);
});
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("timeout")), 500);
});
// request和timeout谁执行的快就返回谁
Promise.race([
  request,
  timeout,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("race请求失败");
    }, 100);
  }),
])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
