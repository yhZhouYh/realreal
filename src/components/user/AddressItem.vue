<template>
    <div class="z-box address-item">
        <icon icon="icon-xuanze" class="add-checked red" v-show="!isManage"></icon>
        <div class="add-top zflex">
            <span class="zflex1">周周</span>
            <span>15655148526</span>
        </div>
        <div class="add-middle" :class="{'vux-1px-b': isManage}">
            安徽省合肥市庐阳区濉溪路64栋604室
        </div>
            <z-checker class="add-bottom" v-if="isManage">
                <span slot="middle">默认地址</span>
                <div slot="right">
                    <span style="padding-right:0.2rem;">编辑</span>
                    <span>删除</span>
                </div>
            </z-checker>
    </div>
</template>
<script>
    import ZChecker from '../cart/CheckBox'
    import Icon from '../common/Icon'
    export default{
        name: 'addressItem',
        components: {
            ZChecker,
            Icon
        },
        data () {
            return {
                isManage: this.$route.query.isManage == 1? true: false
            } 
        }
    }
</script>
<style>
    .address-item{
        position: relative;
    }
    .add-middle{
        padding: 0.2rem 0 0.25rem 0;
    }
    .add-bottom{
        padding-top:0.2rem;
    }
    .add-checked{
        position: absolute;
        bottom:0;
        right:0;
        font-size: 0.7rem;
    }
</style>