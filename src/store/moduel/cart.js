import * as types from '../mutation-types'

const state = {
    items: [],
    quntity: 0
}

const getters = {
    cartAllCounts: state => state.quntity //购物车总数量
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
    minusfromCart({ commit, state}, item) {
        commit(types.DELETE_FROM_NUMBER, item)
    }
}

const mutations = {
    [types.ADD_TO_CART](state, item) {
        const record = state.items.find(p => p.id === item.id) //找到符合条件的第一个项目
        if (!record) {
            item.count = 1
            state.quntity++
            state.items.push(item)
        } else {
            state.quntity++
            record.count++
        }
    },
    [types.CHECKOUT_REQUEST](state) {
        // 清空购物车
        state.items = []
    },
    [types.DELETE_FROM_NUMBER](state, item) {
        const index = state.items.findIndex(p => p.id === item.id) //找到符合条件的第一个项目的索引
        if(!index){
            alert('不存在该项目')
        }else{
            if(item.count == 0) {
                item.splice(index, 1)
            }else{
                state.quntity--
                item.count--
            }
        }
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}