
// 配置开发环境与生产环境
let hostName

if (process.env.NODE_ENV == 'development') {
    hostName = '/api'
}else{
    // hostName = 'http://47.99.180.135:8088'      //测试
    hostName = 'http://47.99.180.135:8080'   //正式
    // hostName = window.location.origin
}

export default hostName

