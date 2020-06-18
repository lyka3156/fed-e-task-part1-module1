// 2. 基于以下代码完成下面的4个练习
const fp = require("lodash/fp");
// 数据如下
// horsepower 马力， dollar_value 价格，in_stock 库存
const cars = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// 2.1 使用函数组合fp.flowRight() 重新实现下面这个函数
console.log("题目1-start");
let isLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars);
  // 获取最后一条数据的in_stock 属性值
  return fp.prop("in_stock", last_car);
};
// console.log(isLastInStock(cars));

// 使用组合实现isLastInStock函数
let isLastInStockCompose = fp.flowRight(fp.prop("in_stock"), fp.last);
console.log(isLastInStockCompose(cars));
console.log("题目1-end");

// 2.2 使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name
console.log("题目2-start");
let isFristInNameCompose = fp.flowRight(fp.prop("name"), fp.first);
console.log(isFristInNameCompose(cars));
console.log("题目2-end");

// 2.3 使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
console.log("题目3-start");
// 求数组的平均值
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length; // 获取xs.length
}; // <- 无须改动
// 将对象格式的数组封装成只要对象的莫个属性的数组
let averageDollarValue = function (cars) {
  let doller_values = fp.map(function (car) {
    return car.dollar_value;
  }, cars);
  return _average(doller_values);
};
// console.log(averageDollarValue(cars));
let averageDollarValueCompose = fp.flowRight(
  _average,
  fp.map(fp.prop("dollar_value"))
);
console.log(averageDollarValueCompose(cars));
// let
console.log("题目3-end");

// 2.4 使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划连线的小写字符串，把数组中的 name 转换为这种形式：
console.log("题目4-start");
// 例如：sanitizeNames(["Hello World"]) => ["hello_world"]
let _underscore = fp.replace(/\W+/g, "_"); // 无须改动，并在 sanitizeNames 中使用它
let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)));
console.log(sanitizeNames(["Hello World", "Go Home"]));
console.log("题目4-end");
