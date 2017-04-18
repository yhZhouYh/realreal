<template>
    <div class="z-page login">
        <z-header :showBack="true"
                  backWords=""
                  title="登陆">
            <router-link to="register"
                         slot="rightitems"
                         style="font-size:17px">注册</router-link>
        </z-header>
        <div class="z-container">
            <div class="login-box">
                <div class="login-name zflex login-group vux-1px-b">
                    <icon icon="icon-shoujihao"
                          horizon
                          class="red"></icon>
                    <x-input type="number"
                             class="weui-input zflex1"
                             placeholder="输入手机号"
                             is-type="china-mobile"
                             v-model.trim="mobile"
                             ref="username"
                             required></x-input>
                </div>
                <div class="login-name zflex login-group vux-1px-b">
                    <icon icon="icon-mima"
                          horizon
                          class="red"></icon>
                    <x-input type="password"
                             class="weui-input zflex1"
                             placeholder="输入密码"
                             v-model.trim="password"></x-input>
                </div>
            </div>
            <div class="login-button-box">
                <x-button class="login-button"
                          @click.native="login">登陆</x-button>
                <div class="forger-pass">
                    <router-link  to="register?id=reset">忘记密码?</router-link>
                </div>
                <divider>社交账号</divider>
                <div class="zflex social">
                    <div class="itembox zflex1 zflex-center zflex-col">
                        <icon icon="icon-qq"></icon>
                        <div>QQ</div>
                    </div>
                    <div class="itembox zflex1 zflex-center zflex-col">
                        <icon icon="icon-iconfontmoban"></icon>
                        <div>微信</div>
                    </div>
                    <div class="itembox zflex1 zflex-center zflex-col">
                        <icon icon="icon-xinlang"></icon>
                        <div>微博</div>
                    </div>
                </div>
            </div>
    
        </div>
        <toast type="text"
               v-model="showToast"
               position="bottom"
               :text="toastText"></toast>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import XInput from 'vux/src/components/X-input'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
import { login } from '../../api'
import Divider from 'vux/src/components/divider'
export default {
    name: 'login',
    components: {
        ZHeader,
        Icon,
        XButton,
        Toast,
        XInput,
        Divider
    },
    data() {
        return {
            mobile: '',
            password: '',
            showToast: false,
            toastText: ''
        }
    },
    methods: {
        login() {
            let validMobile = this.$refs.username.valid
            // this.validToast(this.username, '请填写手机号')
            // this.validToast(this.password, '请填写密码')
            // this.validToast(this.validMobile, '手机号格式不正确')
            if (!validMobile) {
                this.validToast('手机号码不正确')
                return
            }
            if (!this.password) {
                this.validToast('请填写密码')
                return
            }
            login({ username: this.mobile, password: this.password })

        },
        validToast(text) {
            // debugger
            this.toastText = text
            this.showToast = true
        }
    }
}
</script>
<style lang="less">
.login {
    background: #fff;
}

.login-box {
    width: 5.6rem;
    margin: 0.8rem auto;
}

.login-group {
    margin-bottom: 0.4rem;
    padding: 0 0.1rem 0.2rem;
}

.login-box {
    .weui-cell {
        padding: 0;
        &:before {
            border-top: 0;
        }
    }
}

.login-button-box {
    width: 5.45rem;
    margin: 0 auto;
}

.login-button {
    border-radius: 99px;
}

.weui-btn_default {
    color: #fff!important;
    background-color: #f9261d!important;
    &:active {
        background-color: #ccc!important;
    }
}
.forger-pass{
    text-align: right;
    padding-top:0.2rem;
    a{
        color:#2cadff
    }
}
.social{
    color:#ccc;
}
</style>