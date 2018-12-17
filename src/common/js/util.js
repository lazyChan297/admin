import webStorageCache from 'web-storage-cache'
import urls from 'url'
import { clearTimeout } from 'timers';

// 获取地址栏参数
export function getUrlParms(name) {
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  }

// 获取token
export function checkToken (url) {
    let wsCache = new webStorageCache()
    global.token = wsCache.get('token')
    let urlObj = urls.parse(url)
    let pageUrl = urlObj.protocol + '//' + urlObj.host + '/' + urlObj.hash
    console.log(global.token)
    //如果token失效则重新获取
	setTimeout(() => {
        window.location.reload()
     }, 60 *60 * 1000 * 2 )
     if (!global.token && !getUrlParms('token')) {
         window.onload = function () {
             window.location.href = global.serverHost + '/wechat/getUserInfo?url_befor_login=' + encodeURIComponent(url)
         }
     // 保存失效为两小时
     }else if (url != pageUrl && url != global.serverHost + '/newCart/pay/#/goods/payment/') {
         window.location.href = pageUrl
     }
     if (getUrlParms('token')) {
         wsCache.set('token', getUrlParms('token'), { exp : 60 * 60 * 2 } )
     }
}

