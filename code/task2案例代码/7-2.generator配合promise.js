
// 2. generator 配合 promise 的异步方案

// 模拟ajax请求
function ajax(url) {
    // ......   异步操作逻辑
    return new Promise((resolve, reject) => {
        if (url.includes("json")) {
            resolve(url + " 的请求结果");
        } else {
            reject("请求失败");
        }
    });
}

function* main() {
    // 请求ajax,并且得到ajax的返回结果
    // 通过这种方式可以让promise变的更像同步的代码
    try {
        const post1 = yield ajax("/1.json");
        console.log(post1);

        const post2 = yield ajax("/2.json");
        console.log(post2);

        const post3 = yield ajax("/3.js");
        console.log(post3);
    } catch (e) {
        console.log(e);
    }
}


// 将下面的代码使用递归的方式写出来
// 有个库就叫做co的库
function co(generator) {
    const g = generator();   // 得到生成器对象
    // 递归执行生成器对象的next，直到done为true执行完成
    function handleResult(result) {
        if (result.done) return; // done属性为true，代表生成器结束了
        result.value.then(data => {
            handleResult(g.next(data));
        }, error => {
            // promise请求失败的时候，给生成器抛出异常
            g.throw(error);
        });
    }
    handleResult(g.next());
}
co(main);


// const result = g.next();
// result.value.then(res => {
//     // 把ajax请求的结果通过next传递参数给yield的返回值
//     const result2 = g.next(res);

//     if (result2.done) return;   // done为true代表生成器结束了
//     result2.value.then(res => {
//         // 把ajax请求的结果通过next传递参数给yield的返回值
//         const result3 = g.next(res);
//         if (result3.done) return;    // done为true代表生成器结束了
//     })
// })