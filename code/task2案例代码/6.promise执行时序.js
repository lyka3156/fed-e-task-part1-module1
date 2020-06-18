// 6. promise 执行时序  宏任务 vs 微任务

console.log("global start");

setTimeout(() => {
  console.log("setTiemout");
}, 0);

Promise.resolve("成功").then((res) => {
  console.log(res);
});

Promise.reject("失败").then(null, (err) => {
  console.log(err);
});

console.log("global end");
