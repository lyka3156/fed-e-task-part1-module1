// 3. 基于下面提供的代码，完成后续的4个练习

const { Functor, Maybe } = require("./support.js");
const fp = require("lodash/fp");

// 3.1 使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 Functor 里的值增加的函数 ex1
console.log("题目1-start");
let maybe = Maybe.of([5, 6, 1]);
let ex1 = (number, array) => fp.map(fp.add(number), array);
let exCurry = fp.curry(ex1); // 柯里化 ex1 函数，
let exCurry2 = exCurry(2); // 缓存 ex1 的第一个参数, 得到只要array的函数就可以了
console.log(maybe.map(exCurry2));
console.log("题目1-end");

// 3.2 实现一个函数 ex2 , 能够使用 fp.first 获取列表的第一个元素
console.log("题目2-start");
let xs = Functor.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = (array) => fp.first(array);
console.log(xs.map(ex2));
console.log("题目2-end");

// 3.3 实现一个函数 ex3 ,使用 safeProp 和 fp.first 找到 user的名字的首字母
console.log("题目3-start");
// 指定获取对象莫个属性的柯里化函数
let safeProp = fp.curry((x, o) => Maybe.of(o[x]));
let ex3 = (name) => fp.first(name);
let user = { id: 2, name: "Albert" };
let nameProp = safeProp("name"); // 获取name属性的科里化函数
console.log(nameProp(user).map(ex3));
console.log("题目3-end");

// 3.4 使用 Maybe 重写 ex4 , 不要有 if 语句
console.log("题目4-start");
let ex4 = function (n) {
  if (n) {
    return parseInt(n);
  }
};
let ex41 = (n) => {
  return n ? Maybe.of(n).map(parseInt) : Maybe.of(n);
};
console.log(ex41("21abc"));
console.log(ex41(""));
console.log("题目4-end");
