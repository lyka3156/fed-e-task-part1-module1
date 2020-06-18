// 03-Either 函子

// Either 两者中的任何一个，类似于 if...else...的处理
// 异常会让函数变的不纯，Either 函子可以用来做异常处理

// 错误的函子
class Left {
  static of(value) {
    return new Left(value);
  }
  constructor(value) {
    // 容器内部的值，不允许外部直接修改
    this._value = value;
  }
  // 提供map方法给外部调用，外部通过传递一个函数来修改容器里的值
  map(fn) {
    return this;
  }
}
// 正确的函子
class Right {
  static of(value) {
    return new Rgiht(value);
  }
  constructor(value) {
    // 容器内部的值，不允许外部直接修改
    this._value = value;
  }
  // 提供map方法给外部调用，外部通过传递一个函数来修改容器里的值
  map(fn) {
    return new Rgiht(fn(this._value));
  }
}

let parserJSON = function (json) {
  try {
    return Right.of(JSON.parse(json));
  } catch (e) {
    return Left.of({ error: e.message });
  }
};

console.log(parserJSON('{name:"zhangshan"}'));
