<template>
    <div class="service-bottom zflex vux-1px-t">
        <router-link :to="{name:'storeDetail', params:{id: item.shopId}}"
           class="itembox zflex vux-1px-r zflex-center">
            <icon icon="icon-dianpu"></icon>
            <div>店铺</div>
        </router-link>
        <a :href="'tel:'+item.telephone"
           class="itembox zflex vux-1px-r zflex-center">
            <icon icon="icon-call-business"></icon>
            <div>联系商家</div>
        </a>
        <!--<a href="javascript:;"
                   class="itembox zflex vux-1px-r zflex-center">
                    <icon icon="icon-gouwuche"></icon>
                    <div>购物车</div>
                    <div class="badge-box" v-show="cartAllCounts">
                        <badge :text="cartAllCounts"></badge>
                    </div>
                </a>-->
        <a href="javascript:;"
           class="buynow zflex1 addtocart"
           @click="addtocart">
                        加入购物车
                </a>
        <a href="javascript:;"
           class="buynow zflex1"
           @click="buynow">
                        立即购买
                </a>
    </div>
</template>
<script>
import Icon from '../common/Icon'
import Badge from 'vux/src/components/Badge'
import { mapGetters } from 'vuex'
export default {
    name: 'serviceBottom',
    // props: ['count'],
    props: ['item'],
    components: {
        Icon,
        Badge
    },
    data() {
        return {
            //cartnum: 0
        }
    },
    methods: {
        buynow() {
            this.$emit('buynow')
        },
        addtocart() {
            this.$emit('addtocart')
        }
    },
    computed: {
        ...mapGetters([
            'cartAllCounts',
        ])
    }
}
</script>
<style lang="less">
.service-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1rem;
    text-align: center;
    background: #fff;
    .itembox {
        width: 1.5rem;
        font-size: 0.23rem;
        flex-direction: column;
        height: 100%;
        color: rgb(150, 150, 150);
        position: relative;
    }
    .buynow {
        background: #f9261d;
        color: #fff;
        height: 100%;
        line-height: 1rem;
        font-size: 0.3rem;
        &.addtocart {
            background: #FF6C02;
        }
    }
    &.vux-1px-t {
        position: absolute;
    }
}

.weui-cells {
    font-size: 0.28rem!important
}

.badge-box {
    position: absolute;
    top: -0.1rem;
    right: -0.2rem;
}
</style>