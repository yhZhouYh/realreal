<template>
    <div class="z-page z-search">
        <div style="position:absolute;width:100%">
            <search placeholder="搜索附近商家、服务"
                    position="absolute"
                    @result-click="resultClick"
                    :results="results"
                    v-model="value"
                    @on-change="searchList"
                    @on-focus="onFocus"
                    ref="search"></search>
        </div>
    
        <div class="z-container"
             ref="scroller">
            <div class="z-box" v-if="!serviceItems.length">
                <p>热门标签</p>
                <ul>
                    <li class="cate-btns">洗衣机</li>
                    <li class="cate-btns">洗衣机</li>
                    <li class="cate-btns">洗衣机</li>
                    <li class="cate-btns">洗衣机</li>
                </ul>
            </div>
            <div class="z-box"
                 v-for="item in serviceItems">
                <service-item container=".z-store-detail"
                              :item="item"
                              :key="item">
                </service-item>
            </div>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import { Search } from 'vux'
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
            limit: 20,
            serviceItems: [],
            loading: false,
            isOver: false,
            key: ''
        }
    },
    created() {
        hotKey().then(res => {
            console.log(res)
        })
    },
    mounted() {
        this.scroller = this.$refs.scroller
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
            this.key = val
            search({ keyword: val, type: 2, page: this.page, limit: this.limit }).then(res => {
                this.serviceItems = res
            })
        },
        loadMore() {
            this.loading = true
            if (!this.loading && !this.isover) {
                search({ keyword: this.key, type: 2, page: ++this.page, limit: this.limit }).then(res => {
                    this.serviceItems.concat(res)
                    if (!res.length) {
                        this.isover = true
                    }
                })
            }
        }
    }
}
</script>
<style>
.z-search .cate-btns {
    width: 23%;
    margin: 0.3rem 0.5% 0;
}
</style>