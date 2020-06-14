
// 函数是一等公民

// 1) 函数可以存储在变量中
// 函数存到变量中
let fn = () => {
    console.log("我是函数一等公民特性1");
}
fn()

// 函数存到对象的变量中
let Views = {
    index: () => { }
}
const BlogController = {
    index: Views.index
}

// 2) 函数可以作为参数



// 3) 函数作为返回值