async function async1() {
  console.log("async1 start"); // 同步任务2         2
  await async2();
  console.log("async1 end"); // // 同步任务4        6
}

async function async2() {
  console.log("async2"); // 同步任务3               3
}

console.log("script start"); // 同步任务1           1

setTimeout(function () {
  console.log("setTimeout"); // 宏任务1             8
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1"); // 同步任务5             4
  resolve();
}).then(function () {
  console.log("promise2"); // 微任务1               7
});
console.log("script end"); // // 同步任务6          5

// 同步任务
// scr start
// as1  start
// as2
// as1 end
// promise1
// scr  end
// 微任务
// promise2
// 宏任务
// setTimeout

// 宏任务
