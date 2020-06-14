

// 8.5 lodash中的函数组合  flowRight  调试

const _ = require("lodash");
const oldStr = "NEVER SAY DIE";

// 实现功能
// NEVER SAY DIE -->  never-say-die

// 实现步骤
// 1. 使用split方法空格分割       
// 2. 使用toLower方法转小写
// 3. 使用join方法"-"拼接起来

// console.log(_.split("NEVER SAY DIE", " "));
// 4.1 遇到问题1  flowRight函数组合的方法只支持一个参数，而split/Join方法要两个参数。
// 解决方案使用函数柯里化把第一个参数的结果缓存起来(自己封装一个方法)
const split = _.curry((sep, str) => _.split(str, sep));     // 使用柯里化函数将split方法封装成只要一个参数的函数
const join = _.curry((sep, array) => _.join(array, sep));

// 组合1
const newStr1 = _.flowRight(split(" ")); // 函数组合
// console.log(newStr1(oldStr));      //   [ 'NEVER', 'SAY', 'DIE' ]
// 组合2
const newStr2 = _.flowRight(_.toLower, split(" ")); // 函数组合
// console.log(newStr2(oldStr));      //  never,say,die
// 组合3
const newStr3 = _.flowRight(join("-"), _.toLower, split(" ")); // 函数组合
// console.log(newStr3(oldStr));      //  n-e-v-e-r-,-s-a-y-,-d-i-e


// 通过上面的结果和我们预期的结果不一致  (所以我们加了一个log函数来调试)
// 最后我们使用log函数调试出toLower方法返回的是一个字符串，不是数组，所以我们使用map把每一项都小写最后返回一个新的数组
const log = value => {
    console.log(value, "log");
    return value;
}
const map = _.curry((fn, array) => _.map(array, fn));
const newStr = _.flowRight(join("-"), log, map(_.toLower), log, split(" ")); // 函数组合
console.log(newStr(oldStr));      //  never-say-die

// 4.2 问题2    如图我们使用多个log去调试，就不知道是哪个函数有问题
// 解决方法，使用柯里化函数多额外传一个参数



