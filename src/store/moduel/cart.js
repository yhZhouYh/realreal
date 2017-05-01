import * as types from '../mutation-types'

let cartItem = {
    storeId: 0,
    storeName: 0,
    services: []
}

const state = {
    carts: JSON.parse(localStorage.getItem('carts')) || { items: [], quntity: 0, totalPrice: 0 },
    currentGoods: {}
}

const getters = {
    cartAllCounts: state => state.carts.quntity, //购物车总数量
    cartTotalPrice: state => {
        let totalprice = 0
        state.carts.items.map((item,index) => {
            totalprice += item.shopPrice * item.cartNum
        })
        return totalprice
    }
}

const actions = {
    checkout({ commit, state }, items) {
        //const savedCartItems = [...state.items] //复制购物车商品
        commit(types.CHECKOUT_REQUEST, items)
        //购买逻辑
    },
    addToCart({ commit, state }, item) {
        commit(types.ADD_TO_CART, item)
    },
    minusfromCart({ commit, state }, item) {
        commit(types.DELETE_FROM_NUMBER, item)
    },
    getCartItem({ commit, state }, item) {
        commit(types.GET_CART_ITEM, item)
    },
    updateIsCheck({ commit, state }, {item, index}) {
        commit(types.UPDATE_CHECK, {item, index})
    },
    deleteIndex({ commit, state }, {item, index}) {
        commit(types.DELETE_INDEX, {item, index})
    }

}

const mutations = {
    [types.ADD_TO_CART](state, item) {
        const record = state.carts.items.find(p => p.goodsId === item.goodsId) //找到符合条件的第一个项目
        if (!record) {
            item.cartNum = 1
            item.isCheck = true
            state.carts.items.push(item)
        } else {
            // record.cartNum++ 修改购物车逻辑
            record.cartNum = item.cartNum
        }
        state.carts.quntity = state.carts.items.length
        state.carts.totalPrice = item.shopPrice * item.cartNum
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    [types.CHECKOUT_REQUEST](state, items) {
        // 清空购物车
        // state.items = []
        state.carts.items = items
    },

    [types.DELETE_FROM_NUMBER](state, item) {
        const index = state.carts.items.findIndex(p => p.goodsId === item.goodsId) //找到符合条件的第一个项目的索引
        if (!index && index != 0) {
            return
        } else {
            // debugger
            const detail = state.carts.items.find(i => i.goodsId === item.goodsId) //找到services中符合条件的部分
            if (!detail) {
                return
            } else {
                state.carts.quntity--
                detail.cartNum--
                state.carts.totalPrice = item.shopPrice * item.cartNum
                if (detail.cartNum == 0) {
                    state.carts.items.splice(index, 1)
                }
            }
        }
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },

    [types.GET_CART_ITEM](state, item) {
        const goods = state.items.find(p => p.goodsId === item.goodsId)
        state.currentGoods = goods
    },
    [types.UPDATE_CHECK](state, {item, index}) {
        item.isCheck = !item.isCheck
        state.carts.items[index] = item
        state.carts.totalPrice -= item.shopPrice * item.cartNum
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    [types.DELETE_INDEX](state, {item, index}) {
        state.carts.quntity -= item.cartNum
        state.carts.totalPrice -= item.shopPrice * item.cartNum
        state.carts.items.splice(index, 1)
        localStorage.setItem('carts', JSON.stringify(state.carts))
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}