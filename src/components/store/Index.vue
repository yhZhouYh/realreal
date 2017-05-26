<template>
    <div class="z-page">
        <!--头部开始-->
        <z-header :showBack="true"
                  backWords=""
                  :title="shop.shopName">
            <span slot="rightitems">
                   <icon icon="icon-shoucang2" @click.native="collect" v-show="collected"></icon>
                   <icon icon="icon-tuijianicon" @click.native="collect" v-show="!collected"></icon>
                </span>
        </z-header>
        <!--头部结束-->
        <!--轮播开始-->
        <div class="z-container"
             id="z-container"
             ref="scroller">
            <div class="z-store-carousel">
                <tf-carousel :imgs="imgs"
                             :delay="4000"
                             :autoPlay="false">
                </tf-carousel>
            </div>
            <!--轮播结束-->
            <!--友情提示开始-->
            <div class="z-box">
                <!--<div class="z-storedetail-remind zflex">
                        <span>友情提示: </span>
                        <span class="remind-items zflex1">
                        <p> 1.维修需要时间，请耐心等待。</p>
                        <p> 2.自行送件到维修店，可免上门服务费哟。</p>
                        </span>
                    </div>-->
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
                         :serviceItems="serviceItems"
                         v-show="currentView == 0"
                         @checkItem="checkItem"></store-items>
            <!--具体项目列表结束-->
            <!--商店详情-->
            <div class="z-box tore-items"
                 v-show="currentView == 1">
                <div v-html="shop.desc"
                     v-if="shop.desc"></div>
                <blank v-if="!shop.desc"
                       :define="true">
                    <div>暂无描述哦~</div>
                </blank>
            </div>
            <!--商店详情-->
            <!--评论开始-->
            <comment v-show="currentView == 2"
                     :scroller="scroller"
                     type="shop"
                     :canLoadMore="currentView == 2"></comment>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
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
import Icon from '../common/Icon'
import { shopDetail, shopCategory, shopGoodsByShopId, collect, isCollect} from '../../api'
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
        Comment,
        Icon
        //   PullToLoad
        //ServiceItem
    },
    directives: {
        pull
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    data() {
        return {
            imgs: [],
            shop: {},
            tabItems: [
                { id: 1, name: '服务项目' },
                { id: 2, name: '商家简介' },
                { id: 3, name: '评价' },
            ],
            items: [
            ],
            serviceItems: [
            ],
            currentView: 0, //默认展示服务项
            middle: {},
            middleObj: {
                page: 1,
                items: [],
                isOver: false
            },
            scroller: null,
            limit: 10,
            currentCid: 0,
            orderList: [],
            loading: false,
            isOver2: false,
            page2: 1,
            collected: false,
            // nocollect: true
        }
    },
    created() {
        shopDetail({ id: this.$route.params.id }).then(res => {
            this.shop = res
            if(this.shop.shopAds!=null){
                this.imgs = [...this.shop.shopAds]
            }
        })
        shopCategory({ id: this.$route.params.id }).then(res => {
            this.items = res
            return this.items
        }).then(items => {
            this.isChecked = 0
            let item = items[0]
            this.currentCid = item.catId
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                shopGoodsByShopId({ id: this.currentCid, page: 1, limit: this.limit }).then(res => {
                    middleObj.items = res
                    this.middle[this.isChecked] = middleObj
                    this.serviceItems = this.middle[this.isChecked].items
                })
            } else {
                this.serviceItems = this.middle[index].items
            }
        })
        if (this.$store.state.user.userId) {
            isCollect({ userid: this.$store.state.user.userId, type: 1, id: this.$route.params.id }).then(res => {
                if (res) {
                    this.collected = true
                }
            })
        }

    },
    methods: {
        checkTabItem(index) {
            //debugger
            this.currentView = index
        },
        loadMore() {
            if (this.currentView == 0) {
                let middle = this.middle[this.isChecked]
                if (!middle.isOver && !this.loading) {
                    this.loading = true
                    middle.page += 1
                    shopGoodsByShopId({ id: this.currentCid, page: middle.page, limit: this.limit }).then(res => {
                        this.loading = false
                        middle.items = middle.items.concat(res)
                        this.serviceItems = middle.items
                        if (res.length == 0) {
                            middle.isOver = true
                        }
                    })
                }
            }
        },
        checkItem(item, index) { //缓存处理
            this.isChecked = index
            this.currentCid = item.catId
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                shopGoodsByShopId({ id: this.currentCid, page: 1, limit: this.limit }).then(res => {
                    middleObj.items = res
                    this.middle[this.isChecked] = middleObj
                    this.serviceItems = this.middle[this.isChecked].items
                })
            } else {
                this.serviceItems = this.middle[index].items
            }
        },
        collect() {
            collect({ userid: this.$store.state.user.userId, id: this.shop.shopId, type: 1 }).then(res => {
                this.collected = !this.collected
                if (this.collected) {
                    this.$vux.toast.show({
                        text: '收藏成功',
                        position: 'bottom',
                        width: 'auto',
                        type: 'text'
                    })
                } else {
                    this.$vux.toast.show({
                        text: '取消收藏',
                        position: 'bottom',
                        width: 'auto',
                        type: 'text'
                    })
                }
            })
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
    .weui-btn_default {
        color: #f9261d!important;
        background: #fff!important;
    }
}

.service-detail {
    background: #fff;
    padding: 0.2rem;
}
</style>