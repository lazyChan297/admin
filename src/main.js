// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import axios from 'axios'
import '@/common/stylus/index.styl'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {checkToken} from '@/common/js/util'
import store from '@/store/index'
import {ToastPlugin, LoadingPlugin} from 'vux'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

Vue.use(ToastPlugin)
Vue.use(VueLazyLoad)
Vue.use(LoadingPlugin)
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

let url = window.location.href
// 服务器地址
if (process.env.NODE_ENV === 'development') {
  global.serverHost = ''
} else {
  // 生产服务器
  // global.serverHost = "https://caomeng.me"
  // 测服务器
  global.serverHost = "https://ceshi168.caomeng.me"
}

//获取token
checkToken(url)

// 全局配置axios
Vue.prototype.$axios = axios
const instance = axios.create()
instance.defaults.baseURL = ''
instance.defaults.timeout = 10000
instance.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
    Vue.$vux.loading.show({
      text: '加载中'
    })
    // console.log(Vue.$vux)
    return config
}, err => {
    return Promise.reject(err)
})
axios.interceptors.response.use( response => {
  Vue.$vux.loading.hide()
  return response.data
})
instance.defaults.headers.common['x-access-token'] = global.token


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
