<template>
    <div class="z-number zflex">
        <icon icon="icon-jianshao"
              class="number-minus red"
              :class="{disable: num == 1}"
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
            default: 1
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
    mounted () {
        this.num = this.currentNum
    },
    data() {
        return {
            num: 1
        }
    },
    methods: {
        add() {
            this.num++
            //this.$store.dispatch('addToCart', this.item) //添加入购物车
            this.$emit('add', this.item, this.num)
        },
        minus() {
            if (this.num > 1) {
                this.num--
                //this.$store.dispatch('minusfromCart', this.item)
                this.$emit('minus', this.item, this.num)
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