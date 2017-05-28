<template>
    <div class="z-page z-search">
        <!--<div style="position:absolute;width:100%">
                            <search placeholder="搜索"
                                    position="absolute"
                                    @result-click="resultClick"
                                    :results="results"
                                    v-model="value"
                                    @on-change="searchList"
                                    ref="search"></search>
                        </div>-->
    
        <div class="zflex search-pos-box">
    
            <div class="search-pos-city">
    
                <cell is-link>
                    <select class="weui-input weui-select"
                            slot="after-title"
                            v-model="selected">
                        <option value="2"
                                selected>服务</option>
                        <option value="1"
                                selected>商家</option>
                    </select>
                </cell>
    
            </div>
            <div class="zflex1">
                <search placeholder="搜索"
                        position="absolute"
                        @result-click="resultClick"
                        :results="results"
                        v-model="value"
                        @on-change="searchList"
                        ref="search"></search>
            </div>
        </div>
    
        <div class="z-container"
             ref="scroller">
            <div class="z-box"
                 v-if="!serviceItems.length && !storeItems.length">
                <p>热门标签</p>
                <ul>
                    <li class="cate-btns"
                        v-for="item in keys"
                        @click="searchBykey(item)">{{item}}</li>
                </ul>
            </div>
            <div class="z-box"
                 v-for="item in serviceItems">
                <service-item container=".z-store-detail"
                              :item="item"
                              :key="item">
                </service-item>
    
            </div>
    
            <div class="z-storeItems">
                <store-item v-for="item in storeItems"
                            :key="item"
                            :item="item"></store-item>
            </div>
            <blank v-if="(!serviceItems.length && !storeItems.length) && this.value"
                   :define="true">
                <div>暂无搜索结果</div>
            </blank>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import { Search, debounce } from 'vux'
import { hotKey, search } from '../../api'
import ServiceItem from '../store/ServiceItem'
import StoreItem from '../service/StoreItem.vue'
export default {
    name: 'searchs',
    components: {
        Search,
        ServiceItem,
        StoreItem
    },
    data() {
        return {
            results: [],
            value: '',
            page: 1,
            limit: 30,
            serviceItems: [],
            loading: false,
            isOver1: false,
            isOver2: false,
            keys: [],
            scroller: null,
            timer: null,
            _debounce1: null,
            _debounce2: null,
            key: '',
            selected: 2,
            storeItems: []
        }
    },
    created() {
        hotKey().then(res => {
            this.keys = res
        })
        this._debounce = debounce(() => {
            search({ keyword: this.key, type: 2, page: this.page, limit: this.limit }).then(res => {
                this.serviceItems = res
            })
        }, 500)

    },
    watch: {
        selected() {
            this.value = ''
            this.serviceItems = []
            this.storeItems = []
            if (this.selected == 1) {
                this._debounce = debounce(() => {
                    search({ keyword: this.key, type: 1, page: this.page, limit: this.limit }).then(res => {
                        this.storeItems = res
                    })
                }, 500)
            }
            if (this.selected == 2) {
                this._debounce = debounce(() => {
                    search({ keyword: this.key, type: 2, page: this.page, limit: this.limit }).then(res => {
                        this.serviceItems = res
                    })
                }, 500)
            }
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    beforeDestroyed() {
        if (this._debounce) {
            this._debounce.cancel()
        }
        
    },
    methods: {
        resultClick(item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        },
        getResult(val) {
            this.results = val ? this.newResult(this.value) : []
        },
        newResult(val) {
            let rs = []
            for (let i = 0; i < 8; i++) {
                rs.push({
                    title: `${val} result: ${i + 1} `,
                    other: i
                })
            }
            return rs
        },
        searchList(val) {
            this.page = 1
            this.isOver1 = false
            this.isOver2 = false
            this.loading = false
            this.key = val
            if(this.value){
                this._debounce()
            }
        },
        loadMore() {
           


            if (((!this.isOver1 && this.selected ==2) || (!this.isOver2 && this.selected ==1)) && !this.loading) {
                this.loading = true
                search({ keyword: this.key, type: this.selected, page: ++this.page, limit: this.limit }).then(res => {
                    this.loading = false
                    if (this.selected == 2) {
                        this.serviceItems = this.serviceItems.concat(res)
                        if (!res.length) {
                            this.isOver1 = true
                        }
                    }
                    if (this.selected == 1) {
                        this.storeItems = this.storeItems.concat(res)
                        if (!res.length) {
                            this.isOver2 = true
                        }
                    }

                })
            }
        },
        searchBykey(val) {
            this.page = 1
            this.isOver1 = false
            this.isOver2 = false
            this.loading = false
            search({ keyword: val, type: this.selected, page: this.page, limit: this.limit }).then(res => {
                if(this.selected == 1){
                    this.storeItems = res
                }else{
                    this.serviceItems = res
                } 
            })
        }
    }
}
</script>
<style>
.z-search .cate-btns {
    width: auto;
    margin: 0.3rem 0.5% 0;
    padding: 0 0.2rem;
}

.z-search .weui-cell {
    padding-left: 0;
}
</style>