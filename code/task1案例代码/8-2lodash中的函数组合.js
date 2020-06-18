

// 8.2 lodash中的函数组合  flowRight 

const _ = require("lodash");

// 实现功能： 获取数组的最后一个元素再转换成大写字母
const reverse = array => array.reverse();
const first = array => array[0];
const toUpper = str => str.toUpperCase();

// 从右向左执行
const lastUpper = _.flowRight(toUpper, first, reverse);

console.log(lastUpper(["java", "html", "css", "js"]));
