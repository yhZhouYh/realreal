import * as types from '../mutation-types'

let cartItem = {
    storeId: 0,
    storeName: 0,
    services: []
}

const state = {
    carts: JSON.parse(localStorage.getItem('carts')) || { items: [], quntity: 0 },
    currentGoods: {}
}

const getters = {
    cartAllCounts: state => state.carts.quntity, //购物车总数量
}

const actions = {
    checkout({ commit, state }, items) {
        const savedCartItems = [...state.items] //复制购物车商品
        commit(types.CHECKOUT_REQUEST)
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
    updateIsCheck({ commit, state }, item, index) {
        commit(types.UPDATE_CHECK, item, index)
    },
    deleteIndex({ commit, state }, item, index) {
        commit(types.DELETE_INDEX, item, index)
    }

}

const mutations = {
    [types.ADD_TO_CART](state, item) {
        const record = state.carts.items.find(p => p.goodsId === item.goodsId) //找到符合条件的第一个项目
        if (!record) {
            item.count = 1
            item.isCheck = true
            state.carts.items.push(item)
        } else {
            record.count++
        }
        state.carts.quntity++
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    [types.CHECKOUT_REQUEST](state) {
        // 清空购物车
        state.items = []
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
                detail.count--
                if (detail.count == 0) {
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
    [types.UPDATE_CHECK](state, item, index) {
        item.isCheck = !item.isCheck
        state.carts.items[index] = item
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    [types.DELETE_INDEX](state, item, index) {
        debugger
        state.carts.quntity -= item.count
        state.carts.items.splice(index, 1)
        console.log(state.carts.quntity)
        localStorage.setItem('carts', JSON.stringify(state.carts))
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}