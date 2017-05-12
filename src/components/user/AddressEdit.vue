<template>
    <div class="z-page z-address-edit">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
        </z-header>
        <div class="z-container">
            <group>
                <x-input title="联系姓名"
                         required
                         placeholder="请输入联系人姓名"
                         v-model="userName"></x-input>
                <x-input title="联系号码"
                         type="number"
                         required
                         is-type="china-mobile"
                         placeholder="请输入联系号码"
                         v-model="userPhone"
                         ref="userPhone"
                         ></x-input>
                <x-address :list="addressData"
                           :class="{'weui-cell_warn': !addmodel.length}"
                           title="联系地址"
                           v-model="addmodel"
                           value-text-align="left"
                           ></x-address>
                <x-input title="详细地址"
                         required
                         placeholder="请输入详细地址"
                         v-model="userAddress"></x-input>
                <x-switch title="设为默认地址"
                          v-model="isDefault"
                          :class="{'weui-cell_warn': !isDefault}"></x-switch>
            </group>
            <div class="button-box login-button-box"
                 style="padding-top:1rem;">
                <x-button @click.native="edit">确定</x-button>
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
import XInput from 'vux/src/components/X-input'
import { updateAddress } from '../../api'
import XAddress from 'vux/src/components/x-address'
import Toast from 'vux/src/components/toast'
//import vueArea from '@/components/common/Picker'
import { ChinaAddressV3Data } from 'vux'
import { XButton } from 'vux'
import ZChecker from '../cart/CheckBox'
import { XSwitch, Value2nameFilter  } from 'vux'
export default {
    name: 'address-edit',
    components: {
        ZHeader,
        XInput,
        XAddress,
        Toast,
        XButton,
        ZChecker,
        XSwitch
    },
    data() {
        return {
            title: this.$route.query.edit ? '编辑地址' : '添加地址',
            toastText: '',
            showToast: false,
            userName: '',
            userPhone: '',
            addmodel: [],
            addressData: ChinaAddressV3Data,
            userAddress: '',
            isDefault: false,
            addressId: 0
        }
    },
    created(){
        if(this.$route.query.edit){
            const addressEdit = this.$store.state.addressEdit
            if(addressEdit){
                this.userName = addressEdit.userName
                this.addmodel = addressEdit.areaList
                this.userPhone = addressEdit.userPhone
                this.userAddress = addressEdit.userAddress
                this.isDefault = addressEdit.isDefault
                this.addressId = addressEdit.addressId
            }
        }
    },
    methods: {
        validToast(text) {
            this.toastText = text
            this.showToast = true
        },
        edit() {
            let validMobile = this.$refs.userPhone.valid
            if(!validMobile){
                this.validToast('手机号码格式不正确')
                return
            }
            let data = {
                userName: this.userName,
                userPhone: this.userPhone,
                userAddress: this.userAddress,
                isDefault:this.isDefault ?1:0,
                areaIdPath: this.addmodel.join('_') + '_',
                areaId: this.addmodel[2],
                userid: this.$store.state.user.userId,
                addressId: this.addressId
                
            }
          
            updateAddress(data).then(res => {
                this.validToast('操作成功')
            })
        }
    }
}
</script>
<style lang="less">
.z-page {
    .weui-switch:checked,
    .weui-switch-cp__input:checked~.weui-switch-cp__box {
        border-color: #f9261d;
        background-color: #f9261d;
    }
}
</style>