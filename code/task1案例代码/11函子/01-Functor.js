// Functor 函子
// 1. 维护一个值，不对外公布
// 2. 对外提供一个map，map方法接受一个处理值的函数
// 调用map方法的时候，会调用这个处理值的函数去处理值
// 并且把处理后的结果传递给新的函子,由新的函子保存
class Continer {
  static of(value) {
    return new Continer(value);
  }

  constructor(value) {
    // 这个_value是这个容器里面的，不对外公布
    this._value = value;
  }

  // 向外提供一个map方法，接受一个处理值的函数(纯函数)，通过这个函数来处理_value
  map(fn) {
    return new Continer(fn(this._value));
  }
}

console.log(Continer.of(3));
console.log(Continer.of(3).map((x) => x + 3));
