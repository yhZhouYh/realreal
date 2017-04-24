<template>
    <div class="category-item">
        <!--<x-button type="warn">进入{{detail.catName}}</x-button>-->
        <span v-for="(item,index) in detail.children"  class="cate-btns" @click="go(item, index)">{{item.catName}}</span>
    </div>
</template>
<script>
    import XButton from 'vux/src/components/x-button'
    export default{
        name: 'category-item',
        props: ['detail'],
        components: {
            XButton
        },
        methods: {
            go(item, index){
                this.$router.push({name:'serviceList',params:{id: item.parentId},query:{index: index, cid: item.catId}})
            }
        }
    }
</script>
<style lang="less">
    .cate-btns{
        display: inline-block;
        background: #f0f0f0;
        font-size: 0.25rem;
        border-radius: 99px;
        height:0.5rem;
        line-height: 0.5rem;
        width:30%;
        color:#000;
        text-align: center;
        margin: 0.3rem 1.5% 0;
    }
</style>