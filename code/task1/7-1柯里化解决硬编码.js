
// 不纯的       函数依赖于外部的状态就无法保证输出相同，就会带来副作用 (把纯函数编程不纯了)
// let min = 18;               // 外部变量
// function checkAge(age) {
//     return age > min;
// }


// 纯的 (有硬编码，后续可以通过柯里化解决)
// function checkAge2(age) {
//     let min = 18;   // 硬编码
//     return age > min;
// }


// 使用柯里化解决硬编码的问题
// 普通的纯函数
// function checkAge(min, age) {
//     return age > min;
// }
// console.log(checkAge(18, 20));
// console.log(checkAge(18, 22));
// console.log(checkAge(24, 23));

// 闭包+高阶函数
// function checkAge(min) {
//     return function (age) {
//         return age > min;
//     }
// }
let checkAge = min => (age => age > min);       // es6  箭头函数
let checkAge18 = checkAge(18);
console.log(checkAge18(20));
console.log(checkAge18(21));
console.log(checkAge18(23));

