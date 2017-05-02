<template>
    <div class="z-hori-menu zflex zmenu"
         ref="scroll">
        <button class="menu-item"
                v-for="(item, index) in items"
                ref="item"
                @click="checkItem(item, index)"
                :class="{red: isChecked == index}">{{item[name]}}</button>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    name: 'z-hori-menu',
    props: {
        items: {
            type: Array
        },
        isCheck: {
            default: 0
        },
        name: {

        }
    },
    data() {
        return {
            // items: ['全部', '待付款', '待取件', '维修中', '待评价', '退款'],
            isChecked: this.isCheck
        }
    },
    watch: {
        items() {
            this.$nextTick(() => {
                const { scroll, item } = this.$refs
                Transform(scroll, true)
                const scrollWidth = scroll.getBoundingClientRect().width
                let itemWidths = 0
                for (var i = 0, l = item.length; i < l; i++) {
                    itemWidths += item[i].getBoundingClientRect().width
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
    mounted() {
        if (this.items.length) {
            this.$nextTick(() => {
                const { scroll, item } = this.$refs
                Transform(scroll, true)
                const scrollWidth = scroll.getBoundingClientRect().width
                let itemWidths = 0
                for (var i = 0, l = item.length; i < l; i++) {
                    itemWidths += item[i].getBoundingClientRect().width
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
    methods: {
        checkItem(item, index) {
            if (this.isChecked != index) {
                this.$emit('checkedItem', item, index)
            }
            this.isChecked = index
        }
    }
}
</script>
<style lang="less">
.menu-item {
    width: 1.4rem;
    padding: 0.2rem 0;
    text-align: center;
    margin-right: 10px;
    background: transparent;
    box-shadow: none;
    color: #000;
    border-radius: 0;
    &:last-child {
        margin-right: 0;
    }
    &.red {
        color: #f9261d;
        border-bottom: 1px solid #f9261d;
    } //border: 0;
}

.zmenu {
    background: #fff;
}
</style>