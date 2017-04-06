import * as types from '../mutation-types'

let cartItem = {
    storeId: 0,
    storeName: 0,
    services: []
}

const state = {
    items: [],
    quntity: 0,
    carts:[]
}

const getters = {
    cartAllCounts: state => state.quntity, //购物车总数量
    cartItem: state => {
        
    }
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
    }
}

const mutations = {
    // [types.ADD_TO_CART](state, item) {
    //     const record = state.items.find(p => p.id === item.id) //找到符合条件的第一个项目
    //     if (!record) {
    //         item.count = 1
    //         state.quntity++
    //         state.items.push(item)
    //     } else {
    //         state.quntity++
    //         record.count++
    //     }
    // },
       [types.ADD_TO_CART](state, item) {
        const record = state.carts.find(p => p.storeId === item.storeId) //找到符合条件的第一个项目
        if (!record) {
            item.count = 1
            let current = {...cartItem, ...item}
            current.services.push(item)
            state.quntity++
            state.carts.push(current)
        } else {
            const detail = record.services.find(i => i.id === item.id) //找到services中符合条件的部分
            if(!detail){
                item.count = 1
                record.count++
                state.quntity++
                record.services.push(item)
            }else{
                state.quntity++
                detail.count++
                record.count++
            }
            
        }
    },
    [types.CHECKOUT_REQUEST](state) {
        // 清空购物车
        state.items = []
    },
    [types.DELETE_FROM_NUMBER](state, item) {
        const record=  state.carts.findIndex(p => p.storeId === item.storeId)
        if(!record && record !=0){
            return
        }else{
            const ele = state.carts[record].services
            const detail = ele.findIndex(i => i.id === item.id)
            if(!detail && detail !=0){
                return
            }else{
                ele[detail].count--
                //detail.count--
                state.quntity--
                state.carts[record].count--
                if(ele[detail].count == 0){
                    ele.splice(detail, 1)
                }
                if(state.carts[record].count == 0) {
                    state.carts.splice(record, 1)
                }
            }
        }
    }
    // [types.DELETE_FROM_NUMBER](state, item) {
    //     const index = state.carts.findIndex(p => p.storeId === item.storeId) //找到符合条件的第一个项目的索引
    //     if (!index && index != 0) {
    //         return
    //     } else {
    //         // debugger
    //         const detail = record.services.find(i => i.id === item.id) //找到services中符合条件的部分
    //         if(!detail){
    //             return
    //         }else{
    //             state.quntity--
    //             index.count--
    //             detail.count--
    //             if(detail.count == 0) {
    //                 state.items.splice(index, 1)
    //             }
    //             if()
    //         }
    //     }
    // },
    // [type.GET_CART_ITEM](state, {id}){
    //     return state.items.findIndex(p => p.id === item.id)
    // }

}

export default {
    state,
    getters,
    actions,
    mutations
}