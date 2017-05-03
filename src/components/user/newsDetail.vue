<template>
    <div class="z-page z-news">
        <z-header :showBack="true"
                  backWords=""
                  title="详情">
        </z-header>
        <div class="z-container"
             ref="scroller">
             <div class="news-container">
                <h3>{{news.articleTitle}}</h3>
                <p class="news-time gray">{{news.createTime}}</p>
                <p v-html="news.articleContent"></p>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import { newsDetail } from '../../api'
export default {
    name: 'news',
    components: {
        ZHeader
    },
    data() {
        return {
            news: {},
        }
    },
    created() {
        newsDetail({ id: this.$route.params.id }).then(res => {
            this.news = res
        })
    }
}
</script>
<style lang="less">
.news-container {
    padding:0.3rem;
}
</style>