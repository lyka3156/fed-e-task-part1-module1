

// lodash 中的 curry 柯里化函数的使用

const _ = require("lodash");



function getSum(a, b, c) {
    return a + b + c;
}
let curriedSum = _.curry(getSum);   // 生成柯里化以后函数

// 柯里化之后的函数需要的参数全部传完才会执行被柯里化之前的函数，否则继续返回该函数并等待接受剩余的参数,直到参数传递完
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2)(3));
console.log(curriedSum(1, 2, 3)); 