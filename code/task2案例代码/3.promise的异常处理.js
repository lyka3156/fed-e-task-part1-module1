// 3. promise 的异常处理

let promise = new Promise((resolve, reject) => {
  resolve("正确");
});

// onRejected方法只能捕获到上一个then返回的错误信息
promise
  .then((value) => {
    console.log(value);
    Promise.reject("错误");
  })
  .then(null, (error) => {
    console.log(error);
  });

// catch可以捕获所有的错误信息
// catch方法就是then方法的值穿透
promise
  .then((value) => {
    console.log(value);
    Promise.reject("错误");
  })
  .catch((error) => {
    console.log();
  });
