<template>
    <div class="z-page z-search-pos">
        <div class="zflex search-pos-box">
            <div class="search-pos-city">
                <x-address :list="addressData"
                           title=""
                           :class="{'weui-cell_warn': !addmodel.length}"
                           :placeholder="title"
                           v-model="addmodel"
                           value-text-align="left"
                           :hide-district='true'></x-address>
            </div>
            <div class="zflex1">
                <search placeholder=""
                        position="absolute"
                        v-model="keyword"
                        @on-change="searchList"
                        ref="search"></search>
            </div>
        </div>
        <div class="z-container"
             ref="scroller">
            <group v-if="location.address">
                <cell title="当前定位"
                      :value="location.address">
                    <icon icon="icon-weizhi"
                          slot="icon"
                          :horizon="true"
                          class="red"></icon>
                </cell>
            </group>
            <group>
                <cell :title="item.name"
                      :inline-desc="item.address"
                      :key="index"
                      v-for="(item,index) in searchArr"
                      @click.native="checkAdd(item)"
                      is-link></cell>
            </group>
            <blank v-if="!searchArr.length && this.keyword"
                   :define="true">
                <div>暂无定位信息</div>
            </blank>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import { Search, debounce, XAddress, ChinaAddressV3Data, Value2nameFilter } from 'vux'
import Icon from '../common/Icon'
export default {
    name: 'search-pos',
    components: {
        Search,
        XAddress,
        Icon
    },
    data() {
        return {
            addmodel: [],
            addressData: ChinaAddressV3Data,
            location: this.$store.state.currentLocation,
            keyword: '',
            _debounce: null,
            bmap: '',
            errcode: {
                '1': '检索词有岐义',
                '2': '检索地址有歧义',
                '3': '没有找到检索结果',
                '4': 'key错误',
                '5': '网络异常',
                '6': '网络异常',
                '7': 'gps授权失败'
            },
            pageIndex: 0,
            pageCapacity: 10,
            city: '',
            scroller: null,
            isOver: false,
            loading: false,
            searchArr: [],
            totalPage: 0
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
        this.initFunc()
    },
    beforeDestroyed() {
        if (this._debounce) {
            this._debounce.cancel()
        }
    },
    computed: {
        title() {
            return this.location.city || '选择'
        },
    },
    watch: {
        addmodel() {
            let cityarr = Value2nameFilter(this.addmodel, ChinaAddressV3Data).split(' ')
            if (cityarr[1] == '市辖区') {
                this.city = cityarr[0]
            } else {
                this.city = cityarr[1]
            }
        }
    },
    methods: {
        searchList() {
            if (this.keyword) {
                this._debounce()
            }
        },
        initFunc() {
            this._debounce = debounce(() => {
                console.warn(this.city)
                this.searchArr = []
                this.pageIndex = 0
                this.isOver = false
                this.loading = false
                if (window.bmap) {
                    this.$store.dispatch('changeLoading')
                    window.bmap.searchInCity({
                        keyword: this.keyword,
                        city: this.city || this.location.city,
                        pageIndex: this.pageIndex,
                        pageCapacity: this.pageCapacity
                    }, (ret) => {
                        if (ret.status) {
                            var state = this.$store.state.loading
                            if (state) {
                                this.$store.dispatch('changeLoading')
                            }
                            console.warn(JSON.stringify(ret))
                            this.searchArr = ret.results
                            this.totalPage = ret.totalPage
                        } else {
                            console.warn(ret.code)
                             var state = this.$store.state.loading
                            if (state) {
                                this.$store.dispatch('changeLoading')
                            }
                            this.$vux.toast.show({
                                text: this.errcode[ret.code],
                                position: 'bottom',
                                width: 'auto',
                                type: 'text'
                            })
                        }
                    })
                }

            }, 500)
        },
        checkAdd(item) {
            this.location.poi = item.name
            this.location.longitude = item.lon
            this.location.latitude = item.lat
            this.$store.dispatch('saveLocation', this.location)
            this.$router.go(-1)
        },
        loadMore() {
            if(this.pageIndex>= this.totalPage){
                this.isOver = true
            }
            if (!this.isOver && !this.loading) {
                this.loading = true
                window.bmap.searchInCity({
                    keyword: this.keyword,
                    city: this.city || this.location.city,
                    pageIndex: ++this.pageIndex,
                    pageCapacity: this.pageCapacity
                }, (ret) => {
                    if (ret.status) {
                        this.loading = false
                        console.warn(JSON.stringify(ret))
                        this.searchArr = this.searchArr.concat(ret.results)
                       
                    } else {
                        this.loading = false
                        console.warn(ret.code)
                        this.$vux.toast.show({
                            text: this.errcode[ret.code],
                            position: 'bottom',
                            width: 'auto',
                            type: 'text'
                        })
                    }
                })
            }
        },
    },
    created() {

    }
}
</script>
<style lang="less">
.search-pos-box {
    position: absolute;
    width: 100%;
    z-index: 10;
    background-color: #EFEFF4;
    .weui-search-bar:after {
        border: 0;
    }
    .weui-search-bar:before {
        border: 0;
    }
}

.z-search-pos {
    .weui-cells {
        margin-top: 0;
    }
}

.search-pos-city {
    padding-left: 0.2rem;
    height: 100%;
}
</style>