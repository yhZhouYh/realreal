<template>
    <x-header :class="{'vux-1px-b': header.showBorder}"
              :style="{background: header.bgColor}"
              :left-options="{showBack: header.showBack, backText: header.backText}"
              :right-options="{showMore: header.showMore}">
        <span slot="default"
              :style="{color: header.titleColor}">{{header.title}}</span>
        <div slot="right"><slot name="zright"></slot></div>
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
