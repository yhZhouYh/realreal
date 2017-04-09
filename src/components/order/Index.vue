<template>
    <div class="z-page z-orderList">
        <z-header :showBack="true"
                  backWords=""
                  title="订单">
        </z-header>
        <div class="z-container">
            <div class="menu-box">
                <z-menu></z-menu>
            </div>
            <div class="z-box order-item">
                <div class="order-title zflex">
                    <icon icon="real-icon-dianpu"
                          class="gray"></icon>
                    <span class="store-title zflex1">e安装</span>
                    <span class="red">等待付款</span>
                </div>
                <div class="orderList-detail zflex" v-touch-ripple>
                    <div class="service-img"
                         :style="{backgroundImage: 'url('+require('../../assets/imgs/test.png')+')'}"></div>
                    <span class="store-title zflex1">电热水器上门维修</span>
                    <div class="service-price">
                        <p>216.00元</p>
                        <p class="gray">x1</p>
                    </div>
                </div>
                <div class="orderList-time gray zflex vux-1px-b">
                    <span class="time zflex1">2017-03-14 14：36</span>
                    <span>总价：<span class="red">216</span>元</span>
                </div>
                <div class="orderList-btns">
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button" v-touch-ripple>取消订单</x-button>
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button active" v-touch-ripple>立即支付</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Menu from '../common/Menu.vue'
import Icon from '../common/Icon'
import XButton from 'vux/src/components/x-button'
export default {
    name: 'orderList',
    components: {
        ZHeader,
        ZMenu: Menu,
        Icon,
        XButton
    },

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
    .z-check-button {
        margin-right: 0.1rem;
        border-radius: 0;
        border-color: #f8f8f8;
        &.active {
            color: #f9261d;
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