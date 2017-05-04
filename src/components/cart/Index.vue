<template>
    <div class="z-page z-cart">
        <!--头部-->
        <z-header :showBack="true"
                  backWords=""
                  title="购物车">
        </z-header>
        <!--头部-->
        <div class="z-container"
             ref="scroller">
            <blank v-if="!items.length"
                   :define="true">
                <div>扎心了，老铁！去附近逛逛！</div>
            </blank>
            <div class="cart-box"
                 v-else
                 v-for="(item,index) in items">
                <div class="cart-item vux-1px-b zflex">
                    <span slot="middle"
                          class="zflex zflex1">
                            <icon icon="icon-dianpu" :vertical="false" class="gray"></icon>
                            <span class="cart-title">{{item.shopName}}</span>
                    </span>
                    <span slot="right"
                          class="cart-right vux-1px-l gray"
                          @click="deleteItem(item,index)">删除</span>
                </div>
                <div class="cart-item vux-1px-b">
                    <z-check :checked="item.isCheck == 1 ? true : false"
                             :id="item.goodsId"
                             :value="item"
                             :model="checkedItems"
                             @change="change(item, index)">
                        <div slot="middle"
                             class="zflex">
                            <div class="service-img"
                                 :style="{backgroundImage: 'url('+item.goodsImg+')'}"></div>
                            <div class="service-name zflex1">
                                <div class="service-title">{{item.goodsName}}</div>
                                <div class="zflex">
                                    <span class="zflex1 red">￥{{item.shopPrice}}</span>
                                    <z-number :item="item"
                                              @add="add"
                                              @minus="minus"
                                              :currentNum="parseInt(item.cartNum)"></z-number>
                                </div>
                            </div>
                        </div>
                    </z-check>
                </div>
            </div>
            <scroller :scroller="scroller"
                  :loading="loading"
                  @load="loadMore"
                  loading-text="加载中" />
        </div>
        <div class="service-bottom zflex vux-1px-t"
             v-if="items.length">
            <div class="cart-total zflex1">合计：<span class="red">￥{{totalPrice | fixed(2)}}</span></div>
            <a href="javascript:;"
               class="buynow ripple"
               @click="downOrder">下单</a>
        </div>
        <confirm v-model="show"
                 title="你确定要删除么"
                 @on-confirm="onConfirm">
            <!--<p style="text-align:center;">你确定要删除么</p>-->
        </confirm>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ZCheck from './CheckBox'
import Icon from '../common/Icon'
import ZNumber from '../service/Number.vue'
import Blank from '@/components/common/Blank'
import { Confirm } from 'vux'
import { cartList, cartAdd, deletecartById, orderDown } from '../../api'
import { mapGetters } from 'vuex'
export default {
    name: 'cart',
    components: {
        ZHeader,
        ZCheck,
        Icon,
        ZNumber,
        Blank,
        Confirm
    },
    //需要vuex里购物车数据
    data() {
        return {
            items: [],
            price: 90,
            show: false,
            deleteIndex: 0,
            currentItem: null,
            page: 1,
            limit: 20,
            checkedItems: [],
            scroller: null,
            loading: false,
            isover: false,
            totalPrice: 0,
        }
    },
    destroyed() {
        this.$store.dispatch('showFooter')
    },
    created() {
        this.$store.dispatch('showFooter')
        cartList({ userid: this.$store.state.user.userId, page: this.page, limit: this.limit }).then(res => {
            this.items = res
            this.$store.dispatch('checkout', res)
            let price = 0
            this.items.map((item, index) => {
                if (item.isCheck == 1) {
                    price += item.shopPrice * item.cartNum
                }

            })
            this.totalPrice = price
        })
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    methods: {
        add(item, num) {
            cartAdd({ userid: this.$store.state.user.userId, goodsId: item.goodsId, buyNum: num, shopsId: item.shopId, isCheck: item.isCheck }).then(res => {
                item.cartNum = num
                this.totalPrice += parseFloat(item.shopPrice)
            })
        },
        minus(item, num) {
            cartAdd({ userid: this.$store.state.user.userId, goodsId: item.goodsId, buyNum: num, shopsId: item.shopId, isCheck: item.isCheck }).then(res => {
                item.cartNum = num
                this.totalPrice -= parseFloat(item.shopPrice)
            })
        },
        change(item, index) {
            item.isCheck = item.isCheck == 1 ? 0 : 1
            cartAdd({ userid: this.$store.state.user.userId, goodsId: item.goodsId, buyNum: item.cartNum, shopsId: item.shopId, isCheck: item.isCheck }).then(res => {
                if (item.isCheck == 1) {
                    this.totalPrice += item.shopPrice * item.cartNum
                } else {
                    this.totalPrice -= item.shopPrice * item.cartNum
                }
            })
        },
        onConfirm() {
            // this.$store.dispatch('deleteIndex', { item: this.currentItem, index: this.deleteIndex })
            // this.items = this.$store.state.cart.carts.items
            deletecartById({ userid: this.$store.state.user.userId, id: this.currentItem.cartId }).then(res => {
                this.items.splice(this.deleteIndex, 1)
                this.totalPrice -= this.currentItem.Price * this.currentItem.cartNum
            })
        },
        deleteItem(item, index) {
            this.show = !this.show
            this.deleteIndex = index
            this.currentItem = item
        },
        downOrder() {
            // orderDown()
            this.$router.push('/ensureOrder')
        },
        loadMore() {
            this.loading = true
            if (!this.isover) {
                cartList({ userid: this.$store.state.user.userId, page: ++this.page, limit: this.limit }).then(res => {
                    this.loading = false
                    this.items.concat(res)
                    if (!res.length) {
                        this.isover
                    }
                })
            }
        }
    }
}
</script>
<style>
.cart-box {
    margin-top: 0.2rem;
}

.cart-item {
    padding: 0.13rem 0.3rem;
    background: #fff;
}

.cart-title {
    padding-left: 0.2rem;
}

.cart-right {
    padding: 0.1rem 0 0.1rem 0.2rem;
}

.service-img {
    width: 1.25rem;
    height: 1.25rem;
    background-size: cover;
    background-position: center center;
}

.service-name {
    padding-left: 0.2rem;
}

.service-title {
    padding-bottom: 0.3rem;
}

.z-cart .buynow {
    width: 2.5rem;
}

.service-bottom .cart-total {
    text-align: left;
    padding-left: 0.3rem;
}
</style>