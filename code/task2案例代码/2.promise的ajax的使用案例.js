// 2. Promise 方式的 ajax

function ajax(url) {
  return new Promise((resolve, reject) => {
    // 创建ajax对象
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url); // 请求方式和地址
    xhr.responseType = "json"; // 设置响应类型
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.send(); // 发送请求
  });
}

// yarn webpack-dev-server 2.promise的ajax的使用案例.js
// 请求
ajax("/2data.json").then(
  (res) => {
    console.log(res);
  },
  (error) => {
    console.log(error);
  }
);
