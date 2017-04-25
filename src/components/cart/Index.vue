<template>
    <div class="z-page z-cart">
        <!--头部-->
        <z-header :showBack="true"
                  backWords=""
                  title="购物车">
        </z-header>
        <!--头部-->
        <div class="z-container">
            <blank v-if="!items.length"
                   :define="true">
                <div>扎心了，老铁！去附近逛逛！</div>
            </blank>
            <div class="cart-box"
                 v-else
                 v-for="item in items">
                <div class="cart-item vux-1px-b zflex">
                    <!--<z-check>
                            <span slot="middle" class="zflex">
                                <icon icon="icon-dianpu" :vertical="false" class="gray"></icon>
                                <span class="cart-title">{{item.shopName}}</span>
                            </span>
                            <span slot="right" class="cart-right vux-1px-l gray">删除</span>
                        </z-check>-->
                    <span slot="middle"
                          class="zflex zflex1">
                                <icon icon="icon-dianpu" :vertical="false" class="gray"></icon>
                                <span class="cart-title">{{item.shopName}}</span>
                    </span>
                    <span slot="right"
                          class="cart-right vux-1px-l gray">删除</span>
                </div>
                <div class="cart-item vux-1px-b">
                    <z-check :checked="item.isCheck">
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
                                              :currentNum="item.count"></z-number>
                                </div>
                            </div>
                        </div>
                    </z-check>
                </div>
            </div>
        </div>
        <div class="service-bottom zflex vux-1px-t">
            <div class="cart-total zflex1">合计：<span class="red">￥{{price | fixed(2)}}</span></div>
            <a href="javascript:;"
               class="buynow ripple"
               v-touch-ripple>结算</a>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ZCheck from './CheckBox'
import Icon from '../common/Icon'
import ZNumber from '../service/Number.vue'
import Blank from '@/components/common/Blank'
export default {
    name: 'cart',
    components: {
        ZHeader,
        ZCheck,
        Icon,
        ZNumber,
        Blank
    },
    //需要vuex里购物车数据
    data() {
        return {
            items: this.$store.state.cart.carts.items,
            price: 90
        }
    },
    methods: {
         add(item) {
            this.$store.dispatch('addToCart', item)
        },
        minus(item) {
            this.$store.dispatch('minusfromCart', item)
        },
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