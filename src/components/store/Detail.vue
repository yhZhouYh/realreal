<template>
    <div class="z-page">
        <!--头部开始-->
        <z-header :showBack="true"
                  backWords="">
            <span slot="rightitems">
                            <svg class="zicon zheader-icon zflex store-header-more" aria-hidden="true">
                                <use xlink:href="#real-icon-more"></use>
                            </svg>
                        </span>
        </z-header>
        <!--头部结束-->
        <!--轮播开始-->
        <div class="z-container">
            <div class="z-store-carousel">
                <tf-carousel :imgs="imgs"
                             :delay="4000"
                             :autoPlay="false">
                </tf-carousel>
            </div>
            <!--轮播结束-->
            <!--友情提示开始-->
            <div class="z-box">
                <div class="z-storedetail-remind zflex">
                    <span>友情提示: </span>
                    <span class="remind-items zflex1">
                            <p> 1.维修需要时间，请耐心等待。</p>
                            <p> 2.自行送件到维修店，可免上门服务费哟。</p>
                        </span>
    
                </div>
            </div>
            <div class="z-box">
                <div>
                    <sticky scroll-box="vux_view_box_body"
                            :offset="46">
                        <tab :line-width="1" active-color="#f9261d" default-color="#969696" bar-active-color="#f9261d">
                            <tab-item selected>服务项目</tab-item>
                            <tab-item>商家简介</tab-item>
                            <tab-item>评价(135)</tab-item>
                        </tab>
                        <check-card :items="items"></check-card>
                    </sticky>
                </div>
            </div>
        </div>
        <!--友情提示结束-->
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import TfCarousel from '@/components/common/carousel.vue'
import Sticky from 'vux/src/components/sticky'
import CheckCard from './CheckCard'
import Tab from 'vux/src/components/tab/tab.vue'
import TabItem from 'vux/src/components/tab/tab-item.vue'
export default {
    name: 'storeDetail',
    components: {
        ZHeader,
        TfCarousel,
        Sticky,
        CheckCard,
        Tab,
        TabItem
    },
    data() {
        return {
            imgs: [],
            items: [
                '全部',
                '干洗',
                '全自动洗衣',
                '修理电视机',
                '修理空调',
                '修理老公',
                '修理各种疑难杂症'
            ]
        }
    },
    created() {
        this.imgs = [{ url: require('../../assets/imgs/img1.jpg') },
        { url: require('../../assets/imgs/img2.jpg') },
        { url: require('../../assets/imgs/img3.jpg') },
        { url: require('../../assets/imgs/img4.jpg') }]
    }
}
</script>
<style lang="less">
.store-header-more {
    color: #b8b8b8;
}

.z-store-carousel {
    height: 4.5rem;
}

.z-storedetail-remind {
    font-size: 0.23rem;
    .remind-items {
        padding-left: 0.1rem;
    }
}

.z-storedetail-remind.zflex {
    align-items: flex-start
}
</style>