<template>
    <div class="comment zflex vux-1px-b">
        <img :src="comment.avatar" alt="" class="comment-avatar">
        <div class="comment-content zflex1 zflex">
            <div>
                <p class="comment-name">
                    {{comment.name}}                
                </p>
                <p class="comment-star">
                    <span v-for="i in comment.star" class="red">★</span> 
                    <span class="comment-time gray">{{comment.time}}</span>              
                </p>
                <p class="comment-core">
                    {{comment.content}}
                </p>
            </div>
        </div>
         <icon :icon="icon" class="red"></icon>
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
       data () {
        return {
            icon: 'real-icon-yiwancheng'
        }
       },
       components: {
         Icon
       }
    }
</script>
<style lang="less">
    .comment{
        padding-bottom: 0.13rem;
        padding-top: 0.18rem;
        &:first-child{
            padding-top: 0;
        } 
    }
    .comment-avatar{
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.16rem;
    }
    .comment.zflex{
        align-items: flex-start;
    }
    .comment-star, .comment-name{
        font-size: 0.21rem;
    }
    .comment-content p{
        margin-bottom: 0.08rem;
    }
</style>