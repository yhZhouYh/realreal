<template>
    <div class="z-page z-orderList">
        <z-header :showBack="true"
                  backWords=""
                  title="订单">
        </z-header>
        <div class="z-container"
             ref="scroller">
            <div class="menu-box">
                <z-menu :items="items"
                        name="name"
                        @checkedItem="checkedItem"></z-menu>
            </div>
            <blank v-if="!orderList.length"
                   :define="true">
                <div>暂无相关订单~</div>
            </blank>
            <div class="z-box order-item"
                 v-for="(item, index) in orderList">
                <div class="order-title zflex">
                    <!--<icon icon="icon-dianpu"
                                                                                                  class="gray"></icon>-->
                    <span class="store-title zflex1">订单状态</span>
                    <span class="red">{{status[item.orderStatus]}}</span>
                </div>
                <router-link :to="{name:'service', params:{id: goods.goodsId}}"
                             class="orderList-detail zflex"
                             v-for="goods in item.goods"
                             :key="goods.goodsId">
                    <div class="service-img"
                         :style="{backgroundImage: 'url('+goods.goodsImg+')'}"></div>
                    <span class="store-title zflex1">{{goods.goodsName}}</span>
                    <div class="service-price">
                        <p>{{goods.goodsPrice}}元</p>
                        <p class="gray">x{{goods.goodsNum}}</p>
                    </div>
                </router-link>
                <div class="orderList-time gray zflex vux-1px-b">
                    <span class="time zflex1">{{item.createTime}}</span>
                    <span>总价：<span class="red">{{item.goodsMoney}}</span>元</span>
                </div>
                <div class="orderList-btns">
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button"
                              @click.native="godetail(item)">查看详情</x-button>
                    <x-button :mini="true"
                              v-if="item.orderStatus == -2"
                              :plain="true"
                              class="z-check-button"
                              @click.native="cancel(item, index)">取消订单</x-button>
                    <x-button :mini="true"
                              v-if="item.orderStatus == 1"
                              :plain="true"
                              class="z-check-button"
                              @click.native="ensureOrder(item, index)">确认订单</x-button>
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button active"
                              v-if="item.orderStatus == -2"
                              @click.native="pay(item)">立即支付</x-button>
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button active"
                              v-if="item.orderStatus == 2 && item.isAppraise == 0"
                              @click.native="valueIt(item)">评价</x-button>
    
                </div>
            </div>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
            <confirm v-model="show"
                     title="你确定要取消该订单么"
                     @on-confirm="onConfirm">
                <!--<p style="text-align:center;">你确定要删除么</p>-->
            </confirm>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Menu from '../common/Menu.vue'
