// 4. 手写实现 Promise 源码

// 1. Promise是一个类， 参数是一个执行器函数  执行器函数自执行
// 2. Promise 有3个状态
//      Pending     默认等待态
//      Fulfilled   成功态
//      Rejected    失败态
//      状态一改变就不能再次修改    Pending -> Fulfilled    ||  Pending -> Rejected
// 3. 执行器函数参数有resolve方法和reject方法
// resolve方法将 Pending - > Fulfilled
// reject 方法将 Rejected ->  Rejected
// resolve方法的参数将作为then方法成功回调的值， reject方法的参数将作为then方法失败回调的原因
// 4. then方法有两个参数，一个是成功回调的函数succesCallback，一个是失败回调的函数failCallback
//  promise的成功态会将成功的值传给成功的回调并且执行，失败态会将失败的原因传递给失败的回调并执行
// 5. 执行器中resolve和reject在异步中执行的时候，当前状态还是等待态
// 需要把then方法的成功回调和失败回调存起来，等异步调用resolve的时候调用成功回调，reject的时候调用失败回调
// 6. then链式调用  返回的是一个新的promise对象
// 6.1 判断then方法成功回调和失败回调的返回值 x
// 6.1.1 x返回的是一个pormise，判断x和当前then返回是不是同一个promise
// 是同一个promise就报错
// 6.1.2 x和then返回的不是同一个promise,将x的then方法执行返回给下一个then
// 6.1.3 x是常量直接当作下一个then的成功回调的参数
// 6.2 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
// 7. executor执行器函数 / then方法可能有错误，有错误直接调用reject方法
// 8.then方法的值穿透
// 9. Promise.all和Promise.race方法的实现
// 9.1 all方法返回一个新的promise
// 9.2 all参数里面每一项执行完成，才把所有结果依次按原顺序resolve出去
// 9.3 只要一个promise失败就reject失败的promise结果
// 10. Promise.race方法，谁执行的快就返回谁
// 11. resolve方法
// 相当于实例化Promise对象，并且调用了resolve方法
// 12. reject方法
// 相当于实例化Promise对象，并且调用了reject方法
// 13 finally的实现
// 13.1 不管是成功状态还是失败态都会进这个finally方法 (等待态不会进)
// 13.2 finally方法返回一个新的promise，它拿不到上次then执行的结果(所以没有参数)，内部会手动执行一次promise的then方法,并且把执行的结果传递给下一个then,
// 13.3 finally方法有错误会把错误作为下次then方法的失败回调的参数
// 14. catch方法的实现
// catch方法相当于执行then方法的失败回调
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
    // then方法的值穿透
    succesCallback = succesCallback || ((value) => value);
    failCallback =
      failCallback ||
      ((reason) => {
        throw reason;
      });
    let self = this; // 当前then属于的promise对象本身
    let promise2 = new MyPromise((resolve, reject) => {
      // setTimeout的作用是为了拿到promise2的值   promise是微任务
      process.nextTick(() => {
        if (self.status === FULFILLED) {
          try {
            // 成功态调成功回调
            let x = succesCallback(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
            console.log("---then执行的时候有错误---");
            reject(e);
          }
        } else if (self.status === REJECTED) {
          try {
            // 失败态调用失败的回调
            let x = failCallback(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
            console.log("---then执行的时候有错误---");
            reject(e);
          }
        } else {
          // resolve方法和reject方法在异步代码中执行  这时候状态是PENDING
          // 将成功回调和失败回调存储起来, 等待resolve和reject执行的时候再执行对应的回调函数
          self.succesCallback.push(() => {
            try {
              // 成功态调成功回调
              let x = succesCallback(self.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // then执行的时候有错误直接reject，将下一个promise的状态改为失败态
              console.log("---then执行的时候有错误---");
              reject(e);
            }
          });
          self.failCallback.push(() => {
            try {
              // 失败态调失败回调
              let x = failCallback(self.reason);
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

  // finally方法
  // 不管是成功状态还是失败态都会进这个finally方法 (等待态不会进)
  finally(callback) {
    return new Promise((resolve, reject) => {
      try {
        callback();
        this.then(resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  // catch方法
  // catch方法相当于执行then方法的失败回调
  catch(failCallback) {
    return this.then(null, failCallback);
  }

  // 执行promise数组，并且返回所有结果
  static all(array) {
    // 返回一个新的Promise
    return new MyPromise((resolve, reject) => {
      let results = [], // 存所有promise执行返回的结果
        len = array.length,
        index = 0;
      // 存每一项的数据
      function setData(i, data) {
        results[i] = data;
        if (++index === len) {
          // 全部成功才执行成功的回调
          resolve(results);
        }
      }

      for (let i = 0; i < len; i++) {
        let currentPromise = array[i];
        if (currentPromise instanceof MyPromise) {
          // 是promise执行promise，只要有一个是失败态就直接reject,否则依次存起来
          currentPromise.then((value) => {
            setData(i, value);
          }, reject);
        } else {
          // 不是promise
          setData(i, currentPromise);
        }
      }
    });
  }

  // race方法， 谁执行的快就返回谁
  static race(array) {
    return new Promise((resolve, reject) => {
      for (let i = 0, len = array.length; i < len; i++) {
        // 状态只能改变依次，所以同时执行then，谁快谁返回
        array[i].then(resolve, reject);
      }
    });
  }

  // resolve方法 将状态转换成成功态的promise对象
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  // reject方法 将状态转换成失败态的promise对象
  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
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
    // x 还可能是别人写的promise对象  *****
    // x 是一个常量
    console.log("---x返回的是一个常量---");
    resolve(x);
  }
}

module.exports = MyPromise;
