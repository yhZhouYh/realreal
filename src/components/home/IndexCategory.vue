<template>
    <div class="z-index-category">
        <router-link :to="{name:'serviceList',params:{id:cates.catId}}"
                     class="zflex z-category-header">
            <div class="zflex1">{{cates.catName}}</div>
            <div class="">更多 <span class="z-arrow-right"></span></div>
        </router-link>
        <!--<scrollbar>-->
        <div class="category-scroll zflex"
             ref="scroll">
            <router-link :to="{name:'service', params:{id: item.goodsId}}" :key="item.goodsId"
                         class="category-items"
                         ref="item"
                         v-for=" item in cates.items">
                <img :src="item.goodsImg"
                     alt="">
                <!--<x-img :src="img"
                                    container=".z-index-category"></x-img>-->
                <p class="items-title">{{item.goodsName}}</p>
                <p class="items-price">{{item.shopPrice}}元/{{item.goodsUnit}}</p>
                <p class="items-store zflex">
                    <svg class="zicon zheader-icon zflex"
                         aria-hidden="true">
                        <use xlink:href="#icon-dianpu"></use>
                    </svg>
                    <span class="store-name zflex1 items-title">{{item.shopName}}</span>
                </p>
            </router-link>
        </div>
        <!--</scrollbar>-->
    </div>
</template>
<script>
// import Scrollbar from 'smooth-scrollbar'
//import XImg from 'vux/src/components/x-img'
// import Transform from '../../assets/lib/transform'
// import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    name: 'index-category',
    props: {
        cates: {
            type: Object
        }
    },
    components: {
        //  XImg
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         const { scroll, item } = this.$refs
    //         Transform(scroll, true)
    //         let scrollWidth = scroll.getBoundingClientRect().width
    //         let itemWidths = -item[0].getBoundingClientRect().width * 5 + scrollWidth + 16
    //         let at = new AlloyTouch({
    //             touch: scroll,
    //             vertical: false,
    //             property: 'translateX',
    //             sensitivity: 1,
    //             min: itemWidths, // 16是最后一个没有padding    
    //             max: 0,
    //             bindSelf: true,
    //             touchStart(evt, value) {
    //                 console.log(value)
    //                 evt.stopPropagation();
    //             },
    //             touchMove: function (evt, value) {
    //                 // console.log(value)
    //                 // evt.stopPropagation();
    //                 // scroll.style.cssText = 'transformtranslate('+ value+'px)'
    //                 this.to(value)
    //                 if(value <= itemWidths){
    //                     return false
    //                 }
    //             }
    //         })
    //     })
    // }

}
</script>
<style lang="less">
@import '../../assets/styles/fn.less';
//@import '~smooth-scrollbar/dist/smooth-scrollbar.css';
.scrollbar-track-x {
    display: none !important;
}

.z-index-category {
    //overflow: hidden;
    .category-items {
        //width: 2.3rem;
        // padding-right: 16px;
        // overflow: hidden;
        width: 2.3rem;
        padding-right: 0.1rem;
        &:last-child {
            padding-right: 0
        }
        img {
            border-radius: 6px; // width: 2.2rem;
            width: 2.2rem;
            height: 2.3rem;
        }
    }
    .items-title {
        .ellipsis()
    }
    .items-price {
        color: #ee5e56;
    }
    .items-store {
        color: #b8b8b8;
        .store-name {
            padding-left: 0.05rem;
        }
    }
}

.z-category-header {
    border-left: 0.1rem solid #2a96f9;
    margin-bottom: 0.25rem;
    .setTapColor();
    padding-left: 0.15rem;
    &:active {
        background-color: #ECECEC;
    }
}

.z-arrow-right {
    .setArrow(right, 6px, #C8C8CD, 2px);
    top: 0;
}
</style>