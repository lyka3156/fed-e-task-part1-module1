

// 8.3 lodash中的函数组合  flowRight 原理实现

const _ = require("lodash");

// 实现功能： 获取数组的最后一个元素再转换成大写字母
const reverse = array => array.reverse();
const first = array => array[0];
const toUpper = str => str.toUpperCase();

// 从右向左执行
// const lastUpper1 = _.flowRight(toUpper, first, reverse);

const lastUpper1 = flowRight2(toUpper, first, reverse);

console.log(lastUpper1(["java", "html", "css", "js"]));

// 函数组合 flowRight的实现
// 1. 接受多个函数，从右向左执行
// 2. 返回一个新的函数

// 根据 curry柯里化函数自己实现的
function flowRight3(...args) {
    return function flowDigui() {
        // 如果只有一个函数了直接执行，并且把结果返回
        if (args.length === 1) {
            return args[0](...arguments);
        }
        let preResult = args[args.length - 1](...arguments);
        args = args.slice(0, -1);
        return flowDigui(preResult);
    }
}

// 使用es6的reduce方法实现 flowRight
function flowRight2(...args) {           // args需要依次执行的函数组合
    return function (value) {           // 第一个函数的输入
        // 将函数反转就是从右往左执行
        return args.reverse().reduce(function (preResult, fn) { // preResult上一个函数的执行结果    fn数组的每一项
            return fn(preResult);
        }, value)
    }
}

const flowRight = (...args) => (value => args.reverse().reduce((preResult, fn) => fn(preResult), value));
const lastUpper = flowRight(toUpper, first, reverse);

console.log(lastUpper(["java", "html", "css", "js"]));

