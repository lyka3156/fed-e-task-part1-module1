// 02-MayBe函子

// MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）

class MayBe {
  static of(value) {
    return new MayBe(value);
  }
  constructor(value) {
    // 容器内部的值，不允许外部直接修改
    this._value = value;
  }
  // 提供map方法给外部调用，外部通过传递一个函数来修改容器里的值
  map(fn) {
    return new MayBe(this.isNothing(this._value) ? null : fn(this._value));
  }
  // 判断外部传来的值是否为空       控制副作用在允许的范围之内
  isNothing(value) {
    return value === null || value === undefined;
  }
}

console.log(
  MayBe.of(123)
    .map((x) => x + 3)
    .map((x) => null)
    .map((x) => x + 2)
);
