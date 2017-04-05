<template>
    <div class="pull-to-load"
         ref="wrap">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'pullToLoad',
    data() {
        return {
            count: 0 //触发load函数次数
        }
    },
    mounted() {
        console.log(document.body.scrollHeight)
        this.$nextTick(function () {
            console.log(window)
            document.getElementById('z-container').addEventListener('scroll', function() {
                console.log(this.scrollHeight)
                //this.scroll()
            })
        })
        // window.addEventListener('scroll', (e) => {
        //     debugger
        //     console.log(1111)
        // })
    }
}
</script>
<style>

</style>