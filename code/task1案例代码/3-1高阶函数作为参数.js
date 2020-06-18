
// 高阶函数 - 函数作为参数

let array = [1, 2, 3, 4];

// 函数作为参数

// 实现forEach方法
Array.prototype.customForEach = function (fn) {
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i], i);
    }
}
// 实现filter方法
Array.prototype.customFilter = function (fn) {
    let results = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i], i) && results.push(this[i]);
    }
    return results;
}

array.customForEach(item => {
    console.log(item);
});

console.log(array.customFilter(item => item > 2));


