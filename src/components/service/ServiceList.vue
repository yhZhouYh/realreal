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
            <router-link to="search"
                         slot="rightitems"
                         style="margin-right: 5px;">
                <svg class="zicon zheader-icon zflex"
                     aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <p class="zheader-icon-word">搜索</p>
            </router-link>
        </z-header>
        <div class="z-container"
             ref="scroller">
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
                            @checkedItem="checkedItem"
                            :isCheck="isChecked"></z-menu>
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
import { getCategory, getGoodsByCid, getStoreById } from '../../api'
//import infiniteLoading from '../common/InfiniteScroll.vue'
export default {
    name: 'serviceList',
    components: {
        ZHeader,
        ButtonTab,
        ButtonTabItem,
        ServiceItem,
        StoreItem,
        ZMenu
    },
    data() {
        return {
            title: '',
            serviceItems: [],
            storeItems: [],
            selected: 0,
            items: [],
            scroller: null,
            loading: false,
            currentCid: this.$route.query.cid ? this.$route.query.cid : 0,
            cid: 0,
            page: 1,
            limit: 10,
            page2: 1,
            isOver: false,
            isOver2: false,
            isChecked: this.$route.query.index != undefined ? parseInt(this.$route.query.index) + 1 : 0, //check index 应该加+1
            middle: {},
            middleObj: {
                page: 1,
                items: [],
                isOver: false
            }
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    //初始化
    created() {
        getCategory({ id: this.$route.params.id }).then(res => {
            this.title = res[0].catName
            this.items = res[0].children
            let data = { ...res[0] }
            data.catName = '全部'
            data.catId = 0
            this.items.unshift(data)
        })
        getGoodsByCid({ id: this.$route.params.id, page: this.page, limit: this.limit, cid: this.currentCid }).then(res => {
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                middleObj.items = res
                this.middle[this.isChecked] = middleObj
            }
            this.serviceItems = this.middle[this.isChecked].items
        })
        getStoreById({ id: this.$route.params.id, page: this.page2, limit: this.limit }).then(res => {
            this.storeItems = res
        })

    },
    methods: {
        loadMore() {
            if (this.selected == 0) {
                let middle = this.middle[this.isChecked]
                if (!middle.isOver) {
                    this.loading = true
                    middle.page += 1
                    getGoodsByCid({ id: this.$route.params.id, page: middle.page, limit: this.limit, cid: this.currentCid }).then(res => {
                        this.loading = false
                        middle.items.concat(res)
                        this.serviceItems = middle.items
                        if (res.length == 0) {
                            middle.isOver = true
                        }
                    })
                }
            } else {
                if (!this.isOver2) {
                    this.loading = true
                    getStoreById({ id: this.$route.params.id, page: ++this.page2, limit: this.limit }).then(res => {
                        this.loading = false
                        this.serviceItems.concat(res)
                        if (res.length == 0) {
                            this.isOver2 = true
                        }
                    })
                }
            }
        },
        checkedItem(item, index) { //缓存处理
            this.isChecked = index
            this.currentCid = item.catId
            if (!this.middle[this.isChecked]) {
                let middleObj = { ...this.middleObj }
                getGoodsByCid({ id: this.$route.params.id, page: this.page, limit: this.limit, cid: this.currentCid }).then(res => {
                    middleObj.items = res
                    this.middle[this.isChecked] = middleObj
                    this.serviceItems = this.middle[this.isChecked].items
                })
            } else {
                this.serviceItems = this.middle[index].items
            }
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