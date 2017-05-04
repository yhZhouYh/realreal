<template>
    <div class="comment zflex vux-1px-b">
        <img :src="avatar"
             alt=""
             class="comment-avatar">
        <div class="comment-content zflex1 zflex">
            <div>
                <p class="comment-name">
                    {{comment.userName}}
                </p>
                <p class="comment-star">
                    <span v-for="i in parseInt(comment.serviceScore)"
                          class="red">★</span>
                    <span class="comment-time gray">{{comment.createTime}}</span>
                </p>
                <p class="comment-core">
                    {{comment.content}}
                </p>
                <div class="comment-reply"
                     v-if="comment.shopReply">商家回复：谢谢亲的关注</div>
            </div>
        </div>
        <icon :icon="icon"
              class="red"></icon>
    </div>
</template>
<script>
import Icon from '../common/Icon'
export default {
    name: 'commentItem',
    props: {
        comment: {
            type: Object
        }
    },
    computed: {
        avatar() {
            return this.comment.userPhoto ? this.comment.userPhoto : require('../../assets/imgs/avatar.jpg')
        }
    },
    data() {
        return {
            icon: 'icon-yiwancheng'
        }
    },
    components: {
        Icon
    }
}
</script>
<style lang="less">
.comment {
    padding-bottom: 0.13rem;
    padding-top: 0.18rem;
    &:first-child {
        padding-top: 0;
    }
}

.comment-avatar {
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.16rem;
}

.comment.zflex {
    align-items: flex-start;
}

.comment-star,
.comment-name {
    font-size: 0.23rem;
}

.comment-content p {
    margin-bottom: 0.08rem;
}

.comment-reply {
    background: #FFF2E8;
    font-size: 0.26rem;
    padding: 0.1rem;
}
</style>