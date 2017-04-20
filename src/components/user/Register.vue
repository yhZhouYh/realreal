<template>
    <div class="z-page login">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
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
                             ref="mobile"
                             required></x-input>
                </div>
                <div class="login-name zflex login-group vux-1px-b">
                    <icon icon="icon-yanzhengma"
                          horizon
                          class="red"></icon>
                    <x-input type="text"
                             class="weui-input zflex1"
                             placeholder="输入验证码"
                             v-model.trim="code"
                             :min="4"
                             :max="4"
                             ref="code"
                             required>
                        <!--<span slot="right" class="verifyCode" v-touch-ripple>获取验证码</span>-->
                        <veri-code slot="right"
                                   @getcode="getcode"
                                   :valid="validMobile"></veri-code>
                    </x-input>
                </div>
                <div class="login-name zflex login-group vux-1px-b">
                    <icon icon="icon-mima"
                          horizon
                          class="red"></icon>
                    <x-input :type="passtype"
                             class="weui-input zflex1"
                             placeholder="输入密码"
                             v-model.trim="password"
                             ref="password"
                             :disabled="showPassword"
                             required>
                        <span slot="right"
                              @click="showpass"
                              v-show="password">
                                    <icon icon="icon-mingwen01" :class="{red: showPassword}" style="padding-left:5px;"></icon>
                            </span>
                    </x-input>
                </div>
            </div>
            <div class="login-button-box">
                <x-button class="login-button"
                          @click.native="login"
                          :show-loading="showLoading">确定</x-button>
            </div>
    
        </div>
        <toast type="text"
               v-model="showToast"
               position="bottom"
               :text="toastText"
               width="auto"></toast>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import XInput from 'vux/src/components/X-input'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
import VeriCode from './VeriCode'
import { sendSms, register, login, forgetPass } from '../../api'
export default {
    name: 'login',
    components: {
        ZHeader,
        Icon,
        XButton,
        Toast,
        XInput,
        VeriCode
    },
    data() {
        return {
            mobile: '',
            password: '',
            showToast: false,
            toastText: '',
            validMobile: false,
            showPassword: false,
            code: '',
            title: this.$route.query.id == "reset" ? '重置密码' : '注册',
            validCode: false,
            showLoading: false
        }
    },
    computed: {
        passtype() {
            return this.showPassword ? 'text' : 'password'
        }
    },
    methods: {
        login() {
            this.validMobile = this.$refs.mobile.valid
            this.validCode = this.$refs.code.valid
            if (!this.validMobile) {
                this.validToast('请填写正确的手机号')
                return
            }
            if (!this.validCode) {
                this.validToast('验证码错误')
                return
            }
            if (!this.password) {
                this.validToast('请填写密码')
                return
            }
            let { mobile, password, code } = { ...this._data } //解构当前data
            if (!this.$route.query.id) {
                this.showLoading = true
                register({ mobile, password, code: code.toLowerCase() }).then(res => {
                    this.validToast('注册成功')
                    return login({username:mobile, password})
                }).then(res => {
                    console.log(res)
                    this.$store.dispatch('saveAccssToken', res.token)
                }).catch(error => {
                     this.showLoading = false
                })
            }else{
                forgetPass({ mobile, password, code: code.toLowerCase()}).then(res => {
                    this.validToast('修改成功')
                })
            }

        },
        validToast(text) {
            // debugger
            this.toastText = text
            this.showToast = true
        },
        getcode() {
            this.validMobile = this.$refs.mobile.valid
            if (!this.validMobile) {
                this.validToast('请填写正确的手机号')
            } else {
                let type = 1
                if(this.$route.query.id){
                    type = 2
                }
                sendSms({ type, mobile: this.mobile }).then(res => {
                    console.log(res)
                })
            }
        },
        showpass() {
            this.showPassword = !this.showPassword
        }
    }
}
</script>
<style lang="less">
.verifyCode {
    padding: 0.2rem;
    vertical-align: middle;
}
</style>