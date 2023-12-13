import axios from "axios";
import qs from "qs";
import layx from "vue-layx";


// 设置默认值
axios.defaults.baseURL = "http://localhost:8000/api";
/*axios.defaults.baseURL = "http://1.14.12.49:8000/api";*/
axios.defaults.timeout = 50000;

// get 方法
// url:请求地址 param:json 对象，请求参数
function doGet(url, params) {
    return axios({
        url : url,
        method : "get",
        params : params
    });
}

// post 方法
// 传递的是 json 格式数据
function doPostJson(url, params) {
    return axios({
        url : url,
        method : "post",
        data : params
    })
}

// key=value 格式
function doPost(url, params) {
    // 将 json 对象转化为 A=a&B=b
    let requestData = qs.stringify(params);
    return axios.post(url, requestData);
}

// 创建应答拦截器
axios.interceptors.response.use(function (resp) {
    if (resp && resp.data.code > 1000) {
        let code = resp.data.code;
        if (code == 3000) {
            // token 无效，重新登录
            window.location.href = "/page/user/login";

        } else {
            layx(resp.data.msg, {dialogIcon: "warn", position: "ct"})
        }
    }
    return resp;
}, function (err) {
    console.log("应答拦截器错误:" + err);
    // 回到首页
    //window.location.href = "/";
})

// 创建拦截器
axios.interceptors.request.use(function (config) {
    // 需要登录用户信息的操作，在请求的 url 后加入 token
    //判断访问服务器的 url 地址
    console.log("url==== " + config.url)
    let storageToken = window.localStorage.getItem("token");
    //console.log("token= " + storageToken);
    let userInfo = window.localStorage.getItem("userInfo");
    if (storageToken && userInfo) {
        if (config.url == "/v1/user/realname" || config.url == "/v1/user/usercenter"
            || config.url == "/v1/recharge/records" || config.url == "/v1/invest/info"
            || config.url == "/v1/income/info" || config.url == "/v1/invest/product") {
            config.headers["Authorization"] = "Bearer " + storageToken;
            config.headers["uid"] = JSON.parse(userInfo).uid;
        }
    }
    return config;
},function (err) {
    console.log("请求错误" + err);
});


// 导出，暴露函数
export {
    doGet,
    doPostJson,
    doPost
}
