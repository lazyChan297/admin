import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

//axios 全局配置
const instance = axios.create()
instance.defaults.baseURL = ''
instance.defaults.timeout = 10000
instance.defaults.withCredentials = true
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

// ajax请求
function axiosFn(fn, url, params, config, sucFn) {
    instance.defaults.headers.common['x-access-token'] = global.token
    let obj = Qs.parse(params)
    if (fn === axios.get) {
        obj = Qs.parse(params)
        params = {params}
    } else {
        Object.prototype.toString.call(params) != '[object FormData]' ? params = QS.stringify(params) : params
    }
    return fn (global.serverHost + url, params, config).then ((res) => {
		Vue.$vux.loading.hide()
		let result = res.data
		if (sucFn) {
            sucFn(result);
        }
		return result
	}).catch(ex => {
		// 错误的回调
	})
}

export default {
	// post
	post: function (url, params, config, sucFn) {
		return axiosFn (axios.post, url, params, config, sucFn)
	},
	// get
	get: function (url, params, config, sucFn) {
		return axiosFn (axios.get, url, params, config, sucFn)
	}
}