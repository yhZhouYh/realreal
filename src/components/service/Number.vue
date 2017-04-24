<template>
    <div class="z-number zflex">
        <icon icon="icon-jianshao"
              class="number-minus red"
              :class="{disable: num == 0}"
              @click.native="minus"></icon>
        <span class="number-box">{{num}}</span>
        <icon icon="icon-tianjia"
              class="number-add red"
              @click.native="add()"></icon>
    </div>
</template>
<script>
import Icon from '../common/Icon'
export default {
    name: 'zNumber',
    props: {
        item: {
            type: Object
        },
        currentNum: {
            type: Number,
            default: 0
        }
    },
    components: {
        Icon
    },
    watch: {
        currentNum(){
            this.num = this.currentNum
        }
    },
    data() {
        return {
            num: 0
        }
    },
    methods: {
        add() {
            this.num++
            //this.$store.dispatch('addToCart', this.item) //添加入购物车
            this.$emit('add', this.item)
        },
        minus() {
            if (this.num > 0) {
                this.num--
                //this.$store.dispatch('minusfromCart', this.item)
                this.$emit('minus', this.item)
            }

        },
        // addToCart (item) {
           
        // }
    }
}
</script>
<style lang="less">
.number-minus.disable {
    color: #ccc;
}

.number-box {
    margin: 0 0.2rem;
    font-size: 0.3rem;
}
</style>