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
        <div class="z-container"
             id="z-container">
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
            <!--友情提示结束-->
            <!--详情 简介 评价-->
            <sticky scroll-box="z-container">
                <tab :line-width="1"
                     active-color="#f9261d"
                     default-color="#969696"
                     bar-active-color="#f9261d">
                    <tab-item :selected="index == 0"
                              v-for="(item, index) in tabItems"
                              :key="item"
                              @on-item-click="checkTabItem(index)">{{item.name}}</tab-item>
                </tab>
    
            </sticky>
            <!--具体项目列表开始-->
            <store-items :items="items"
                         :serviceItems="serviceItems" v-show="currentView == 0"></store-items>
            <!--具体项目列表结束-->
            <!--商店详情-->
            <div class="z-box tore-items" v-show="currentView == 1">
                 服务时长：90分钟<br>服务姿势：卧姿<br><br>适用人群：<br>适用于工作压力大，缺乏锻炼，经常感到疲惫的上班族。<br><br>产品功效：<br>通过手法对人体肌表的按摩，调整人体病理状态，达到治病和保健的作用。通过经络按摩，配合使用美体芳香精油，促进血液循环、舒经活络、消除疲劳、帮助睡眠，还有紧实皮肤、恢复弹性、减肥美容的功效。<br><br>服务流程：<br>1.头部按摩；<br>2.肩颈排毒；<br>3.上肢经络疏通；<br>4.胸腹部调理；<br>5.下肢经络疏通；<br>6.背部排毒，腰部保养；<br>7.下肢经络疏通。<br><br>用品提供：<br>一次性塑封袋、口罩、鞋套、防油床单、轻薄床单
            </div>
            <!--商店详情-->
             <!--评论开始-->
             <comment v-show="currentView == 2"></comment>
             <!--评论结束-->
        </div>
        <!--详情 简介 评价-->
    </div>
    
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import TfCarousel from '@/components/common/carousel.vue'
import Sticky from 'vux/src/components/sticky'
//import CheckCard from './CheckCard'
import Tab from 'vux/src/components/tab/tab.vue'
import TabItem from 'vux/src/components/tab/tab-item.vue'
//import ServiceItem from './ServiceItem.vue'
import StoreItems from './StoreItems.vue'
import StoreDetail from './StoreDetail.vue'
//import PullToLoad from '../common/PullToload.vue' 
import pull from '../filters/pull'
import Comment from './Comment.vue'
export default {
    name: 'storeDetail',
    components: {
        ZHeader,
        TfCarousel,
        Sticky,
        //CheckCard,
        Tab,
        TabItem,
        StoreItems,
        StoreDetail,
        Comment
     //   PullToLoad
        //ServiceItem
    },
    directives: {
        pull
    },
    data() {
        return {
            imgs: [],
            tabItems: [
                { id: 1, name: '服务项目' },
                { id: 2, name: '商家简介' },
                { id: 3, name: '评价(134)' },
            ],
            items: [
                '全部',
                '干洗',
                '全自动洗衣',
                '修理电视机',
                '修理空调',
                '修理老公',
                '修理各种疑难杂症'
            ],
            serviceItems: [
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418 }
            ],
            currentView: 0 //默认展示服务项
        }
    },
    created() {
        this.imgs = [{ url: require('../../assets/imgs/img1.jpg') },
        { url: require('../../assets/imgs/img2.jpg') },
        { url: require('../../assets/imgs/img3.jpg') },
        { url: require('../../assets/imgs/img4.jpg') }]
    },
    methods: {
        checkTabItem(index) {
            //debugger
            this.currentView = index
        }
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

.store-items {
    margin-top: 0;
}
.service-detail{
    background: #fff;
    padding: 0.2rem;
}
</style>