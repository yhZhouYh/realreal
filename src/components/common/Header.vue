<template>
    <x-header :class="{'vux-1px-b': header.showBorder}"
              :style="{background: header.bgColor}"
              :left-options="{showBack: header.showBack, backText: header.backText}"
              :right-options="{showMore: header.showMore}">
        <span slot="default"
              :style="{color: header.titleColor}">{{header.title}}</span>
        <span slot="right">{{header.rightDom}}</span>
    </x-header>
</template>
<style>

</style>
<script>
import XHeader from 'vux/src/components/x-header/index.vue'
export default {
    name: 'header',
    props: {
        headerFix: {
            type: Object,
        }
    },
    computed: {
        header() {
            console.log(this.headerFix)
            return Object.assign({}, this.headerDefault, this.headerFix) //将默认属性 和 props传入合并成一个对象
        }
    },
    data() {
        return {
            headerDefault: {
                bgColor: 'rgba(0,0,0,0)',
                titleColor: '#000',
                title: '标题',
                showMore: false,
                backText: ' ',
                showBack: true,
                showBorder: true,
                rightDom: ''
            }
        }
    },
    components: {
        XHeader
    }

}
</script>
