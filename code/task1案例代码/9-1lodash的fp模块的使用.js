// 9.1 lodash模块实现以下功能
const _ = require("lodash");
const oldStr = "NEVER SAY DIE";
// 实现功能
// NEVER SAY DIE -->  never-say-die
// 实现步骤
// 1. 使用split方法空格分割       
// 2. 使用toLower方法转小写
// 3. 使用join方法"-"拼接起来
// 使用柯里化函数将split方法封装成只要一个参数的函数
const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, array) => _.join(array, sep));
const map = _.curry((fn, array) => _.map(array, fn));

const newStr = _.flowRight(join("-"), map(_.toLower), split(" ")); // 函数组合
console.log(newStr(oldStr));      //  never-say-die




// 9.2 lodash/fp模块实现上面的功能
const fp = require("lodash/fp");
// fp模块的特点  
// 函数优先，数据之后，都是被柯里化过的，不需要我们手动柯里化了
const newStr2 = fp.flowRight(fp.join("-"), fp.map(fp.toLower), fp.split(" ")); // 函数组合
console.log(newStr2(oldStr));      //  never-say-die


