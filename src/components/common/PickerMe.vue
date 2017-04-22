<template>
    <div class="iselect-options"
         ref="box">
        <ul class="iselect-scroll"
            ref="scroll">
            <li v-for="item in data">{{item.areaName}}</li>
        </ul>
        <div class="iselect-mask1 b1 bb bt"></div>
        <div class="iselect-mask2 b1 bt"></div>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    name: 'picker',
    props: ['data','index'],
    data() {
        return {
            box: null,
            scroll: null,
            step: 30,
            touch: null
        }

    },
    watch: {
        data() {
            this.touch = null
            var _this = this
            console.log(this.data)
            this.touch =new AlloyTouch({
                touch: this.box,
                vertical: true,
                target: this.scroll,
                initialValue: 0,
                property: "translateY",
                min: this.data.length == 0 || this.data.length == 1? -0 :(this.data.length - 1) * -30,
                max: 0,
                step: this.step,
                change: function (value) { },
                touchStart: function (evt, value) { },
                touchMove: function (evt, value) { },
                touchEnd: function (evt, value) { },
                tap: function (evt, value) { },
                pressMove: function (evt, value) { },
                animationEnd: function (value) {
                    let index = _this.getSelectedIndex(_this.scroll, _this.step, _this.data)
                    _this.$emit('getobj', _this.data[index], _this.index)
                },
                change: function (evt, value) {

                }
            })
        }
    },
    mounted() {
        this.box = this.$refs.box
        this.scroll = this.$refs.scroll
        Transform(this.scroll)
    },
    methods: {
        getSelectedIndex(scroll, step, data) {
            var rpt = (scroll.translateY * -1) / step;
            if (rpt < 0) return 0;
            if (rpt > data.length) return data.length - 1;
            return Math.round(rpt);
        }

    }
}


</script>
<style>

</style>