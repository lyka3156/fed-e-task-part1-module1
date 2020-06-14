// 4. promise 常用的静态方法

// 1.1) resolve 等价于下面
Promise.resolve("成功");
let promise = new Promise((resolve, reject) => {
  resolve("成功");
});

// 1.2) Promise.resolve方法传递的是promise对象，那么返回值就等于这个参数的promise对象
let promise1 = Promise.resolve(promise);
console.log(promise === promise1); // true

// 1.3) Promise.resolve方法如果传递的带有then方法的对象
// 带有then方法的对象也可以当作prommise去执行
// 应用：第三方的promise对象通过这种方法变成原生的promise对象
Promise.resolve({
  then: function (onFulfilled, onRejected) {
    onFulfilled("foo");
  },
}).then(function (value) {
  console.log(value);
});

// 2.1 Promise.reject 和上面类似，只不过状态是失败状态
