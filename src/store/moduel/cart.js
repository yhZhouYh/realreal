import * as types from '../mutation-types'

let cartItem = {
    storeId: 0,
    storeName: 0,
    services: []
}

const state = {
    carts: JSON.parse(localStorage.getItem('carts')) || {},
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
    }

}

const mutations = {
    [types.ADD_TO_CART](state, item) {
        const record = state.carts.items.find(p => p.goodsId === item.goodsId) //找到符合条件的第一个项目
        if (!record) {
            item.count = 1
            state.carts.quntity++
            state.carts.items.push(item)
        } else {
            state.carts.quntity++
            record.count++
        }
        localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    //    [types.ADD_TO_CART](state, item) {
    //     const record = state.carts.find(p => p.storeId === item.storeId) //找到符合条件的第一个项目
    //     if (!record) {
    //         item.count = 1
    //         let current = {...cartItem, ...item}
    //         current.services.push(item)
    //         state.quntity++
    //         state.carts.push(current)
    //     } else {
    //         const detail = record.services.find(i => i.id === item.id) //找到services中符合条件的部分
    //         if(!detail){
    //             item.count = 1
    //             record.count++
    //             state.quntity++
    //             record.services.push(item)
    //         }else{
    //             state.quntity++
    //             detail.count++
    //             record.count++
    //         }

    //     }
    // },
    [types.CHECKOUT_REQUEST](state) {
        // 清空购物车
        state.items = []
    },
    // [types.DELETE_FROM_NUMBER](state, item) {
    //     const record=  state.carts.findIndex(p => p.storeId === item.storeId)
    //     if(!record && record !=0){
    //         return
    //     }else{
    //         const ele = state.carts[record].services
    //         const detail = ele.findIndex(i => i.id === item.id)
    //         if(!detail && detail !=0){
    //             return
    //         }else{
    //             ele[detail].count--
    //             //detail.count--
    //             state.quntity--
    //             state.carts[record].count--
    //             if(ele[detail].count == 0){
    //                 ele.splice(detail, 1)
    //             }
    //             if(state.carts[record].count == 0) {
    //                 state.carts.splice(record, 1)
    //             }
    //         }
    //     }
    // }
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
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}