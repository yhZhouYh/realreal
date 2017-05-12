<template>
    <div class="z-page z-address-manage">
        <z-header :showBack="true"
                  backWords="">
            <div class="z-button-tab"
                 slot="middleitems">
                <button-tab v-model="selected">
                    <button-tab-item selected
                                     :value="0">商家</button-tab-item>
                    <button-tab-item :value="1">服务</button-tab-item>
                </button-tab>
            </div>
        </z-header>
        <div class="z-container"
             ref="scroller">
            <div class="z-storeItems"
                 v-show="selected ==0">
                <blank v-if="!storeItems.length"
                       :define="true">
                    <div>暂无收藏商家！</div>
                </blank>
                <store-item v-for="item in storeItems"
                            :key="item"
                            :item="item"></store-item>
            </div>
            <div v-show="selected == 1">
                <div class="z-box"
                     v-for="item in serviceItems">
                    <service-item container=".z-store-detail"
                                  :item="item"
                                  :key="item">
                    </service-item>
                </div>
                <blank v-if="!serviceItems.length"
                       :define="true">
                    <div>暂无收藏服务！</div>
                </blank>
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
import { collectList } from '../../api'
import StoreItem from '../service/StoreItem'
import ButtonTab from 'vux/src/components/button-tab/button-tab.vue'
import ButtonTabItem from 'vux/src/components/button-tab/button-tab-item.vue'
import ServiceItem from '../store/ServiceItem.vue'

export default {
    components: {
        ZHeader,
        StoreItem,
        ButtonTab,
        ButtonTabItem,
        ServiceItem
    },
    data() {
        return {
            storeItems: [],
            selected: 0,
            serviceItems: [],
            page: 1,
            limit: 10,
            page2: 1,
            isOver: false,
            isOver2: false,
            loading: false
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    created() {
        collectList({ userid: this.$store.state.user.userId, type: 1, limit: this.limit, page: 1 }).then(res => {
            this.storeItems = res
        })
        collectList({ userid: this.$store.state.user.userId, type: 0, limit: this.limit, page: 1 }).then(res => {
            this.serviceItems = res
        })
    },
    methods: {
        loadMore() {
            if (this.selected == 0) {
                if (!this.isOver2 && !this.loading) {
                    this.loading = true
                    collectList({ userid: this.$store.state.user.userId, type: 1, limit: this.limit, page: ++this.page1 }).then(res => {
                        this.loading = false
                        this.storeItems.concat(res)
                        if (res.length == 0) {
                            this.isOver2 = true
                        }
                    })
                }
            } else {
                if (!this.isOver1 && !this.loading) {
                    this.loading = true
                    collectList({ userid: this.$store.state.user.userId, type: 0, limit: this.limit, page: ++this.page2 }).then(res => {
                        this.loading = false
                        this.serviceItems.concat(res)
                        if (res.length == 0) {
                            this.isOver1 = true
                        }
                    })
                }
            }

        }
    }

}
</script>
<style>

</style>