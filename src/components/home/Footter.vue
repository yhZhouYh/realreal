<template>
    <div class="z-footer zflex vux-1px-t" v-if="show" id="footer">
        <router-link class="zflex1" to="/" :class="{red: $route.name=='home'}">
            <icon icon="icon-shouye-shouye"></icon>
            <p>首页</p>
        </router-link>
        <router-link class="zflex1" to="/near" :class="{red: $route.name=='near'}">
            <icon icon="icon-fujin"></icon>
            <p>附近</p>
        </router-link>
        <router-link class="zflex1" to="/category" :class="{red: $route.name=='category'}">
            <icon icon="icon-tubiao3"></icon>
            <p>分类</p>
        </router-link>
        <router-link class="zflex1" to="/user" :class="{red: $route.name=='user'}">
            <icon icon="icon-wo"></icon>
            <p>我的</p>
        </router-link>
    </div>
</template>
<script>
    import Icon from '../common/Icon.vue'
    export default {
        name: 'footer',
        props: {
            show: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Icon
        }
    }
</script>
<style lang="less">
    .z-footer{
        position: absolute;
        bottom:0;
        width:100%;
        text-align: center;
        background: #fff;
        line-height: 1.2;
        padding: 0.1rem 0;
        &.vux-1px-t{
            position: absolute;
        }
    }
</style>