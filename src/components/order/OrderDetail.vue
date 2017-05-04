<template>
    <div class="z-page z-order-detail">
        <z-header :showBack="true"
                  backWords=""
                  title="订单详情">
        </z-header>
        <div class="z-container">
            <div class="z-box">
                <div class="zflex">
                    <span class="order-item-name">订单状态</span>
                    <span class="red">{{status[order.orderStatus]}}</span>
                </div>
                <div class="zflex">
                    <span class="order-item-name">订单编号</span>
                    <span>{{order.orderunique}}</span>
                </div>
                <div class="zflex">
                    <span class="order-item-name">下单时间</span>
                    <span>{{order.createTime}}</span>
                </div>
            </div>
            <div class="checkPay gray">服务清单</div>
            <div class="z-box order-item">
                <div class="order-title zflex">
                    <!--<icon icon="icon-dianpu"
                                                              class="gray"></icon>-->
                    <!--<span class="store-title zflex1">订单状态</span>-->
                    <!--<span class="red">{{status[order.orderStatus]}}</span>-->
                </div>
                <router-link :to="{name:'service', params:{id: goods.goodsId}}"
                             class="orderList-detail zflex"
                             v-for="goods in order.goods"
                             :key="goods.goodsId"
                             v-touch-ripple>
                    <div class="service-img"
                         :style="{backgroundImage: 'url('+goods.goodsImg+')'}"></div>
                    <span class="store-title zflex1">{{goods.goodsName}}</span>
                    <div class="service-price">
                        <p>{{goods.goodsPrice}}元</p>
                        <p class="gray">x{{goods.goodsNum}}</p>
                    </div>
                </router-link>
                <!--<div class="orderList-time gray zflex">
                    <span class="time zflex1">{{order.createTime}}</span>
                    <span>总价：<span class="red">{{order.goodsMoney}}</span>元</span>
                </div>-->
            </div>
            <div class="checkPay gray">买家信息</div>
            <div class="z-box">
                <div class="zflex">
                    <span class="order-item-name">用户名</span>
                    <span>{{order.userName}}</span>
                </div>
                <div class="zflex">
                    <span class="order-item-name">联系方式</span>
                    <span>{{order.userPhone}}</span>
                </div>
                <div class="zflex">
                    <span class="order-item-name">用户地址</span>
                    <span>{{order.userAddress}}</span>
                </div>
            </div>
        </div>
        <div class="service-bottom zflex vux-1px-t">
            <div class="cart-total zflex1">合计：<span class="red">￥{{order.goodsMoney | fixed(2)}}</span></div>
            <a href="javascript:;"
               class="buynow ripple"
               @click="pay"
               v-if="order.orderStatus == -2"
               >立即支付</a>
            <router-link :to="{name:'appraise', params:{id: order.orderId}}"
               class="buynow ripple"
               @click="pay"
               v-if="order.orderStatus == 2 && order.isAppraise == 0"
               >评价</router-link>   
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
export default {
    name: 'orderDetail',
    components: {
        ZHeader
    },
    data() {
        return {
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
            order: this.$store.state.currentOrder
        }
    },
    destroyed() {
        this.$store.dispatch('showFooter')
    },
    created() {
        this.$store.dispatch('showFooter')
    },
    pay(){

    }
}
</script>
<style>
    .buynow{
        width:2.5rem;
    }
    .order-item-name{
        width:1.5rem;
    }
</style>