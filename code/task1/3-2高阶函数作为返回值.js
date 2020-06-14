
// 高阶函数 - 函数作为返回值


// 初识
function makeFn() {
    let msg = "高阶函数作为返回值";
    return function () {
        console.log(msg)
    }
}
let fn = makeFn()
fn()
makeFn()()


// 实现 vue 的noce函数
function once(fn) {
    let done = false;       // 共有变量(闭包的特性) 
    // 这个函数对fn的执行只有一次
    return function () {
        !done && fn.apply(this, arguments);           // 第一次进来就执行
        done = true;    // 已经执行过了
    }
}
// 支付的函数
function pay(money) {
    console.log(`支付了${money}`);
}
let oncePay = once(pay)
oncePay(500)
oncePay(500)
oncePay(500)