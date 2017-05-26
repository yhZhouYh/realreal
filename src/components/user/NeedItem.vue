<template>
   <router-link :to="{name:'needsDetail', params: {id: need.id}}" class="z-box need-item">
        <div class="title">{{need.title}}</div>
        <div class="content gray">{{need.content}}</div>
        <a :href="'tel:'+need.userPhone" class="need-user zflex" v-if="$store.state.user.isShop == 1">
           <span class="zflex1 gray">报告人：{{need.userName}}</span>
           <x-button class="contact">立即联系</x-button> 
        </a>
        <div class="need-time gray">{{need.createTime}}</div>
    </router-link>
</template>
<script>
import XButton from 'vux/src/components/x-button'
    export default {
       props: {
         need: {
             type: Object
         }
       },
       components : {
           XButton
       },
    }
</script>
<style lang="less">
    @import '../../assets/styles/text.less';
    .need-item{
        display: block;
    }
    .need-item .contact{
        width: 2rem;
        font-size: 0.28rem;
    }
    .need-item .content{
        .ellipsisLn(2);
    }
    .content, .need-user{
        font-size: 0.26rem;
    }
    .need-time{
        font-size: 0.24rem;
    }
</style>