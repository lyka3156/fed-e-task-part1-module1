
// 不纯的       函数依赖于外部的状态就无法保证输出相同，就会带来副作用 (把纯函数编程不纯了)
let min = 18;               // 外部变量
function checkAge(age) {
    return age > min;
}


// 纯的 (有硬编码，后续可以通过柯里化解决)
function checkAge2(age) {
    let min = 18;   // 硬编码
    return age > min;
}

// 不是纯函数
console.log(checkAge(20));      // true
min = 30;
console.log(checkAge(20));      // false

// 纯函数
console.log(checkAge2(20));     // true
console.log(checkAge2(20));     // true