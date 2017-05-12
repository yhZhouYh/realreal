<template>
    <div class="z-page z-address-manage">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
        </z-header>
        <div class="z-container">
            <div class="paystatus-icon red">
                <icon icon="icon-chenggong"
                      v-if="$route.params.id == 1"></icon>
                <icon icon="icon-shibai"
                      v-else></icon>
                <div class="pay-status">交易{{status}}</div>
                <div class="status-words gray"
                     v-if="$route.params.id != 1">{{code[$route.params.id]}}</div>
            </div>
            <div class="login-button-box"
                 style="margin-top:0.5rem;">
                <x-button class="login-button"
                          @click.native="lookOrder">查看订单</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import { XButton } from 'vux'
export default {
    name: 'paystatus',
    components: {
        ZHeader,
        Icon,
        XButton
    },
    data() {
        return {
            title: '温馨提示',
            status: this.$route.params.id == 1 ? '成功' : '失败',
            code: {
              '4000': '网络异常，请查看订单重试',
              '4001': '操作有误，请查看订单重试',
              '4003': '请确认本人支付宝账户状态',
              '4004': '请确认本人支付宝账户状态',  
              '4005': '绑定失败或没有绑定',
              '4006': '订单支付失败，请联系商家或查看订单重试',
              '4010': '请确认本人支付宝账户状态',
              '6000': '支付宝正在进行升级，请稍后重试',
              '6001': '您已取消支付'
            }
        }
    },
    methods: {
        lookOrder() {
            this.$router.replace('/orderList')
        }
    }
}
</script>
<style lang="less">
.paystatus-icon {
    padding-top: 0.8rem;
    text-align: center;
    .zheader-icon {
        font-size: 1.4rem;
    }
    .pay-status {
        padding-top: 0.2rem;
        font-size: 0.34rem;
    }
    .status-words {
        padding-top: 0.2rem;
        font-size: 0.28rem;
    }
}
</style>