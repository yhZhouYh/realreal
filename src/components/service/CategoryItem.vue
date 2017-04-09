<template>
    <div class="category-item">
        <x-button type="warn">进入{{detail.name}}</x-button>
        <span v-for="item in detail.labels"  class="cate-btns">{{item.name}}</span>
    </div>
</template>
<script>
    import XButton from 'vux/src/components/x-button'
    export default{
        name: 'category-item',
        props: ['detail'],
        components: {
            XButton
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