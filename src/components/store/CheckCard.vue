<template>
    <div class="z-hori-menu"
         ref="scroll">
        <x-button :mini="true"
                  :plain="true"
                  v-for="(item,index) in items"
                  class="z-check-button"
                  ref="item"
                  :key="item"
                  @click.native="checkItem(item, index)"
                  :class="{active: isChecked == index}">{{item.catName}}</x-button>
        <!--<span class="z-check-button vux-1px" v-for="item in items">{{item}}</span>-->
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
import XButton from 'vux/src/components/x-button'
export default {
    name: 'z-hori-menu',
    props: ['items'],
    components: {
        XButton
    },
    data() {
        return {
            isChecked: 0
        }
    },
    watch : {
        items () {
            this.$nextTick(() => {
            const { scroll, item } = this.$refs
            Transform(scroll, true)
            const scrollWidth = scroll.getBoundingClientRect().width
            let itemWidths = 0
            for (var i = 0, l = item.length; i < l; i++) {
                itemWidths += item[i].$el.getBoundingClientRect().width
            }
            const min = itemWidths - scrollWidth + 10 * (item.length - 1) //计算每个元素宽度 + 间距
            if (min > 0) { //当元素少得时候不触发
                let at = new AlloyTouch({
                    touch: scroll,
                    vertical: false,
                    property: 'translateX',
                    sensitivity: 1,
                    min: -min,
                    max: 0,
                })
            }

        })
        }
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         const { scroll, item } = this.$refs
    //         Transform(scroll, true)
    //         const scrollWidth = scroll.getBoundingClientRect().width
    //         let itemWidths = 0
    //         for (var i = 0, l = item.length; i < l; i++) {
    //             itemWidths += item[i].$el.getBoundingClientRect().width
    //         }
    //         const min = itemWidths - scrollWidth + 10 * (item.length - 1) //计算每个元素宽度 + 间距
    //         if (min > 0) { //当元素少得时候不触发
    //             let at = new AlloyTouch({
    //                 touch: scroll,
    //                 vertical: false,
    //                 property: 'translateX',
    //                 sensitivity: 1,
    //                 min: -min,
    //                 max: 0,
    //             })
    //         }

    //     })
    // },
    methods: {
        checkItem(item, index) {
            if(this.isChecked != index){
                this.$emit('checkItem', item, index)
            }
            this.isChecked = index
        }
    }
}
</script>
<style lang="less">
.z-hori-menu {
  //  margin-top: 0.16rem; //width:auto;
    white-space: nowrap;
    .z-check-button {
        border-color: #C7C7C7;
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
        &.active {
            color: #f9261d;
            border-color: #f9261d;
        }
        &:active {
            color: #f9261d!important;
            border-color: #f9261d!important;
            background-color: transparent!important;
        }
    }
}

.weui-btn+.weui-btn {
    margin-top: 0!important
}
</style>