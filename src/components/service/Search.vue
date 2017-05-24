<template>
    <div class="z-page z-search">
        <div style="position:absolute;width:100%">
            <search placeholder="搜索附近商家、服务"
                    position="absolute"
                    @result-click="resultClick"
                    :results="results"
                    v-model="value"
                    @on-change="searchList"
                    ref="search"></search>
        </div>
    
        <div class="z-container"
             ref="scroller">
            <div class="z-box"
                 v-if="!serviceItems.length">
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
             <blank v-if="!serviceItems.length && this.value"
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

export default {
    name: 'searchs',
    components: {
        Search,
        ServiceItem
    },
    data() {
        return {
            results: [],
            value: '',
            page: 1,
            limit: 30,
            serviceItems: [],
            loading: false,
            isOver: false,
            keys: [],
            scroller: null,
            timer: null,
            _debounce: null,
            key: ''
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
    mounted() {
        this.scroller = this.$refs.scroller
    },
    beforeDestroyed(){
        if(this._debounce){
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
            this.isOver = false
            this.loading = false
            this.key = val
            if(this.value){
                this._debounce()
            }   
        },
        loadMore() {
            if (!this.isOver && !this.loading) {
                this.loading = true
                search({ keyword: this.key, type: 2, page: ++this.page, limit: this.limit }).then(res => {
                    this.loading = false
                    this.serviceItems = this.serviceItems.concat(res)
                    if (!res.length) {
                        this.isOver = true
                    }
                })
            }
        },
        searchBykey(val) {
            this.page = 1
            search({ keyword: val, type: 2, page: this.page, limit: this.limit }).then(res => {
                this.serviceItems = res
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
</style>