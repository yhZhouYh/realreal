import Vue from 'vue'
import ajax from 'vux/src/plugins/ajax'
import Toast from 'vux/src/plugins/toast'
import queryString from 'vux/src/tools/queryString'
import store from '../store'
import router from '../router'

Vue.use(ajax)
Vue.use(Toast)

const appid = 'wxe6ab26eb9276d611'
const secret = '0d1750587901b3570a84b6b0ca4e8dde'
let access_token = store.state.accessToken

async function fetch(service, data) {
    let access_token = store.state.accessToken
    const user = store.state.user
    if (!access_token) {
        access_token = await getdata({ service: 'AccessToken.GetAccessToken', appid, secret })
        store.dispatch('saveAccssToken', access_token)
    }
    return getdata(service, data)
}

function getdata(service, datas) {
    const dataObj = {
        service,
        access_token: store.state.accessToken,
        ...datas
    }
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
                    const access_token = store.state.accessToken
                    const user = store.state.user
                    if (access_token && user.id) {
                        getdata('AccessToken.UpdateAccessToken', { access_token, userid: user.id }).then(res => {
                            getdata(service, datas)
                        })
                    } else if (access_token && !user.id) {
                        getdata('AccessToken.GetAccessToken', { appid, secret }).then(res => {
                            store.dispatch('saveAccssToken', res)
                            getdata(service, datas)
                        })
                    }else {
                        Vue.$vux.toast.show({
                            text: '无相关操作权限',
                            position: 'bottom',
                            width: 'auto',
                            type: 'text'
                        })
                    }

                } else if (data.ret == 403) {
                    router.push('login')
                }
                reject(data)
            }
        }, error => {
            Vue.$vux.toast.show({
                text: '网络异常',
                position: 'bottom',
                width: 'auto',
                type: 'text'
            })
        })
    })
}


function dealRes(res) {
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
        } else if (data.ret == 403) {
            router.push('login')
        }
        reject(data)
    }
}

//获取access_token
// function saveAccessToken() {
//     fetch('AccessToken.GetAccessToken', { appid, secret }).then(res => {
//         store.dispatch('saveAccssToken', res)
//     })
// }

//  function saveAccessToken(data) {
//      getdata(data).then(res => {
//         store.dispatch('saveAccssToken', res)
//         return res
//     })
// }

//获取验证码/找回密码
export function sendSms(data) {
    return fetch('Login.SendSms', data)
}

//注册
export function register(data) {
    return fetch('Login.Register', data)
}

//登陆
export function login(data) {
    fetch('Login.Login', data).then(user => {
        console.log(user)
        store.dispatch('login', JSON.stringify(user))
        store.dispatch('saveAccssToken', user.token)
    })
}




