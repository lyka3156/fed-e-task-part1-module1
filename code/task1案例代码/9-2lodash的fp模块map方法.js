
// 9.2 lodash 和 lodash/fp 模块的 map方法区别

const _ = require("lodash");
console.log(_.map([23, 8, 10], parseInt));        // [ 23, NaN, 2 ]
// parseInt(23,0,array);     第二个参数是进制
// parseInt(8,1,array);
// parseInt(10,2,array);


const fp = require("lodash/fp");
console.log(fp.map(parseInt, [23, 8, 10]));        // [ 23, NaN, 2 ]

// lodash 和 lodash/fp 的map方法的区别是接受参数不一样