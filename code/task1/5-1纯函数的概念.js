
// 纯函数和不纯函数
// slice 和 splice


let array = [1, 2, 3, 4];

// 纯函数： 相同的输入会有相同的输出，没有副作用
console.log(array.slice(0, 2));
console.log(array.slice(0, 2));
console.log(array.slice(0, 2));

// 不是纯函数，相同的输入不一定有相同的输出
console.log(array.splice(0, 1));
console.log(array.splice(0, 1));
console.log(array.splice(0, 1));