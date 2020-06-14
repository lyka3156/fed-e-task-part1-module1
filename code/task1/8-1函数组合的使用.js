
// 8. 函数组合 

// 简单的函数组合   洋葱形式
// fn1,fn2是要组合的函数    从右向左执行
function compose(fn1, fn2) {
    // value是输入
    return function (value) {
        return fn1(fn2(value))
    }
}
// 数组反转
function reverse(array) {
    return array.reverse();
}
// 数组第一个元素
function frist(array) {
    return array[0];
}
// 组合后的函数： 取最后一个元素
const last = compose(frist, reverse);

console.log(last([1, 2, 3, 4]));