import Icon from '../common/Icon'
import { XButton, Confirm } from 'vux'
import { orderIndex, cancelOrder, changeOrderStatus } from '../../api'
export default {
    name: 'orderList',
    components: {
        ZHeader,
        ZMenu: Menu,
        Icon,
        XButton,
        Confirm
    },
    data() {
        return {
            items: [{ name: '全部', type: 'all' }, { name: '待付款', type: 'waitPay' }, { name: '待确认', type: 'payed' }, { name: '待接收', type: 'waitReceive' }, { name: '已完成', type: 'finish' }, { name: '待评价', type: 'waitAppraise' }, { name: '已取消', type: 'cancel' }],
            middle: {},
            middleObj: {
                page: 1,
                items: [],
                isOver: false
            },
            scroller: null,
            limit: 10,
            currentType: this.$route.query.type ? this.$route.query.type : 'all',
            orderList: [],
            loading: false,
            status: {
                '-5': '拒收',
                '-4': '拒收',
                '-3': '拒收',
                '-2': '待付款',
                '-1': '取消',
                '0': '待接收',
                '1': '待接收',
                '2': '已完成'
            },
            show: false,
            cancelItem: {},
            cancelIndex: ''
        }
    },

    mounted() {
        this.scroller = this.$refs.scroller
    },
    created() {
        orderIndex({ userid: this.$store.state.user.userId, type: this.currentType, page: 1, limit: this.limit }).then(res => {
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                middleObj.items = res
                this.middle[this.isChecked] = middleObj
            }
            this.orderList = this.middle[this.isChecked].items
        })
    },
    methods: {
        loadMore() {
            let middle = this.middle[this.isChecked]
            if (!middle.isOver && !this.loading) {
                this.loading = true
                middle.page += 1
                orderIndex({ userid: this.$store.state.user.userId, page: middle.page, limit: this.limit, type: this.currentType }).then(res => {
                    this.loading = false
                    middle.items = middle.items.concat(res)
                    this.orderList = middle.items
                    if (res.length == 0) {
                        middle.isOver = true
                    }
                })
            }
        },
        checkedItem(item, index) { //缓存处理
            this.isChecked = index
            this.currentType = item.type
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                orderIndex({ userid: this.$store.state.user.userId, type: this.currentType, page: 1, limit: this.limit }).then(res => {
                    middleObj.items = res
                    this.middle[this.isChecked] = middleObj
                    this.orderList = this.middle[this.isChecked].items

                })
            } else {
                this.orderList = this.middle[index].items
            }
        },
        godetail(item) {
            this.$store.dispatch('saveOrder', item)
            this.$router.push('orderDetail')
        },
        valueIt(item) {
            this.$store.dispatch('saveOrder', item)
            this.$router.push({ name: 'appraise', params: { id: item.orderId } })
        },
        onConfirm() {
            cancelOrder({ userid: this.$store.state.user.userId, orderId: this.cancelItem.orderId }).then(res => {
                this.orderList.splice(this.cancelIndex, 1)
                //如果已经点过菜单 已取消就添加一条
                if (this.middle['cancel']) {
                    this.middle['cancel'].items.unshift(this.cancelItem)
                }
            })
        },
        ensureOrder(item, index) {
            changeOrderStatus({ userid: this.$store.state.user.userId, orderunique: item.orderunique, type: 2 }).then(res => {
                this.orderList.splice(index, 1)
            })
            if (this.middle['cancel']) {
                this.middle['cancel'].items.unshift(item)
            }
        },
        cancel(item, index) {
            this.show = !this.show
            this.cancelItem = item
            this.cancelIndex = index
        },
        pay(orderInfos) {
            if (window.api) {
                console.error(JSON.stringify(orderInfos))
                const aliPay = api.require('aliPay')
                aliPay.pay({
                    subject: '正证订单',
                    body: '正证订单支付',
                    amount: orderInfos.totalMoney,
                    tradeNO: orderInfos.orderunique + Date.parse(new Date()),
                    out_trade_no: orderInfos.orderunique
                }, (ret, error) => {
                    console.error(ret.code)
                    if (ret.code == '9000') {
                        changeOrderStatus({ userid: this.$store.state.user.userId, orderunique: orderInfos.orderunique, type: 1 })
                        this.$router.replace({ name: 'paystatus', params: { id: 1 } })
                    } else {
                        this.$router.replace({ name: 'paystatus', params: { id: ret.code } })
                    }
                })
                // aliPay.payOrder({
                //     orderInfo: order
                // }, (ret, error) => {
                //     alert(ret.code)
                //     if (ret.code == '9000') {
                //         this.$router.replace({ name: 'paystatus', params: { id: 1 } })
                //     } else {
                //         this.$router.replace({ name: 'paystatus', params: { id: ret.code } })
                //     }
                // })
            }
        }
    }

}
</script>
<style lang="less">
.menu-box {
    background: #fff;
    overflow: hidden;
}

.store-title {
    padding-left: 0.2rem;
}

.orderList-detail {
    margin: 0.2rem 0;
    background: #f8f8f8;
    padding: 0.2rem;
}

.orderList-time {
    padding-bottom: 0.2rem;
    .time {
        font-size: 0.21rem;
    }
}

.orderList-btns {
    padding-top: 0.2rem;
    text-align: right;
    .weui-btn_default {
        background-color: #fff!important;
        color: #000!important
    }
    .z-check-button {
        margin-right: 0.1rem;
        border-radius: 0;
        border-color: #f8f8f8;

        &.active {
            color: #f9261d!important;
            border-color: #f9261d;
            &:active {
                color: #f9261d!important;
                border-color: #f9261d!important;
                background-color: transparent!important;
            }
        }
    }
}
</style>