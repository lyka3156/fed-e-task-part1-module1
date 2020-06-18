
// 生成器函数

function* foo() {
    console.log(111);
    // yield 是暂停这个生成器函数的执行，直到调用下一个next才会往下执行
    // next传递的参数会作为yield的返回值
    try {
        const res = yield "foo";
        console.log(res);
    } catch (e) {
        console.log(e);
    }

}

// 1. 生成器函数foo执行后创建了生成器对象generator
// 2. generator第一次执行next才会让foo函数执行，到yield关键词之前就暂停
// 3. next每次执行在遇到yield会暂停一下，直到执行完所有yield,foo才算执行完
// 4. next传递的参数会作为yield的返回值
// 5. generator对象执行throw方法会抛出一个异常，可以在foo函数中try catch异常
const generator = foo();
const result = generator.next("参数");
generator.throw(new Error("generator error"));
console.log(result);


