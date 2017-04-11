<template>
    <canvas id="wave"
            ref="canvas"
            width="2960px"
            height="2960px">
    </canvas>
</template>
<script>
export default {
    name: 'wave',
    data() {
        return {
            ctx: null,
            canvas: null,
            step: 0,
            lines: [
                "rgba(255,255,255, 0.9)",
                "rgba(255,255,255, 0.8)",
            ]
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.canvas = this.$refs.canvas
            this.ctx = this.canvas.getContext('2d')
            this.loop()
        })


    },
    methods: {
        loop() {
            //清空canvas
            let ctx = this.ctx
            let canvas = this.canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.step++;
            for (var i = 0, l = this.lines.length; i < l; i++) {
                ctx.fillStyle = this.lines[i]
                
                let angle = (this.step + i * 150) * Math.PI / 180;
                // debugger
                let deltaHeight = Math.sin(angle) * 150 ;
                //矩形高度的变化量(右上顶点)
                let deltaHeightRight = Math.cos(angle) * 150;
                ctx.beginPath();
                //左上角
                ctx.moveTo(0, canvas.height * 0.7 + deltaHeight);
                ctx.bezierCurveTo(canvas.width / 2, canvas.height * 0.7 + deltaHeight + 200, canvas.width / 2, canvas.height * 0.7 + deltaHeightRight + 200, canvas.width, canvas.height * 0.7 + deltaHeightRight);
                //右上角
                ctx.lineTo(canvas.width, canvas.height * 0.6 + deltaHeightRight);
                //右下角
                ctx.lineTo(canvas.width, canvas.height);
                //左下角
                ctx.lineTo(0, canvas.height);
                //左上角
                ctx.lineTo(0, canvas.height * 0.7 + deltaHeight);
                //闭合路径
                ctx.closePath();
                //填充路径
                ctx.fill();
            }
             this.requestAnimFrame(this.loop)

        },
        requestAnimFrame(func) {
            return window.requestAnimationFrame(func) ||
                window.webkitRequestAnimationFrame(func) ||
                window.mozRequestAnimationFrame(func) ||
                function (func) {
                    window.setTimeout(func, 1000 / 60);
                }(func);
        }
    }
}
</script>
<style lang="less">
#wave {
    width: 100%;
    height: 100%;
}
</style>