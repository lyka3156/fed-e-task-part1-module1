// 引入lodash库
const _ = require("lodash");

// lodash库的使用
// first / last / toUpper / reverse / each / includes / find / findIndex


let array = ["jack", "sumen", "sunney"];

console.log(_.first(array));        // 获取第一个
console.log(_.last(array));         // 获取最后一个
console.log(_.toUpper(array));      // 转大写
console.log(_.reverse(array));      // 数组反转
console.log(_.includes(array, "jack1"));      // 数组是否包含莫一个值

_.each(array, item => {     // 遍历数组
    console.log(item);
});

let findSunney = _.find(array, item => item === "sunney");  // 找数组的项
console.log(findSunney);

let findSunneyIndex = _.findIndex(array, item => item === "sumen");  // 找下标
console.log(findSunneyIndex);

