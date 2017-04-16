<template>
    <span class="verifyCode"
          @click="getCode"
          v-touch-ripple>{{msg}}</span>
</template>
<script>
export default {
    name: 'vericode',
    props: ['valid'],
    data() {
        return {
            msg: '获取验证码',
            isCount: false,
            timer: null,
            count: 60
        }
    },
    methods: {
        getCode() {
            if (!this.isCount) {
                this.$emit('getcode')
            }
             this.$nextTick(this.countDown)
             //组件更新后 再调用countdown
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
        },
        countDown() {
            if (!this.isCount && this.valid) {
                this.isCount = true
                this.timer = setInterval(() => {
                    this.msg = --this.count + 's'
                    if (this.count == 0) {
                        this.isCount = false
                        this.count = 60
                        this.msg = '再次获取'
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            }

        }
    }
}
</script>
<style>

</style>