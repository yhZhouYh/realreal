<template>
    <div class="z-page z-search">
        <search placeholder="搜索附近商家、商品、服务"
                position="absolute"
                @result-click="resultClick"
                :results="results"
                v-model="value"></search>
        <div class="z-contianer">
            <p>热门标签</p>
        </div>
    </div>
</template>
<script>
import Search from 'vux/src/components/search/index.vue'
export default {
    name: 'search',
    components: {
        Search
    },
    data() {
        return {
            results: [],
            value: 'test'
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
        }
    }
}
</script>
<style>

</style>