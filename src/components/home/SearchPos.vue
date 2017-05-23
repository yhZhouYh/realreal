<template>
    <div class="z-page z-search-pos">
        <div class="zflex search-pos-box">
            <div class="search-pos-city">
                <x-address :list="addressData"
                           :class="{'weui-cell_warn': !addmodel.length}"
                           title=""
                           v-model="addmodel[1]"
                           value-text-align="left"
                           hide-district='true'
                           ></x-address>
            </div>
            <div class="zflex1">
                <search placeholder="搜索附近商家、服务"
                        position="absolute"
                        @result-click="resultClick"
                        :results="results"
                        v-model="value"
                        @on-change="searchList"
                        ref="search"></search>
            </div>
        </div>
    </div>
</template>
<script>
import { Search, debounce, XAddress, ChinaAddressV3Data } from 'vux'
export default {
    name: 'search-pos',
    components: {
        Search,
        XAddress
    },
    data() {
        return {
            addmodel: [],
            addressData: ChinaAddressV3Data
        }
    }
}
</script>
<style lang="less">
.search-pos-box {
    background-color: #EFEFF4;
    .weui-search-bar:after {
        border: 0;
    }
    .weui-search-bar:before {
        border: 0;
    }
}

.search-pos-city {
    padding-left: 0.2rem;
    height: 100%;
}
</style>