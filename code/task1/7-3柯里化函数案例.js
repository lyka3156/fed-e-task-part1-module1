
// lodash 柯里化案例
// let match = /[a-zA-Z]/g;     // 匹配大小写字母
// let match = /\d+/g;     // 匹配数字

const _ = require("lodash");


// 1) 柯里化函数来匹配字符串
const curriedStrMatch = _.curry((reg, str) => str.match(reg));
// 1.1) 通过柯里化生成不同的匹配规则来匹配字符串
const hasEng = curriedStrMatch(/[a-zA-Z]/g);        // 匹配大小写字母         可以重复使用
const hasNumber = curriedStrMatch(/\d/g);           // 匹配数字               可以重复使用
// console.log(hasEng(" 123abc "), "字符串找字母");
// console.log(hasNumber(" 123abc "), "字符串找数字");

// 2) 柯里化函数来给array.filter方法加强        通过不同的匹配规则过滤
const curriedArrayFilter = _.curry((func, array) => array.filter(func));
const findEng = curriedArrayFilter(hasEng);    // 找字母
const findNumber = curriedArrayFilter(hasNumber);  // 找数字


console.log(findEng(["John Connor", "Java Lower", "中文1", " "]), "数组找字母");
console.log(findNumber(["12", "23", "abc", "中文2"]), "数组找数组");

// console.log([1,2,3].filter(item => func(item)));
