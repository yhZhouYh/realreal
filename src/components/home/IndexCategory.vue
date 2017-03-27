<template>
    <div class="z-index-category">
        <a href="javascript:;"
           class="zflex z-category-header">
            <div class="zflex1">家电服务</div>
            <div class="">更多 <span class="z-arrow-right"></span></div>
        </a>
        <div class="category-scroll zflex">
            <a href="javascript:;"
               class="category-items">
                <!--<img src="../../assets/imgs/img1.jpg" alt="">-->
                <x-img :src="img"
                       container=".z-index-category"></x-img>
                <p class="items-title">专业师傅维修电视</p>
                <p class="items-price">30元/次</p>
                <p class="items-store zflex">
                    <svg class="zicon zheader-icon zflex"
                         aria-hidden="true">
                        <use xlink:href="#real-icon-dianpu"></use>
                    </svg>
                    <span class="store-name zflex1">迅捷维修</span>
                </p>
            </a>
        </div>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
import XImg from 'vux/src/components/x-img'
export default {
    name: 'index-category',
    data() {
        return {
            img: require('../../assets/imgs/img1.jpg')
        }
    },
    components: {
        XImg
    }

}
</script>
<style lang="less">
@import '../../assets/styles/fn.less';
.z-index-category {
    .category-items {
        img {
            border-radius: 6px;
            width: 2.3rem;
            height: 2.3rem;
        }
    }
    .items-title {
        .ellipsis(2.3rem)
    }
    .items-price {
        color: #ee5e56;
    }
    .items-store{
        color: #b8b8b8;
        .store-name{
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