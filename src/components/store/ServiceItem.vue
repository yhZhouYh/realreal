<template>
    <a href="javascript:;"
       class="z-servie-item zflex">
        <x-img :src="item.goodsImg"
               :default-src="defaultsrc"
               class="item-left"
               container=".z-container"></x-img>
        <div class="item-right zflex1">
            <p class="z-service-title">{{item.goodsName}}</p>
            <p class="z-service-desc">{{item.goodsDesc}}</p>
            <p class="z-service-price"><span class="service-price">{{item.shopPrice}}元/{{item.goodsUnit}} <span class="origin-price z-gray" v-if="item.shopPrice!=item.marketPrice">{{item.marketPrice}}元</span></span>
            </p>
            <p class="z-service-bottom zflex vux-1px-t">
                <icon icon="real-icon-dianpu" class="gray"></icon>
                <span class="store-name zflex1 gray">{{item.StoreName}}</span>
                <span class="service-sale z-gray">已售{{item.saleNum}} 好评98%</span>
            </p>
        </div>
    </a>
</template>
<script>
import XImg from 'vux/src/components/x-img'
import Icon from '../common/Icon'
export default {
    name: 'service-item',
    props: ['container', 'item'],
    data() {
        return {
            defaultsrc: require('../../assets/imgs/zhanwei.png')
        }
    },
    components: {
        XImg,
        Icon
    },
}
</script>
<style lang="less">
@import '../../assets/styles/fn.less';
.z-servie-item {
    padding: 0.15rem 0;
    .item-left {
        width: 1.84rem;
        height: 1.84rem;
        padding-right: 0.2rem;
    }
}

.z-service-desc {
    .ellipsis(4.8rem);
    color: #C7C7C7;
    padding-bottom: 0.1rem;
}

.service-price {
    color: #f9261d;
}

.z-service-price {
    padding-bottom: 0.1rem;
}

.z-service-bottom {
    padding-top: 0.1rem;
    font-size:0.22rem;
    .zheader-icon{
        font-size:0.38rem;
    }
}
.store-name{
    padding-left: 0.1rem;
}

.origin-price {
    text-decoration: line-through;
}
</style>