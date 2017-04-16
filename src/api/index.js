import Vue from 'vue'
import ajax from 'vux/src/plugins/ajax'
import Toast from 'vux/src/plugins/toast'
import queryString from 'vux/src/tools/queryString'
import store from '../store'

Vue.use(ajax)
Vue.use(Toast)

const appid = 'wxe6ab26eb9276d611'
const secret = '0d1750587901b3570a84b6b0ca4e8dde'
let access_token = store.state.accessToken

//aaccesstoken 如果没有需请求获取
if (!access_token) {
    saveAccessToken()
}


function fetch(url, data) {
    let service = {
        service: url,
        access_token
    }
    let dataObj = Object.assign({}, service, data)
    return new Promise((resolve, reject) => {
        Vue.http.post('/index.php', queryString.stringify(dataObj)).then(response => {
            if (response.status == 200) {
                const data = response.data
                if (data.ret == 200) {
                    resolve(data.data.result)
                } else if (data.ret == 401 || data.ret == 400) {
                    Vue.$vux.toast.show({
                        text: data.msg,
                        position: 'bottom',
                        width: 'auto',
                        type: 'text'
                    })
                } else if (data.ret == 402) {
                    saveAccessToken()
                }
            }
        }, reject => {
            Vue.$toast({
                text: '网络异常，请稍后'
            })
        })
    })
}

//获取access_token
function saveAccessToken() {
    fetch('AccessToken.GetAccessToken', { appid, secret }).then(res => {
        store.dispatch('saveAccssToken', res)
    })
}

//获取验证码/找回密码
export function sendSms(data) {
    return fetch('Login.SendSms', data)
}

//注册
export function register(data){
     return fetch('Login.Register', data)
}




