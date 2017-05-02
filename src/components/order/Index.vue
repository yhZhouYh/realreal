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
                    <div>没有相关服务啦！</div>
                </blank>
            <div class="z-box order-item"
                 v-for="item in orderList">
                <div class="order-title zflex">
                    <!--<icon icon="icon-dianpu"
                                              class="gray"></icon>-->
                    <span class="store-title zflex1">订单状态</span>
                    <span class="red">{{status[item.orderStatus]}}</span>
                </div>
                <div class="orderList-detail zflex"
                     v-for="goods in item.goods"
                     v-touch-ripple>
                    <div class="service-img"
                         :style="{backgroundImage: 'url('+goods.goodsImg+')'}"></div>
                    <span class="store-title zflex1">{{goods.name}}</span>
                    <div class="service-price">
                        <p>{{goods.goodsPrice}}元</p>
                        <p class="gray">x{{goods.goodsNum}}</p>
                    </div>
                </div>
                <div class="orderList-time gray zflex vux-1px-b">
                    <span class="time zflex1">{{item.createTime}}</span>
                    <span>总价：<span class="red">{{item.goodsMoney}}</span>元</span>
                </div>
                <div class="orderList-btns">
                    <x-button :mini="true"
                              v-if="item.orderStatus == -2"
                              :plain="true"
                              class="z-check-button"
                              v-touch-ripple>取消订单</x-button>
                    <x-button :mini="true"
                              :plain="true"
                              class="z-check-button active"
                              v-touch-ripple>立即支付</x-button>
                </div>
            </div>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Menu from '../common/Menu.vue'
import Icon from '../common/Icon'
import XButton from 'vux/src/components/x-button'
import { orderIndex } from '../../api'
export default {
    name: 'orderList',
    components: {
        ZHeader,
        ZMenu: Menu,
        Icon,
        XButton
    },
    data() {
        return {
            items: [{ name: '全部', type: 'all' }, { name: '待付款', type: 'waitPay' }, { name: '待取件', type: 'waitReceive' }, { name: '待评价', type: 'waitAppraise' }, { name: '已完成', type: 'finish' }, { name: '已取消', type: 'cancel' }, { name: '退款', type: 'abnormal' }],
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
            }
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
            if (!middle.isOver) {
                this.loading = true
                middle.page　+= 1
                orderIndex({ userid: this.$store.state.user.userId, page: middle.page, limit: this.limit, type: this.currentType }).then(res => {
                    this.loading = false
                    middle.items.concat(res)
                    this.serviceItems = middle.items
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