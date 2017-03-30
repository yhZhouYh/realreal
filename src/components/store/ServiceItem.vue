<template>
    <a href="javascript:;" class="z-servie-item zflex">
        <x-img :src="item.src" :default-src="defaultsrc" class="item-left" container=".z-container"></x-img>
        <div class="item-right zflex1">
            <p class="z-service-title">{{item.title}}</p>
            <p class="z-service-desc">{{item.desc}}</p>
            <p class="z-service-bottom zflex">
                <span class="service-price zflex1">{{item.price}}元/{{item.unit}} <span class="origin-price z-gray">100元</span></span>
                <span class="service-sale z-gray">已售{{item.sale}}</span>
            </p>
        </div>
    </a>
</template>
<script>
    import XImg from 'vux/src/components/x-img'
    export default{
        name: 'service-item',
        props: ['container', 'item'],
        data () {
            return {
                defaultsrc: require('../../assets/imgs/zhanwei.png')
            }
        },
        components: {
            XImg
        },
    }
</script>
<style lang="less">
    @import '../../assets/styles/fn.less';
    .z-servie-item{
        padding: 0.15rem 0;
        .item-left{
            width:1.84rem;
            height:1.84rem;
            padding-right:0.2rem;
        }
    }
    .z-service-desc{
        .ellipsis(4.8rem);
        color: #C7C7C7;
        padding-bottom: 0.7rem;
    }
    .service-price{
        color: #f9261d;
    }
    .origin-price{
        text-decoration:line-through;
    }
</style>