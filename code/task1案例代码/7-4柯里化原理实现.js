

// lodash 中的 curry 柯里化函数的实现原理

const _ = require("lodash");



function getSum(a, b, c) {
    return a + b + c;
}
// let curriedSum = _.curry(getSum);   // 生成柯里化以后函数
let curriedSum = curry(getSum);   // 生成柯里化以后函数

// 柯里化之后的函数需要的参数全部传完才会执行被柯里化之前的函数，否则继续返回该函数并等待接受剩余的参数,直到参数传递完
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2)(3));
console.log(curriedSum(1, 2, 3));

// 柯里化函数的实现
// 1. 一次性全部参数传递完成，就直接调用原始函数
// 2. 分批次传递参数，就返回一个函数来接收剩余的参数，直到全部参数传递完成，再把所有参数整合起来调用原始参数    
// 3. 使用了 闭包,高阶函数和递归

/**
 * 实现curry柯里化函数
 * @param {*} func  原始函数
 */
function curry(func) {
    // 柯里化函数 curried
    return function curried(...args) {
        // 步骤1
        if (args.length >= func.length) {
            console.log("实参数量多");
            return func(...args);
        } else {
            console.log("形参数量多");
            //  实参数量少，返回一个函数          步骤2
            return function () {
                // 递归调用curried来判断参数是否传完，传完就执行原始函数，否则重复次步骤
                return curried(...[...args, ...arguments])
            }
        }
    }
}



