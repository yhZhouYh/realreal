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
debugger
const API_ROOT = process.env.API_ROOT


async function fetch(service, data, loading = false) {
    let access_token = store.state.accessToken
    const user = store.state.user
    if (!access_token) {
        access_token = await getdata('AccessToken.GetAccessToken',{appid, secret})
        store.dispatch('saveAccssToken', access_token)
    }
    return getdata(service, data, loading)
}

function getdata(service, datas, loading) {
    const dataObj = {
        service,
        access_token: store.state.accessToken,
        ...datas
    }
    if(loading){
         store.dispatch('changeLoading')
    }
    return new Promise((resolve, reject) => {
        Vue.http.post('/index.php', queryString.stringify(dataObj)).then(response => {
            var state = store.state.loading
            if(state){
                store.dispatch('changeLoading')
            }
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
                    debugger
                    console.log(router.app._route.name)
                    router.push({name:'login',query:{redirect: router.app.$route.name}})
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
            router.push({path:'login', query:{redirect: router.app.$route.query.name}})
        }
        reject(data)
    }
}

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
       console.log(router)
        store.dispatch('login', user)
        store.dispatch('saveAccssToken', user.token)
        if(router.app.$route.query.redirect){
            router.push(router.app.$route.query.redirect)
        }else{
             router.push('/')
        }
        
    })
}

//图片上传
export function uploader({upfile, type}) {
   return fetch('Default.UploadBase64', {upfile, type})
}

//忘记密码
export function forgetPass(data) {
   return fetch('Login.Register', data)
}

//编辑用户信息
export function editUser(data) {
   return fetch('User.SaveField', data)
}

//获取地区
export function getArea(data) {
   return fetch('Default.AreaList', data, true)
}

//商家个人入驻
export function apply(data) {
   return fetch('User.Apply', data, true)
}

//获取分类
export function getCategory(data) {
   return fetch('Default.GetColumn', data)
}

//首页轮播
export function indexAds(data) {
   return fetch('Index.Ads', data)
}

//文章
export function article(data) {
   return fetch('Default.Index', data)
}

//根据分类查商品
export function getGoodsByCid(data) {
   return fetch('Goods.Index', data, true)
}

//商店索引
export function getStoreById(data) {
   return fetch('Shops.Index', data, true)
}


//商店索引
export function goodsDetail(data) {
   return fetch('Goods.GetInfo', data, true)
}

//购物车列表
export function cartList(data) {
   return fetch('Carts.Index', data)
}

//添加购物车
export function cartAdd(data) {
   return fetch('Carts.Add', data, true)
}




