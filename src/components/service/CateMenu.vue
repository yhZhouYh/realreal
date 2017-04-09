<template>
    <div class="z-verti-menu"
         ref="scroll" >
        <button class="verti-item vux-1px-b" v-for="(item, index) in items"
              ref="item"  @click="checkItem(item, index)" :class="{checked: isChecked == index}">{{item}}</button>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    name: 'z-verti-menu',
    // props: ['items'],
    data() {
        return {
            items: ['家电服务', '办公设备', '电商服务', '生活服务', '以旧换新', '同城交易','同城交易','同城交易','同城交易','同城交易','同城交易','同城交易','同城交易'],
            isChecked: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            const { scroll, item } = this.$refs
            Transform(scroll, true)
            //debugger
            const scrollWidth = scroll.getBoundingClientRect().height
            let itemWidths = 0
            for (var i = 0, l = item.length; i < l; i++) {
                itemWidths += item[i].getBoundingClientRect().height
            }
            const min =  itemWidths - scrollWidth  //计算每个元素宽度 + 间距
            if (min > 0) { //当元素少得时候不触发
                let at = new AlloyTouch({
                    touch: scroll,
                    vertical: true,
                    property: 'translateY',
                    sensitivity: 1,
                    min: -min,
                    max: 0,
                })
            }

        })
    },
    methods: {
        checkItem(item, index) {
            if (this.isChecked != index) {
                this.$emit('checkedItem', item)
            }
            this.isChecked = index
        }
    }
}
</script>
<style lang="less">
    .z-verti-menu{
        width:1.65rem;
        background: #fff;
        height:100%;
        -webkit-overflow-scrolling: touch;
    }
    .verti-item{
        width:100%;
        height:0.9rem;
        line-height: 0.9rem;
        text-align: center;
        background: transparent;
        box-shadow: none;
        color: #000;
        border-radius: 0;
        &.checked{
            border-left: 2px solid rgb(231, 64, 55);
        }
    }
</style>