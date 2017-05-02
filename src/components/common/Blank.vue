<template>
    <div class="z-blank">
        <img :src="img" alt="">
        <p class="gray" v-if="!define">暂无相关记录</p>
        <slot v-else></slot>
    </div>
</template>
<script>
    export default{
        name: 'zBlank',
        props:{
            define: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                img : require('../../assets/imgs/blank.png')
            }
        }
    }
</script>
<style lang="less">
    .z-blank{
        text-align: center;
        color: rgb(150, 150, 150);
        img{
            width:2.16rem;
            padding-top: 1.5rem;
        }
        div{
            padding-bottom: 1.5rem;
        }
    }
</style>