// Promise 源码

const PENDING = "Pending"; // 等待态
const FULFILLED = "Fulfilled"; // 成功态
const REJECTED = "Rejected"; // 失败态

class MyPromise {
  constructor(executor) {
    try {
      // 执行器函数执行
      executor(this.resolve, this.reject);
    } catch (e) {
      // 执行器函数有错误直接调用reject方法
      this.reject(e);
    }
  }
  // 当前promise的状态
  status = PENDING;
  // 成功的值
  value = undefined;
  // 失败的原因
  reason = undefined;
  // 存成功回调   只有异步才会触发次情况(PENDING)
  succesCallback = [];
  // 存失败回调   只有异步才会触发次情况(PENDING)
  failCallback = [];
  resolve = (value) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成成功态
    this.status = FULFILLED;
    // 保存成功的值
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    // this.succesCallback && this.succesCallback(this.value);
    while (this.succesCallback.length) this.succesCallback.shift()();
  };
  reject = (reason) => {
    // 如果不是等待态不做下面逻辑
    if (this.status !== PENDING) return;
    // 等待态改成失败态
    this.status = REJECTED;
    // 保存失败的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) this.failCallback.shift()();
  };

  // 原型上的then方法
  then(succesCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      // setTimeout的作用是为了拿到promise2的值   promise是微任务
      setTimeout(() => {
        if (this.status === FULFILLED) {
          try {
            // 成功态调成功回调
            let x = succesCallback(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
            console.log("---then执行的时候有错误---");
            reject(e);
          }
        } else if (this.status === REJECTED) {
          try {
            // 失败态调用失败的回调
            let x = failCallback(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
            console.log("---then执行的时候有错误---");
            reject(e);
          }
        } else {
          // resolve方法和reject方法在异步代码中执行  这时候状态是PENDING
          // 将成功回调和失败回调存储起来, 等待resolve和reject执行的时候再执行对应的回调函数
          this.succesCallback.push(() => {
            try {
              // 成功态调成功回调
              let x = succesCallback(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
              console.log("---then执行的时候有错误---");
              reject(e);
            }
          });
          this.failCallback.push(() => {
            try {
              // 失败态调失败回调
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
              console.log("---then执行的时候有错误---");
              reject(e);
            }
          });
        }
      }, 0);
    });
    return promise2;
  }
}
// 解析Promise
/** 判断x的类型
 * @param {*} promise2  then返回的新promise
 * @param {*} x         then执行成功或者失败回调函数的结果
 * @param {*} resolve 新promise的resolve
 * @param {*} reject  新promise的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 如果返回的x 和 promise2 是同一个promis 就会死循环
  if (promise2 === x) {
    console.log("---x和promise2是同一个对象---");
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
    // throw new TypeError("Chaining cycle detected for promise #<Promise>");
  } else if (x instanceof MyPromise) {
    // x 返回的是一个 promise
    console.log("---x返回的是一个promise---");
    x.then(resolve, reject);
  } else {
    // x 还可能是别人写的promise对象
    // x 是一个常量
    console.log("---x返回的是一个常量---");
    resolve(x);
  }
}

module.exports = MyPromise;
