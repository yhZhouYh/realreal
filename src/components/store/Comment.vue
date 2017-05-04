<template>
    <div class="z-comment-box">
        <div class="z-comment-header zflex">
            <div class="comment-item zflex1"
                 :class="{checked: isChecked == index}"
                 v-for="(item, index) in commentItem"
                 @click="checkItem(item, index)">
                <p>{{item.num}}</p>
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="z-box">
            <comment-item v-for="comment in comments"
                          :key="comment"
                          :comment="comment"></comment-item>
            <scroller :scroller="scroller"
                      :loading="loading"
                      @load="loadMore"
                      loading-text="加载中" />
    
        </div>
    </div>
</template>
<script>
import CommentItem from './CommentItem.vue'
import { getValueByShopId, getValueByGoodsId, getValueNum } from '../../api'
export default {
    name: 'comment',
    props: ['scroller', 'type', 'canLoadMore'],
    components: {
        CommentItem
    },
    data() {
        return {
            isChecked: 0,
            commentItem: [
                { id: 1, name: '全部', num: 0, type: "all" },
                { id: 2, name: '好评', num: 0, type: "goods" },
                { id: 3, name: '中评', num: 0, type: "general" },
                { id: 4, name: '差评', num: 0, type: "bads" }
            ],
            comments: [
                // { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                // { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                // { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                // { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') }
            ],
            loading: false,
            middle: {},
            middleObj: {
                page: 1,
                isOver: false,
                items: []
            },
            currentType: 'all',
        }
    },
    created() {
        if (this.type == 'shop') {
            getValueByShopId({ shopsId: this.$route.params.id, page: 1, limit: 10, type: "all" }).then(res => {
                let middleObj = { ...this.middleObj }
                middleObj.items = res
                this.middle[this.currentType] = middleObj
                this.comments = this.middle[this.currentType].items
            })
            getValueNum({ id: this.$route.params.id, field: 'shopId' }).then(res => {
                this.commentItem[0].num = res.all
                this.commentItem[1].num = res.goods
                this.commentItem[2].num = res.general
                this.commentItem[3].num = res.bads
            })
        } else {
            getValueByGoodsId({ goodsId: this.$route.params.id, page: 1, limit: 10, type: "all" }).then(res => {
                let middleObj = { ...this.middleObj }
                middleObj.items = res
                this.middle[this.currentType] = middleObj
                this.comments = this.middle[this.currentType].items
            })
            getValueNum({ id: this.$route.params.id, field: 'goodsId' }).then(res => {
                this.commentItem[0].num = res.all
                this.commentItem[1].num = res.goods
                this.commentItem[2].num = res.general
                this.commentItem[3].num = res.bads
            })
        }
    },
    methods: {
        checkItem(item, index) {
            if (this.isChecked != index) {
                this.$emit('checkedItem', item)
                this.currentType = item.type
                if (!this.middle[this.currentType]) {
                    let middleObj = { ...this.middleObj }
                    if (this.type == 'shop') {
                        getValueByShopId({ shopsId: this.$route.params.id, page: 1, limit: 20, type: this.currentType }).then(res => {
                            middleObj.items = res
                            this.middle[this.currentType] = middleObj
                            this.comments = this.middle[this.currentType].items
                        })
                    } else {
                        getValueByGoodsId({ goodsId: this.$route.params.id, page: 1, limit: 20, type: this.currentType }).then(res => {
                            middleObj.items = res
                            this.middle[this.currentType] = middleObj
                            this.comments = this.middle[this.currentType].items
                        })
                    }

                } else {
                    this.comments = this.middle[this.currentType].items
                }
            }
            this.isChecked = index
        },
        loadMore() {
            if (this.canLoadMore) {
                let middle = this.middle[this.currentType]
                if (!middle.isOver) {
                    this.loading = true
                    middle.page += 1
                    if (this.type == 'shop') {
                        getValueByShopId({ shopsId: this.$route.params.id, page: middle.page, limit: 20, type: this.currentType }).then(res => {
                            this.loading = false
                            middle.items.concat(res)
                            this.comments = middle.items
                            if (res.length == 0) {
                                middle.isOver = true
                            }
                        })
                    } else {
                        getValueByGoodsId({ goodsId: this.$route.params.id, page: middle.page, limit: 20, type: this.currentType }).then(res => {
                            this.loading = false
                            middle.items.concat(res)
                            this.comments = middle.items
                            if (res.length == 0) {
                                middle.isOver = true
                            }
                        })
                    }
                }
            }
        },
    },
}
</script>
<style>
.comment-item {
    text-align: center;
    background: #fff;
}

.comment-item.checked {
    color: #f9261d;
}
</style>