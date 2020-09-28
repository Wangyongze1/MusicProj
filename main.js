import Vue from 'vue'
import App from './App'
import axios from './node_modules/axios'
import miniplayer from './components/my-mini-player/my-mini-player.vue'
import store from './store'

Vue.prototype.$store = store
Vue.component('mini-player',miniplayer)
// create an axios instance
const service = axios.create({
	baseURL: 'https://musicapi.leanapp.cn/',
	// baseURL: 'http://api.cloudmusic.pulsating.cn:3000', // url = base url + request url
    // baseURL: 'http://192.168.1.106:3000', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
	changeOrigin: true,
    // timeout: 5000, // request timeout
    crossDomain: true
})
service.interceptors.request.use(
    config => {
        // if (store.state.token) {
        //     // 给请求头添加user-token
        //     config.headers["user-token"] = store.state.token;
        // }
        console.log(config)
        return config;
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    if (response.data.code) {
      // switch (response.data.code) {
      //   case 1002:
      //     store.state.isLogin = false
      //     router.replace({
      //       path: 'login',
      //       query: {
      //         redirect: router.currentRoute.fullPath
      //       }
      //     })
      // }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}
Vue.prototype.$axios = service
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
