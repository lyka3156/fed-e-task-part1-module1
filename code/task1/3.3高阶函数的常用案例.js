
// 高阶函数 - 常用的高阶函数    map     every some

let array = [1, 2, 3, 4];

// 实现map方法      map返回一个新的数组
Array.prototype.customMap = function (fn) {
    let results = [];
    for (let i = 0, len = this.length; i < len; i++) {
        results.push(fn(this[i], i));
    }
    return results;
}
// 实现every方法    全部满足才返回true
Array.prototype.customEvery = function (fn) {
    for (let i = 0, len = this.length; i < len; i++) {
        // 只要一个不满足就返回false
        if (!fn(this[i], i)) {
            return false;
        }
    }
    return true;
}
// 实现some方法    只要一个满足就返回true
Array.prototype.customSome = function (fn) {
    for (let i = 0, len = this.length; i < len; i++) {
        // 只要一个不满足就返回false
        if (fn(this[i], i)) {
            return true;
        }
    }
    return false;
}
// map
array = array.customMap(item => item * 3);
console.log(array);

// every 
console.log(array.customEvery(item => item % 3 === 0));

// some 
console.log(array.customEvery(item => item % 4 === 0));