// 1. 将下面异步代码使用 Promise 的方式改进

setTimeout(function () {
  var a = "hellow ";
  setTimeout(function () {
    var b = "lagou ";
    setTimeout(function () {
      var c = "I love You";
      console.log("setTimeout版", a + b + c);
    }, 10);
  }, 10);
}, 10);

// 使用了Promise的then方法链式调用，每个then方法都依赖于上个then的执行结果
Promise.resolve("hellow")
  .then((value) => {
    return value;
  })
  .then((value) => {
    return (value += " lagou ");
  })
  .then((value) => {
    return (value += "I love You");
  })
  .then((value) => {
    console.log("promise版:", value);
  });
