<template>
    <div class="z-page login">
        <z-header :showBack="true"
                  backWords=""
                  title="注册">
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
                             ref="username"></x-input>
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
                             :disabled="showPassword">
                        <span slot="right"
                              @click="showpass" v-show="password">
                                <icon icon="icon-mingwen01" :class="{red: showPassword}" style="padding-left:5px;"></icon>
                        </span>
                    </x-input>
                </div>
                <!--<div class="login-name zflex login-group vux-1px-b">
                            <icon icon="icon-mima"
                                  horizon
                                  class="red"></icon>
                            <x-input type="password"
                                     class="weui-input zflex1"
                                     placeholder="确认密码"
                                     v-model.trim="password"></x-input>
                        </div>-->
                <check-box class="protocal">
                    <a href="javascript:;"
                       slot="middle"
                       class="red">
                                我同意《正证网注册协议》
                            </a>
                </check-box>
                <div class="login-button-box">
                    <x-button class="login-button"
                              @click.native="login">注册</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import XInput from 'vux/src/components/X-input'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
import CheckBox from '../cart/CheckBox.vue'
export default {
    components: {
        ZHeader,
        Icon,
        XButton,
        XInput,
        Toast,
        CheckBox
    },
    data() {
        return {
            mobile: '',
            password: '',
            showPassword: false,
        }
    },
    computed: {
        passtype() {
            return this.showPassword ? 'text' : 'password'
        }
    },
    methods: {
        showpass() {
            this.showPassword = !this.showPassword
        }
    }
}
</script>
<style>
.protocal {
    margin-bottom: 0.2rem;
    padding: 0 0.3rem;
}
</style>