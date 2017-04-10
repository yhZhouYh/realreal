<template>
    <canvas id="wave"
            ref="canvas">
    </canvas>
</template>
<script>
export default {
    name: 'wave',
    data() {
        return {
            ctx: null
        }
    },
    mounted() {
        const canvas = this.$refs.canvas
        let ctx = this.ctx
        ctx = canvas.getContext('2d')
        this.loop(ctx,canvas)
    },
    methods: {
        loop(ctx,canvas) {
            //清空canvas
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "rgba(255,255,255, 1)";
            //开始绘制路径
            ctx.beginPath();
            //左上角
            ctx.moveTo(0, canvas.height * 2 / 3);
            //右上角
            ctx.lineTo(canvas.width, canvas.height * 2 / 3);
            //右下角
            ctx.lineTo(canvas.width, canvas.height);
            //左下角
            ctx.lineTo(0, canvas.height);
            //左上角
            ctx.lineTo(0, canvas.height * 2 / 3);
            //闭合路径
            ctx.closePath();
            //填充路径
            ctx.fill();
            console.log(4344)
            this.requestAnimFrame(this.loop)
        },
        requestAnimFrame() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
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