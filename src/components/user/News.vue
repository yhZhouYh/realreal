<template>
    <div class="z-page z-news">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
        </z-header>
        <div class="z-container"
             ref="scroller">
            <blank v-if="!newsList.length"
                   :define="true">
                <div>小编太懒啦！</div>
            </blank>
            <!--<div class="z-box zflex news-box" v-for="news in newsList">
                    <div class="img-box">
                        <img src=""
                             alt=""
                             class="news-img">
                    </div>
                    <div class="news-content zflex1">
                        <h4 class="news-title">{{news.title}}</h4>
                        <p class="news-time gray">{{news.ctime}}</p>
                    </div>
                </div>-->
            <group>
                <cell :title="news.articleTitle"
                      v-for="news in newsList"
                      is-link
                      :key="news.catId"
                      :link="{name:'newsDetail', params: {id: news.articleId}}"></cell>
            </group>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import { newsList } from '../../api'
export default {
    name: 'news',
    components: {
        ZHeader
    },
    data() {
        return {
            newsList: [],
            page: 1,
            limit: 20,
            newsCategory: {
                '7': '常见问题',
                '8': '正证新闻',
                '14': '正证声明',
                '15': '用户协议',
                '16': '关于我们',
                '17': '行业资讯',
                '18': '免费查询',
                '21': '优惠信息'
            },
            loading: false,
            isOver: false,
            scroller: null
        }
    },
    mounted() {
        this.scroller = this.$refs.scroller
    },
    created() {
        newsList({ page: this.page, limit: this.limit, classid: this.$route.params.id }).then(res => {
            this.newsList = res
        })
    },
    computed: {
        title() {
            return this.newsCategory[this.$route.params.id] || '查询'
        }
    },
    methods: {
        loadMore() {
            if (!this.isOver && !this.loading) {
                this.loading = true
                newsList({ classid: this.$route.params.id, page: ++this.page, limit: this.limit }).then(res => {
                    this.loading = false
                    this.newsList = this.newsList.concat(res)
                    if (!res.length) {
                        this.isOver = true
                    }
                })
            }
        }
    }
}
</script>
<style lang="less">
.news-box {
    .img-box {
        width: 2rem;
        height: 1.4rem;
        overflow: hidden;
    }
    .news-img {
        width: 100%;
        min-height: 1.4rem;
    }
    .news-content {
        padding-left: 0.2rem;
    }
    .news-title {
        padding-bottom: 0.3rem;
    }
}

.news-time {
    font-size: 0.26rem;
}
</style>