# 1. 异步编程

为什么会出现单线程 js 异步方案

- 采用单线程模式工作的原因
  - 多个线程操作 dom，无法明确已哪个线程的结果为主。
- 单线程是 js 运行环境中负责执行代码的线程只有一个 (一个人一次只能做一件事)

  - 优点： 更安全，更简单
  - 缺点： 如果出现一个耗时的任务，会阻塞后面的任务，导致假死的情况

- 为了解决耗时任务阻塞导致假死的情况, js 将任务的执行模式分成了两种
  - 同步模式 (Synchronous)
  - 异步模式 (Asynchronous)

## 1.1 同步模式与异步模式

同步模式

- js 代码中的任务依次执行，后一个任务要等待前一个任务结束才执行。(排队执行)

  ![avatar](../images/同步模式.png)

- 缺点 莫个任务或者莫行代码执行的事件过长，后面的任务就会延迟，我们把这种延迟就叫阻塞，对用户来说就是卡顿，卡死。

异步模式

- 不会去等待这个任务的结束才开始下一个任务
- 开启过后就立即往后执行下一个任务
- 后续逻辑一般会通过回调函数的方式来定义
- 优点：解决单线程 js 语言无法同时处理大量耗时的任务
- 难点(缺点)：代码的执行顺序混乱
- 运行环境提供的 API 是以同步或异步模式的方式工作 (js 是单线程的，浏览器不是的)

  ![avatar](../images/异步模式.png)

  ![avatar](../images/异步模式02.png)

回调函数 -

## 1.2 事件循环与消息队列

异步模式就是通过事件循环与消息队列实现的

## 1.3 回调函数

js 实现异步编程的根本方式就是回调函数

回调函数的概念

- 所有异步编程方案的根基
- 回调函数可以理解为一件你想要做的事情
- 由调用者定义，交给执行者执行的函数就是回调函数

![avatar](../images/回调函数.png)

## 1.3 异步编程的几种方式

- 传递函数参数回调 (setTimeout)
  ![avatar](../images/回调函数02.png)
- 事件机制
- 发布订阅
- 以上都是基于回调函数的变体罢了

## 1.4 Promise

1. 为什么会出现 Promise
   - 解决异步编程的回调地狱问题
   - 可以同时获取多个异步任务的结果
2. Promise 其实就是一个对象,表示异步任务最终结果是成功还是失败。内部对外界做出了一个承诺，一开始这个承诺是等待状态(Pending),最终可能转换成成功态(Fulfilled)或者 Rejected(失败态),在承诺状态确定之后都会有相对应的任务会被自动执行。这个承诺有个特点就是一旦确定状态之后就不能更改。
3. promise 的误区

- 嵌套使用的方式是使用 Promise 最常见的错误。正确的做法是借助于 Promise then 方法链式调用的特点，

4. 链式调用 then

- 每个 then 会返回一个 全新的 Promise 对象
- 后面的 then 方法就是为上一个 then 返回的 Promise 注册回调
- 前面 then 方法中回调函数的返回值会作为后面 then 方法回调的参数- 如果回调中返回的是 Promise, 那后面的 then 方法的回调会等待它的结束

5. 异常处理 then(null,onRejected)/catch

- onRejected 方法只能捕获到上一个 then 返回的错误信息
- catch 可以捕获前面所有 then 没有捕获的错误信息
- catch 方法就是 then 方法的值穿透
- 在代码中明确捕获每一个可能的异常，而不是全局处理异常 (监听 UnhandledPromiseRejection)

6. 静态方法

- resolve 方法 返回的是一个 成功态的 Promise 对象
- reject 方法 返回的是一个 失败态的 Promise 对象

7. 并行处理

Promise.all 拿到所有结果/第一个 promise 失败的结果

> - 同步执行所有 promise ，所有 promise 全部是成功态, 才将所有 promise 的 执行的结果返回出来, 并且每一项的结果和 promise 数组的每一项对应起来。
> - 如果数组里面不上 promise 对象就直接返回
> - 只要有一个 promise 是失败态就直接返回失败态的结果，不会影响其他的 promise 执行

