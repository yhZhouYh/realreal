<template>
    <div class="tf-carousel-containner"
         ref="container">
        <div class="tf-carousel-box"
             ref="box"
             :style="{width: imgBoxWidth}">
            <a href="javascript:;"
               class="carousel-img"
               v-for="item in imgs"
               :style="{width: imgItemWidth, backgroundImage: 'url(' + item + ')'}"></a>
        </div>
        <div class="tf-carousel-nav">
            <a href="javascript:;"
               :class="{active: currentPage == n}"
               v-for="n in imgs.length"></a>
        </div>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    props: {
        imgs: {
            type: Array,
            default: function (){
                return []
            }
        },
        delay: {
            type: Number,
            default: 2000
        },
        autoPlay: {
            type: Boolean,
            dafault: true
        }
    },
    //props: ['imgs', 'delay', 'dotcolor'],
    watch: {
        imgs () {
            const box = this.$refs.box
            const containerWidth = this.$refs.container.getBoundingClientRect().width
            let _this = this
            const options = {
                target: box,
                touch: box,
                vertical: false,
                property: 'translateX',
                min: -containerWidth * (this.imgs.length - 1),
                max: 0,
                step: containerWidth,
                spring: true,
                inertia: false,
                touchStart() {
                    if (_this.timer != null) {
                        clearInterval(_this.timer)
                        _this.timer = null
                    }
                },
                touchEnd(evt, v, index) {
                    var step_v = index * this.step * -1;
                    var dx = v - step_v;
                    if (v < this.min) {
                        _this.step = this.min
                    } else if (v > this.max) {
                        _this.step = this.max
                    } else if (Math.abs(dx) < 30) {
                        _this.step = step_v
                    } else if (dx > 0) {
                        _this.step = step_v + this.step
                    } else {
                        _this.step = step_v - this.step
                    }
                    this.to(_this.step);
                    if (this.autoPlay) {
                        _this.turnPlay(this.step)
                    }
                    return false
                },
                animationEnd(evt, v) {
                    _this.currentPage = this.currentPage + 1
                }
            }
            Transform(box)
            _this.touch = new AlloyTouch(options)
            if (this.autoPlay) {
                _this.turnPlay(this.step)
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            // const box = this.$refs.box
            // const containerWidth = this.$refs.container.getBoundingClientRect().width
            // let _this = this
            // const options = {
            //     target: box,
            //     touch: box,
            //     vertical: false,
            //     property: 'translateX',
            //     min: -containerWidth * (this.imgs.length - 1),
            //     max: 0,
            //     step: containerWidth,
            //     spring: true,
            //     inertia: false,
            //     touchStart() {
            //         if (_this.timer != null) {
            //             clearInterval(_this.timer)
            //             _this.timer = null
            //         }
            //     },
            //     touchEnd(evt, v, index) {
            //         var step_v = index * this.step * -1;
            //         var dx = v - step_v;
            //         if (v < this.min) {
            //             _this.step = this.min
            //         } else if (v > this.max) {
            //             _this.step = this.max
            //         } else if (Math.abs(dx) < 30) {
            //             _this.step = step_v
            //         } else if (dx > 0) {
            //             _this.step = step_v + this.step
            //         } else {
            //             _this.step = step_v - this.step
            //         }
            //         this.to(_this.step);
            //         if (this.autoPlay) {
            //             _this.turnPlay(this.step)
            //         }
            //         return false
            //     },
            //     animationEnd(evt, v) {
            //         _this.currentPage = this.currentPage + 1
            //     }
            // }
            // Transform(box)
            // _this.touch = new AlloyTouch(options)
            // if (this.autoPlay) {
            //     _this.turnPlay(this.step)
            // }

        })
    },
    data() {
        return {
            //imgs: [],
            options: null,
            timer: null,
            touch: null,
            step: 0,
            currentPage: 1,
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
    },
    computed: {
        imgItemWidth() {
            return 100 / this.imgs.length + '%'
        },
        imgBoxWidth() {
            return 100 * this.imgs.length + '%'
        }
        // dotbackground () {
        //     return 
        // }
    },
    methods: {
        turnPlay(step) {
            this.timer = setInterval(() => {
                if (step <= this.touch.min) {
                    step = 0
                } else {
                    step -= this.touch.step
                }
                this.touch.to(step)
            }, this.delay)
        }
    }
}
</script>
<style>
.tf-carousel-containner {
    overflow: hidden;
    position: relative;
    height: 100%;
}

.tf-carousel-box {
    height: 100%;
    position: absolute;
    z-index: 10;
}

.carousel-img {
    background-position: center center;
    background-size: cover;
    height: 100%;
    display: inline-block;
}

.tf-carousel-nav {
    position: absolute;
    bottom: 6px;
    right: 10px;
    z-index: 11;
}

.tf-carousel-nav a {
    display: inline-block;
    background-color: #fff;
    cursor: pointer;
    width: 6px;
    height: 6px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #808080;
    /*transition: all .5s ease-in;*/
    margin-left: 3px;
}

.tf-carousel-nav a.active {
    background-color: #ea2a1d;
}
</style>