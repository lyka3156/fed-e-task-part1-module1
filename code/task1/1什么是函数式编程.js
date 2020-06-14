
// 非函数式
let num1 = 1;
let num2 = 2;
let sum = num1 + num2;
console.log(sum);


// 函数式编程
// 要有输入和输出
function add(a, b) {        // 输入
    return a + b;          // 输出
}
console.log(add(1, 2));
console.log(add(1, 2)); // 相同的输入有相同的输出（纯函数）