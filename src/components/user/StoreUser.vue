<template>
    <div class="z-page z-stoe-user">
        <z-header :showBack="true"
                  backWords=""
                  title="请选择身份">
        </z-header>
        <div class="z-container">
             <div class="login-button-box">
                <x-button class="login-button"
                          @click.native="store">我是商家</x-button>
            </div>
            <div class="login-button-box">
                <x-button class="login-button"
                          @click.native="user">我是维修员</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import XButton from 'vux/src/components/x-button'
export default {
    components: {
        ZHeader,
        XButton
    },
    methods: {
        store(){
            this.$router.push({name:'apply', query:{store: 1}})
        },
        user(){
            this.$router.push('apply')
        }
    }
}
</script>
<style>
    .z-stoe-user .login-button-box{
        margin-top: 0.8rem;
    }
</style>