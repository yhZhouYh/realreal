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
        </div>
    </div>
</template>
<script>
import CommentItem from './CommentItem.vue'
export default {
    name: 'comment',
    components: {
        CommentItem
    },
    data() {
        return {
            isChecked: 0,
            commentItem: [
                { id: 1, name: '全部', num: 135 },
                { id: 2, name: '好评', num: 118 },
                { id: 3, name: '中评', num: 5 },
                { id: 4, name: '差评', num: 12 }
            ],
            comments: [
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') }
            ]
        }
    },
    methods: {
        checkItem(item, index) {
            if (this.isChecked != index) {
                this.$emit('checkedItem', item)
            }
            this.isChecked = index
        }
    }
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