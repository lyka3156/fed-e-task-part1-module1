// Promise 源码

const PENDING = "Pending"; // 等待态
const FULFILLED = "Fulfilled"; // 成功态
const REJECTED = "Rejected"; // 失败态

class MyPromise {
  constructor(exector) {
    // 执行器函数执行
    exector(this.resolve, this.reject);
  }
  // 当前promise的状态
  status = PENDING;
  // 成功的值
  value = undefined;
  // 失败的原因
  reason = undefined;
  // 存成功回调   只有异步才会触发次情况(PENDING)
  succesCallback = undefined;
  // 存失败回调   只有异步才会触发次情况(PENDING)
  failCallback = undefined;
  resolve = (value) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成成功态
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
    // 执行成功的回调
    this.succesCallback(this.value);
  };
  reject = (reason) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成失败态
    this.status = REJECTED;
    // 保存失败的原因
    this.reason = reason;
    // 执行失败的回调
    this.failCallback(this.reason);
  };

  // 原型上的then方法
  then(succesCallback, failCallback) {
    if (this.status === FULFILLED) {
      // 成功态调成功回调
      succesCallback(this.value);
    } else if (this.status === REJECTED) {
      // 失败态调用失败的回调
      failCallback(this.reason);
    } else {
      // resolve方法和reject方法在异步代码中执行  这时候状态是PENDING
      this.succesCallback = succesCallback;
      this.failCallback = failCallback;
    }
  }
}

module.exports = MyPromise;
