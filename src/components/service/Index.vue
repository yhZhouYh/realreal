<template>
    <div class="z-page z-service">
        <!--头部-->
        <z-header :showBack="true"
                  backWords="">
        </z-header>
        <!--头部-->
        <div class="z-container">
            <!--轮播-->
            <div class="z-store-carousel">
                <tf-carousel :imgs="imgs"
                             :delay="4000"
                             :autoPlay="false">
                </tf-carousel>
            </div>
            <!--轮播-->
            <div class="z-box">
                <div class="service-detail-title">洗衣机上门维修（检测费）</div>
                <div class="zflex">
                    <span class="service-price zflex1">
                                        <span class="price-big">{{data.price}}</span>元/{{data.unit}}
                    <span class="origin-price gray">原价100元</span></span>
                    </span>
                    <z-number :item="data" @add="add" @minus="minus"></z-number>
                </div>
            </div>
    
            <group>
                <cell title="服务项目"
                      value="洗衣机上门维修"
                      :is-link="true"></cell>
            </group>
    
            <group>
                <cell title="服务时间">
                    <span slot="value"
                          class="red">
                                2017-03-08 19:30
                            </span>
                </cell>
            </group>
    
            <div class="z-box">
                <p>服务描述</p>
                <p>1.总费用 = 保险费 + 配件费</p>
                <p>2.专业师傅</p>
                <p>3.如有高空作业,将收取一部分高空作业费</p>
            </div>
    
            <sticky scroll-box="z-container">
                <tab :line-width="1"
                     active-color="#f9261d"
                     default-color="#969696"
                     bar-active-color="#f9261d">
                    <tab-item :selected="index == 1"
                              v-for="(item, index) in tabItems"
                              :key="item"
                              @on-item-click="checkTabItem(index)">{{item.name}}</tab-item>
                </tab>
            </sticky>
            <comment v-show="currentView == 1"></comment>
        </div>
        <service-bottom></service-bottom>
    </div>
</template>
<script>
import TfCarousel from '@/components/common/carousel.vue'
import ZHeader from '@/components/common/ZHeader.vue'
import ZNumber from './Number.vue'
import Sticky from 'vux/src/components/sticky'
import Tab from 'vux/src/components/tab/tab.vue'
import TabItem from 'vux/src/components/tab/tab-item.vue'
import Comment from '../store/Comment'
import ServiceBottom from './ServiceBottom'
export default {
    name: 'serviceDetail',
    components: {
        TfCarousel,
        ZHeader,
        ZNumber,
        Sticky,
        Tab,
        TabItem,
        Comment,
        ServiceBottom
    },
    data() {
        return {
            imgs: [{ url: require('../../assets/imgs/img1.jpg') },
            { url: require('../../assets/imgs/img2.jpg') },
            { url: require('../../assets/imgs/img3.jpg') },
            { url: require('../../assets/imgs/img4.jpg') }],
            tabItems: [
                { id: 1, name: '详情' },
                { id: 2, name: '评论' },
            ],
            data: {
                price: '98',
                unit: '次',
                id: this.$route.params.id,
                name: '高空干洗服务',
                storeName: '小猪干洗电',
                storeId: 58
            },
            currentView: 1
        }
    },
    methods: {
        checkTabItem(index) {
            this.currentView = index
        },
        add(item){
            this.$store.dispatch('addToCart', item)
        },
        minus(item){
            this.$store.dispatch('minusfromCart', item)
        }
    }
}
</script>
<style>
.service-detail-title {
    font-size: 0.3rem;
}

.price-big {
    font-size: 0.35rem;
}
</style>
