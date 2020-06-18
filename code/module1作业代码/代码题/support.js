// functor函子
class Functor {
  // 提供静态方法来实现创建对象
  static of(value) {
    return new Functor(value);
  }
  // 将值存入容器中，外部不能访问
  constructor(value) {
    this._value = value;
  }
  // 提供一个map方法，来操作容器里面的值
  map(fn) {
    return Functor.of(fn(this._value));
  }
}

// Maybe函子    防止值为空发生异常
class Maybe {
  static of(value) {
    return new Maybe(value);
  }

  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value));
  }
  isNothing() {
    return this._value === null || this._value === undefined;
  }
}

module.exports = { Functor, Maybe };
