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
  resolve = (value) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成成功态
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
  };
  reject = (reason) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成失败态
    this.status = REJECTED;
    // 保存失败的原因
    this.reason = reason;
  };

  // 原型上的then方法
  then(succesCallback, fillCallback) {
    if (this.status === FULFILLED) {
      // 成功态调成功回调
      succesCallback(this.value);
    } else if (this.status === REJECTED) {
      // 失败态调用失败的回调
      fillCallback(this.reason);
    }
  }
}

module.exports = MyPromise;
