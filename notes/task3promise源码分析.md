# 1. promise 源码分析

1. promise 核心实现逻辑

```js
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
```

2. promise 类中加入异步编程

```js
// 5. 执行器中resolve和reject在异步中执行的时候，当前状态还是等待态
// 需要把then方法的成功回调和失败回调存起来，等异步调用resolve的时候调用成功回调，reject的时候调用失败回调
```

3. then 方法多次调用添加多个处理函数
4. 实现 then 的链式调用
5. then 方法链式调用识别 promise 自返回

```js
// 6. then链式调用  返回的是一个新的promise对象
// 6.1 判断then方法成功回调和失败回调的返回值 x
// 6.1.1 x返回的是一个pormise，判断x和当前then返回是不是同一个promise
// 是同一个promise就报错
// 6.1.2 x和then返回的不是同一个promise,将x的then方法执行返回给下一个then
// 6.1.3 x是常量直接当作下一个then的成功回调的参数
// 6.2 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
```

6. 捕获错误及 then 链式调用其他状态代码补充

```js
// 7.executor执行器函数 / then方法可能有错误，有错误直接调用reject方法
```

7. then 方法的参数可选

```js
// 8.then方法的值穿透
```

8. all 和 race 方法的实现

all 和 race 方法不管 promise 成功还是失败都不会影响其他 promise 执行

```js
// 9. Promise.all和Promise.race方法的实现
// 9.1 all方法返回一个新的promise
// 9.2 all参数里面每一项执行完成，才把所有结果依次按原顺序resolve出去
// 9.3 只要一个promise失败就reject失败的promise结果
// 10. Promise.race方法，谁执行的快就返回谁
```

9. resolve 和 reject 方法的实现

```js
// 11. resolve方法
// 相当于实例化Promise对象，并且调用了resolve方法
// 12. reject方法
// 相当于实例化Promise对象，并且调用了reject方法
```

10. finally 方法的实现

```js
// 13 finally的实现
// 13.1 不管是成功状态还是失败态都会进这个finally方法 (等待态不会进)
// 13.2 finally方法返回一个新的promise，它拿不到上次then执行的结果(所以没有参数)，内部会手动执行一次promise的then方法,并且把执行的结果传递给下一个then,
// 13.3 finally方法有错误会把错误作为下次then方法的失败回调的参数
```

11. catch 方法的实现

```js
// 14. catch方法的实现
// catch方法相当于执行then方法的失败回调
```
