// 1.Promised 基本示例

let promise = new Promise((resolve, reject) => {
  // 这里用于 “兑现”  承诺

  //   resolve("成功"); // 承诺达成 pending->Fulfilled

  reject("失败"); // 承诺失败
});

promise.then(
  // 成功态执行的回调
  (value) => {
    console.log(value);
  },
  // 失败态执行的回调
  (error) => {
    console.log(error);
  }
);
