
// 引入纯函数库 lodash 
const _ = require("lodash");

// 获取圆的面积
function getArea(r) {
    console.log(r);
    return Math.PI * r * r;
}

// 使用lodash库的 记忆函数
// let getAreaWithR = _.memoize(getArea);
let getAreaWithR = memoize(getArea);

// memoize函数的
// 优点:    第一次调用会把结果缓存起来，下次直接从缓存中取
// 条件:    相同的输入，返回相同的输出  （多次调用的参数是一致的）
console.log(getAreaWithR(3));   // 第一次调用了getArea，并且把结果缓存起来
console.log(getAreaWithR(3));   // 第二次调用从缓存中取
console.log(getAreaWithR(3));

// memoize 函数的实现
function memoize(fn) {
    let cach = {};      // 将fn函数的参数和返回结果存起来，下次请求的时候直接从缓存中取
    return function () {
        let key = JSON.stringify(arguments);    // 获取到fn函数的参数
        cach[key] = cach[key] || fn.apply(fn, arguments);           // 有缓冲中从缓存中取，没有就设置到缓存中
        return cach[key];
    }
}