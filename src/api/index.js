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

const API_ROOT = process.env.API_ROOT
let func = ''


async function fetch(service, data, loading = false) {
    let access_token = store.state.accessToken
    const user = store.state.user
    if (!access_token) {
        access_token = await getdata('AccessToken.GetAccessToken',{appid, secret})
        store.dispatch('saveAccssToken', access_token)
    }
    return getdata(service, data, loading)
}

async function getdata(service, datas, loading) {
    const dataObj = {
        service,
        access_token: store.state.accessToken,
        ...datas
    }
    if(loading){
         store.dispatch('changeLoading')
    }
    return new Promise((resolve, reject) => {
        Vue.http.post(API_ROOT+'/index.php', queryString.stringify(dataObj)).then(response => {
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
                    if (access_token && user.userId) {
                        return fetch('AccessToken.UpdateAccessToken', { access_token, userid: user.userId }).then(res => {
                            // store.dispatch('saveAccssToken', res)
                            //debugger
                           return fetch(service, datas)
                        })
                    } else if (access_token && !user.userId) {
                        return fetch('AccessToken.GetAccessToken', { appid, secret }).then(res => {
                            store.dispatch('saveAccssToken', res)
                           return fetch(service, datas)
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
                    console.log(router.app._route.name)
                    router.replace({name:'login',query:{redirect: router.app.$route.fullPath}})
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
            router.push({path:'login', query:{redirect: router.app.$route.fullPath}})
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
        store.dispatch('login', user)
        store.dispatch('saveAccssToken', user.token)
        if(router.app.$route.query.redirect){
            router.replace(router.app.$route.query.redirect)
        }else{
             router.replace('/')
        }
    })
}

//图片上传
export function uploader({upfile, type}) {
   return fetch('Default.UploadBase64', {upfile, type})
}

//忘记密码
export function forgetPass(data) {
   return fetch('Login.FrogetDo', data)
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

//首页分类商品
export function getgoodsIndex(data) {
   return fetch('Index.GetRecommendsGoods', data, true)
}


//地址列表
export function addressList(data) {
   return fetch('User.MyAddress', data, true)
}

//新增/修改地址
export function updateAddress(data) {
   return fetch('User.SaveMyAddress', data, true)
}

//需求列表
export function getNeedsByCid(data) {
   return fetch('Requirement.ListR', data, true)
}

//需求详情
export function getNeedsByNid(data) {
   return fetch('Requirement.GetInfo', data, true)
}

//发布需求
export function publishNeed(data) {
   return fetch('Requirement.Add', data, true)
}

//热门标签
export function hotKey(data) {
   return fetch('Index.GetHotKeywords', data)
}

//搜索
export function search(data) {
   return fetch('Index.Search', data, true)
}


//删除购物车
export function deletecartById(data) {
   return fetch('Carts.Delete', data, true)
}

//下单
export function orderDown(data) {
   return fetch('Carts.Settlement', data, true)
}

//订单列表
export function orderIndex(data) {
   return fetch('Orders.Index', data, true)
}

//商店详情
export function shopDetail(data) {
   return fetch('Shops.GetInfo', data, true)
}

//获取商店分类
export function shopCategory(data) {
   return fetch('Shops.GetListCatsByShopId', data, true)
}

//根据商店分类获取商品
export function shopGoodsByShopId(data) {
   return fetch('Shops.Index', data, true)
}

//收藏
export function collect(data){
    return fetch('User.AddCollect', data, true)
}

//收藏列表
export function collectList(data){
    return fetch('User.MyCollect', data, true)
}

//获取新闻列表
export function newsList(data){
    return fetch('Default.Index', data, true)
}

//获取新闻详情
export function newsDetail(data){
    return fetch('Default.GetInfo', data, true)
}

//获取商店评价
export function getValueByShopId(data){
    return fetch('Shops.ListAppraisesByShopsId', data, true)
}

//获取商品评价
export function getValueByGoodsId(data){
    return fetch('Goods.ListAppraisesByGoodsId', data, true)
}

//获取购物车数量
export function getCartNum(data){
    return fetch('Carts.CountAbout', data, true)
}

//获取评价数量
export function getValueNum(data){
    return fetch('index.GetCountAppraise', data, true)
}

//评价
export function valueIt(data){
    return fetch('Orders.AddAppraise', data, true)
}

//删除地址
export function deleteAddr(data){
    return fetch('User.SaveAddressField', data, true)
}

//是否收藏
export function isCollect(data){
    return fetch('User.IsCollect', data)
}

//获取附近商家
export function getNearShops(data){
    return fetch('Shops.GetShopsByPoint', data, true)
}

//取消订单
export function cancelOrder(data){
    return fetch('Carts.UnsetSettlement', data, true)
}

//订单支付
export function orderPay(data){
    return fetch('Orders.Pay', data, true)
}

//获取客服电话
export function getPhone(data){
    return fetch('Default.GetConfig', data, true)
}

//改变订单状态  暂时
export function changeOrderStatus(data){
    return fetch('Orders.ChangStatus', data, true)
}







