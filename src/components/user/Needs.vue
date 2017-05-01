<template>
    <div class="z-page z-needs">
        <z-header :showBack="true"
                  backWords=""
                  title="需求列表">
        </z-header>
        <div class="z-container"
             ref="scroller">
            <blank v-if="!needs.length"
                   :define="true">
                <div>暂无需求</div>
            </blank>
            <need-item v-for="item in needs"
                       :key="item.id"
                       :need="item"></need-item>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import needItem from './NeedItem'
import infiniteLoading from '../common/InfiniteScroll.vue'
import { getNeedsByCid } from '../../api'
import Blank from '@/components/common/Blank'
export default {
    components: {
        ZHeader,
        needItem,
        infiniteLoading,
        Blank
    },
    data() {
        return {
            items: ['全部需求', '家电服务', '办公设备', '电商服务', '生活服务'],
            page: 1,
            limit: 10,
            needs: [],
            loading: false,
            isOver: false
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    methods: {
        loadMore() {
            if (!this.isOver) {
                this.loading = true
                getNeedsByCid({ catid: this.$route.params.cid, page: ++this.page, limit: this.limit }).then(res => {
                    this.loading = false
                    this.needs.concat(res)
                    if (!res.length) {
                        this.isOver = true
                    }
                })
            }
        }
    },
    created() {
        getNeedsByCid({ catid: this.$route.params.cid }).then(res => {
            this.needs = res
        })
    }
}
</script>
<style>

</style>