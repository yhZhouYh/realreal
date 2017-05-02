<template>
    <div class="z-page z-service">
        <!--头部-->
        <z-header :showBack="true"
                  backWords=""
                  :title="data.shopName">
            <router-link to="/cart"
                         slot="rightitems"
                         style="margin-right: 5px;"
                         class="itembox">
    
                <icon icon="icon-gouwuche"></icon>
    
                <div class="badge-box"
                     v-show="cartAllCounts">
                    <badge :text="cartAllCounts"></badge>
                </div>
            </router-link>
        </z-header>
        <!--头部-->
        <div class="z-container">
            <!--轮播-->
            <div class="z-store-carousel">
                <tf-carousel v-if="data.gallery"
                             :imgs="data.gallery"
                             :delay="4000"
                             :autoPlay="false">
                </tf-carousel>
            </div>
            <!--轮播-->
            <div class="z-box">
                <div class="service-detail-title">{{data.goodsName}}</div>
                <div class="zflex">
                    <span class="service-price zflex1">
                    <span class="price-big">{{data.shopPrice}}</span>元/{{data.goodsUnit}}
                    <span class="origin-price gray">原价{{data.marketPrice}}元</span></span>
                    </span>
                    <z-number :item="data"
                              @add="add"
                              @minus="minus"></z-number>
                </div>
            </div>
    
            <!--<group>
                                                            <cell title="服务项目"
                                                                  value="洗衣机上门维修"
                                                                  :is-link="true"></cell>
                                                        </group>-->
    
            <group>
                <cell title="服务时间">
                    <span slot="value"
                          class="red">最近可约 {{data.serviceTime}}</span>
    
                </cell>
            </group>
    
            <div class="z-box">
                <p>服务描述</p>
                <p v-if="data.goodsTips">{{data.goodsTips}}</p>
                <p v-else
                   style="text-align:center">暂无描述</p>
            </div>
    
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
            <comment v-show="currentView == 1"></comment>
            <div v-show="currentView == 0"
                 v-html="data.goodsDesc"
                 class="service-detail"></div>
        </div>
        <service-bottom @buynow="buynow"
                        @addtocart="addtocart"></service-bottom>
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
import { goodsDetail, cartAdd } from '../../api'
import Icon from '../common/Icon.vue'
import Badge from 'vux/src/components/Badge'
import { mapGetters } from 'vuex'
export default {
    name: 'service',
    components: {
        TfCarousel,
        ZHeader,
        ZNumber,
        Sticky,
        Tab,
        TabItem,
        Comment,
        ServiceBottom,
        Icon,
        Badge
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
            data: {},
            currentView: 0,
            cartNum: 1,
            currentItem: {}
        }
    },
    computed: {
        ...mapGetters([
            'cartAllCounts',
        ])
    },
    destroyed() {
        this.$store.dispatch('showFooter')
    },
    created() {
        this.$store.dispatch('showFooter')
        goodsDetail({ id: this.$route.params.id }).then(res => {
            this.data = res
            ///const carts = this.$store.state.cart.carts
            // this.currentItem = carts.items.find(p => p.goodsId === res.goodsId)
            // if (this.currentItem) {
            //     this.cartNum = this.currentItem.cartNum
            // } else {
            //     this.currentItem = this.data
            // }
        })
    },
    // mounted () {
    //     // this.count = this.$store.dispatch('getCartItem', item).count
    //     console.log(this.count)
    // },
    methods: {
        checkTabItem(index) {
            this.currentView = index
        },
        add(item) {
            // this.$store.dispatch('addToCart', item)
            this.cartNum++

        },
        minus(item) {
            // this.$store.dispatch('minusfromCart', item)
            this.cartNum--
        },
        buynow() {
            cartAdd({ userid: this.$store.state.user.userId, goodsId: this.data.goodsId, buyNum: this.cartNum, shopsId: this.data.shopId, isCheck: 1 }).then(res => {
                this.data.cartNum = this.cartNum
                this.$store.dispatch('addToCart', this.data)
                this.$router.push('/cart')

            })
        },
        addtocart() {
            cartAdd({ userid: this.$store.state.user.userId, goodsId: this.data.goodsId, buyNum: this.cartNum, shopsId: this.data.shopId, isCheck: 1 }).then(res => {
                this.data.cartNum = this.cartNum
                this.$store.dispatch('addToCart', this.data)
            })
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

.z-page {
    position: absolute;
    width: 100%;
    height: 100%;
}

.service-detail img {
    width: 100%;
}
</style>
