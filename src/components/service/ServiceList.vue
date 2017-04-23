<template>
    <div class="z-page z-service-list">
        <z-header :showBack="true"
                  backWords="">
            <div class="z-button-tab"
                 slot="middleitems">
                <button-tab v-model="selected">
                    <button-tab-item selected
                                     :value="0">服务</button-tab-item>
                    <button-tab-item :value="1">商家</button-tab-item>
                </button-tab>
            </div>
            <div slot="rightitems"
                 style="margin-right: 5px;">
                <svg class="zicon zheader-icon zflex"
                     aria-hidden="true">
                    <use xlink:href="#real-icon-search"></use>
                </svg>
                <p class="zheader-icon-word">搜索</p>
            </div>
        </z-header>
        <div class="z-container"
             ref="scroller">
            <!--<div class="z-button-tab">
                                            <button-tab v-model="selected">
                                                <button-tab-item selected :value="0">服务</button-tab-item>
                                                <button-tab-item :value="1">商家</button-tab-item>
                                            </button-tab>
                                        </div>-->
            <div v-show="selected == 0"
                 class="z-service-container">
                <div class="z-box"
                     v-for="item in serviceItems">
                    <service-item container=".z-store-detail"
                                  :item="item"
                                  :key="item">
                    </service-item>
                </div>
                <blank v-if="!serviceItems.length"
                       :define="true">
                    <div>没有相关服务啦！</div>
                </blank>
                <div class="menu-box">
                    <z-menu :items="items"
                            name="catName"
                            @checkedItem="checkedItem" :isCheck="isChecked"></z-menu>
                </div>
            </div>
            <div class="z-storeItems">
                <store-item v-for="item in storeItems"
                            :key="item"
                            :item="item"
                            v-show="selected==1"></store-item>
            </div>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ButtonTab from 'vux/src/components/button-tab/button-tab.vue'
import ButtonTabItem from 'vux/src/components/button-tab/button-tab-item.vue'
import ServiceItem from '../store/ServiceItem.vue'
import StoreItem from './StoreItem.vue'
import ZMenu from '../common/Menu.vue'
import { getCategory, getGoodsByCid } from '../../api'
import infiniteLoading from '../common/InfiniteScroll.vue'
export default {
    name: 'serviceList',
    components: {
        ZHeader,
        ButtonTab,
        ButtonTabItem,
        ServiceItem,
        StoreItem,
        ZMenu,
        infiniteLoading
    },
    data() {
        return {
            title: '',
            serviceItems: [],
            storeItems: [
                { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418, StoreName: '到家维修' },
                { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418, StoreName: '到家维修' },
                { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418, StoreName: '到家维修' }
            ],
            selected: 0,
            items: [],
            scroller: null,
            loading: false,
            currentCid: this.$route.params.id,
            cid: 0,
            page: 1,
            limit: 10,
            isOver: false,
            isChecked: 0
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    created() {
        getCategory({ id: this.$route.params.id }).then(res => {
            this.title = res[0].catName
            this.items = res[0].children
            let data = { ...res[0] }
            data.catName = '全部'
            this.items.unshift(data)
        })
        getGoodsByCid({ id: this.currentCid, page: this.page, limit: this.limit }).then(res => {
            this.serviceItems = res
        })

    },
    methods: {
        loadMore() {
            if (!this.isOver) {
                this.loading = true
                getGoodsByCid({ id: this.currentCid, page: this.page++, limit: this.limit }).then(res => {
                    this.loading = false
                    this.serviceItems.concat(res)
                    if (res.length == 0) {
                        this.isOver = true
                    }
                })
            }
        },
        checkedItem(item) {
            this.page = 1
            this.isOver = false
            this.currentCid = item.catId
            getGoodsByCid({ id: this.$route.params.id, page: this.page, limit: this.limit, cid: this.currentCid }).then(res => {
                this.serviceItems = res
            })
        }
    }
}
</script>
<style lang="less" scrope>
.z-button-tab {
    width: 3rem;
    margin: 0 auto;
}

.z-page {
    .vux-button-group>a.vux-button-group-current,
    .vux-button-group>a.hover,
    .vux-button-group>a:active {
        border-color: #f9261d;
        color: #fff;
        background: #f9261d;
    }
}

.z-service-list {
    .z-servie-item {
        padding: 0;
    }
    .menu-box {
        position: absolute;
        top: 0.84rem;
        width: 100%;
    }
}

.z-service-container .z-box:first-child {
    margin-top: 0.7rem;
}


.z-storeItems {
    overflow: hidden;
    padding: 0.1rem 0.1rem 0;
}
</style>