Promise.race 谁执行快就返回谁

> - 同步执行所有 promise , 谁执行的快就返回哪个 promise 对象, 不管状态是成功态还是失败态

8. Promise 执行时序/ 宏任务 vs 微任务

- 微任务在宏任务之前执行
- 同步任务 > 微任务 > 宏任务

9. 宏任务和微任务的差异

- 回调队列中的任务称之为 宏任务
- 宏任务执行过程中可以临时加上一些额外需求 (宏任务和微任务的差异)

  - 对于这些额外需求，可以选择作为一个新的宏任务进到队列中排队 (setTimeout 就会再次去队列中排队)
  - 也可以当作当前任务的 微任务 直接在当前任务结束后立即执行 (promise/MutationObserver/process.nextTick)

10. 微任务的好处

- 提高整体的响应能力 (加一些额外需求)

## 1.4 Promise 异步方案、宏任务/微任务队列

1. 宏任务： 当前调用栈中执行的代码成为宏任务。（主代码快，定时器等等）
2. 微任务： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件。（promise.then，proness.nextTick 等等）。
3. 宏任务执行过程中可以临时加上一些额外需求，对于这些额外需求，可以选择作为一个新的宏任务进到队列中排队 (setTimeout 就会再次去队列中排队)，也可以当作当前任务的 微任务 直接在当前任务结束后立即执行 (promise/MutationObserver/process.nextTick)
4. 宏任务中的事件放在 callback queue 中，由事件触发线程维护；微任务的事件放在微任务队列中，由 js 引擎线程维护。

## 1.5 Generator 异步方案

generator 的特点

1. 生成器函数 foo 执行后创建了生成器对象 generator
2. generator 第一次执行 next 才会让 foo 函数执行，到 yield 关键词之前就暂停
3. next 每次执行在遇到 yield 会暂停一下，直到执行完所有 yield,foo 才算执行完
4. next 传递的参数会作为 yield 的返回值 (注意：第一次不会)
5. generator 对象执行 throw 方法会抛出一个异常，可以在 foo 函数中 try catch 异常

如何使用 generator 管理异步流程

```js
// 模拟ajax请求
function ajax(url) {
  // ......   异步操作逻辑
  return new Promise((resolve, reject) => {
    if (url.includes("json")) {
      resolve(url + " 的请求结果");
    } else {
      reject("请求失败");
    }
  });
}

function* main() {
  // 请求ajax,并且得到ajax的返回结果
  // 通过这种方式可以让promise变的更像同步的代码
  try {
    const post1 = yield ajax("/1.json");
    console.log(post1);

    const post2 = yield ajax("/2.json");
    console.log(post2);

    const post3 = yield ajax("/3.js");
    console.log(post3);
  } catch (e) {
    console.log(e);
  }
}

// 将下面的代码使用递归的方式写出来
// 有个库就叫做co的库
function co(generator) {
  const g = generator(); // 得到生成器对象
  // 递归执行生成器对象的next，直到done为true执行完成
  function handleResult(result) {
    if (result.done) return; // done属性为true，代表生成器结束了
    result.value.then(
      (data) => {
        handleResult(g.next(data));
      },
      (error) => {
        // promise请求失败的时候，给生成器抛出异常
        g.throw(error);
      }
    );
  }
  handleResult(g.next());
}
co(main);
```

使用 generator+co 库让异步编程方案更加扁平化

## 1.6 async/await 语法糖 等价于 (generator+co 库)

不需要再配合一个 co 函数的执行器， 他是语言层面的标准编程语法，其次 async 还给我们返回一个 promise 对象,更有助于我们对代码的整体控制,await 只能出现在 async 函数内部

```js
async function main() {
  // 请求ajax,并且得到ajax的返回结果
  // 通过这种方式可以让promise变的更像同步的代码
  try {
    const post1 = await ajax("/1.json");
    console.log(post1);

    const post2 = await ajax("/2.json");
    console.log(post2);

    const post3 = await ajax("/3.js");
    console.log(post3);
  } catch (e) {
    console.log(e);
  }
}
main();
```
