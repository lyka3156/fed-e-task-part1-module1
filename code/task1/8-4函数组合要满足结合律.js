

// 8.4 lodash中的函数组合  flowRight 满足结合律

const _ = require("lodash");

// 实现功能： 获取数组的最后一个元素再转换成大写字母

// 从右向左执行
// const lastUpper = _.flowRight(_.toUpper, _.first, _.reverse);
// const lastUpper = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse);
const lastUpper = _.flowRight(_.flowRight(_.toUpper), _.first, _.reverse);

console.log(lastUpper(["java", "html", "css", "js"]));
