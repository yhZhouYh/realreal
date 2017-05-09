<template>
    <div class="z-page z-apply">
        <z-header :showBack="true"
                  backWords=""
                  title="申请入驻">
        </z-header>
        <div class="z-container">
            <group v-if="$route.query.store">
                <x-input title="店铺名称"
                         required
                         placeholder="请输入您的店铺名称"
                         v-model="shopName"></x-input>
                <x-input title="公司名称"
                         required
                         placeholder="请输入您的公司名称"
                         v-model="companyName"></x-input>
                <x-input title="联系姓名"
                         required
                         placeholder="请输入联系人姓名"
                         v-model="contactName"></x-input>
                <x-input type="number"
                         is-type="china-mobile"
                         title="联系电话"
                         required
                         placeholder="请输入联系人手机号码"
                         v-model="contactPhone"></x-input>
                <x-address :list="addressData"
                           :class="{'weui-cell_warn': !addmodel.length}"
                           title="联系地址"
                           v-model="addmodel"
                           value-text-align="left"></x-address>
                <x-input title="详细地址"
                         required
                         placeholder="请输入详细地址"
                         v-model="address"></x-input>
                <x-input title="营业执照"
                         required
                         placeholder="请输入营业执照号码"
                         v-model="businessLicence"></x-input>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !businessLicenceImgurl}">营业执照电子照</div>
    
                    <div class="weui-uploader__input-box"
                         :class="{hasphoto: businessLicenceImgurl}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+businessLicenceImgurl+')'}">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event, 'businessLicenceImgurl')">
                    </div>
                </cell>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !OrganizationCodeImgurl}">组织机构代码证</div>
    
                    <div class="weui-uploader__input-box"
                         :class="{hasphoto: OrganizationCodeImgurl}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+OrganizationCodeImgurl+')'}">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event, 'OrganizationCodeImgurl')">
                    </div>
                </cell>
                <x-input title="银行开户行"
                         required
                         placeholder="请输入银行开户行"
                         v-model="bankUserName"></x-input>
                <x-input title="个人银行账号"
                         type="number"
                         required
                         placeholder="请输入个人银行账号"
                         v-model="bankAccount"></x-input>
                <x-input title="开户银行支行名称"
                         required
                         placeholder="请输入开户银行支行名称"
                         v-model="bankId"></x-input>
            </group>
            <group v-else>
                <x-input title="店铺名称"
                         required
                         placeholder="请输入您的店铺名称"
                         v-model="shopName"></x-input>
                <x-input title="公司名称"
                         required
                         placeholder="请输入您的公司名称"
                         v-model="companyName"></x-input>
                <x-input title="联系姓名"
                         required
                         placeholder="请输入联系人姓名"
                         v-model="contactName"></x-input>
                <x-input type="number"
                         is-type="china-mobile"
                         title="联系电话"
                         required
                         placeholder="请输入联系人手机号码"
                         v-model="contactPhone"></x-input>
                <x-address :list="addressData"
                           :class="{'weui-cell_warn': !addmodel.length}"
                           title="联系地址"
                           v-model="addmodel"
                           value-text-align="left"></x-address>
                <x-input title="详细地址"
                         required
                         placeholder="请输入详细地址"
                         v-model="address"></x-input>
                <x-input title="身份证号"
                         required
                         placeholder="请输入身份证号"
                         v-model="idCart"></x-input>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !cartImgZ}">身份证正面</div>
    
                    <div class="weui-uploader__input-box"
                         :class="{hasphoto: cartImgZ}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+cartImgZ+')'}">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event, 'cartImgZ')">
                    </div>
                </cell>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !cartImgF}">身份证反面</div>
    
                    <div class="weui-uploader__input-box"
                         :class="{hasphoto: cartImgF}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+cartImgF+')'}">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event, 'cartImgF')">
                    </div>
                </cell>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !qualificationsImg}">资质证明书</div>
    
                    <div class="weui-uploader__input-box"
                         :class="{hasphoto: qualificationsImg}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+qualificationsImg+')'}">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event, 'qualificationsImg')">
                    </div>
                </cell>
                <x-input title="银行开户行"
                         required
                         placeholder="请输入银行开户行"
                         v-model="bankUserName"></x-input>
                <x-input title="个人银行账号"
                         type="number"
                         required
                         placeholder="请输入个人银行账号"
                         v-model="bankAccount"></x-input>
                <x-input title="开户银行支行名称"
                         required
                         placeholder="请输入开户银行支行名称"
                         v-model="bankId"></x-input>
            </group>
            <div class="apply-checker">
                <checker>
                    <a slot="middle">我同意<span>《正证网入驻协议》</span></a>
                </checker>
            </div>
            <!--<div class="login-button-box">
                <x-button class="login-button"
                          @click.native="user">我是维修员</x-button>
            </div>-->

            <div class="login-button-box">
                <x-button class="login-button"
                          @click.native="apply">确认提交</x-button>
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
import { getArea, apply, uploader } from '../../api'
import XAddress from 'vux/src/components/x-address'
//import vueArea from '@/components/common/Picker'
import { ChinaAddressV3Data } from 'vux'
import checker from '../cart/CheckBox'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
export default {
    name: 'apply',
    components: {
        ZHeader,
        XInput,
        XAddress,
        checker,
        XButton,
        Toast
        // vueArea
    },
    data() {
        return {
            addressData: ChinaAddressV3Data,
            addmodel: [],
            companyName: '',
            contactName: '',
            contactPhone: '',
            businessLicence: '',
            address: '',
            businessLicenceImgurl: '',
            OrganizationCodeImgurl: '',
            bankUserName: '',
            bankAccount: '',
            bankId: '',
            shopName: '',
            toastText: '',
            showToast: false,
            cartImgZ: '',
            cartImgF: '',
            qualificationsImg: '',
            idCart: ''
        }
    },
    methods: {
        apply() {
            let dataobj = {
                userid: this.$store.state.user.userId,
                type: this.$route.query.store ? 1 : 2,
                shopName: this.shopName,
                companyName: this.companyName,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                provinceId: this.addmodel[0],
                cityId: this.addmodel[1],
                countyId: this.addmodel[2],
                address: this.address,
                businessLicence: this.businessLicence,
                businessLicenceImgurl: this.businessLicenceImgurl,
                OrganizationCodeImgurl: this.OrganizationCodeImgurl,
                bankUserName: this.bankUserName,
                bankAccount: this.bankAccount,
                bankId: this.bankId,
                idCart: this.idCart,
                cartImgZ: this.cartImgZ,
                cartImgF: this.cartImgF,
                qualificationsImg: this.qualificationsImg
            }
            if (this.contactName && this.contactPhone && this.address && this.bankUserName && this.bankAccount && this.bankId && this.shopName && this.addmodel.length) {
                apply(dataobj).then(res => {
                    this.validToast('申请成功，等待审核')
                })
            } else {
                this.validToast('请完善资料')
            }

        },
        validToast(text) {
            // debugger
            this.toastText = text
            this.showToast = true
        },
        uploader(e, i) {
            this.$store.dispatch('changeLoading')
            const file = e.target.files[0]
            const reader = new FileReader()
            let src = ''
            let url = window.URL || window.webkitURL
            if (url) {
                src = url.createObjectURL(file)
            } else {
                src = e.target.result
            }
            let _this = this
            reader.onload = (event) => {
                uploader({ upfile: event.target.result, type: 'users' }).then(photo => {
                    _this.$store.state.loading = false
                    _this[i] = photo
                })
            }
            reader.readAsDataURL(file)
        }

    }
}
</script>
<style lang="less">
.weui-cell_access {
    .weui-label {
        width: 5em;
    }
}

.weui-uploader__input-box:active {
    border-color: #999999;
}

.weui-uploader__input-box {
    position: relative;
    width: 77px;
    height: 77px;
    border: 1px solid #D9D9D9;
    background: no-repeat center center;
    background-size: cover;
}

.weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: no-repeat center center;
    background-size: cover;
}

.weui-uploader__input-box.hasphoto:before {
    width: 0;
    height: 0;
}

.weui-uploader__input-box.hasphoto:after {
    width: 0;
    height: 0;
}

.weui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
}

.weui-uploader__input-box:before,
.weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
}

.weui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
}

.weui-uploader__input-box:before,
.weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
}

.weui-uploader__file {
    margin-right: 9px;
    margin-bottom: 9px;
    width: 79px;
    height: 79px;
    background: no-repeat center center;
    background-size: cover;
}

.apply-checker {
    padding: 0.3rem 0.2rem;
    font-size: 0.25rem;
    .zheader-icon {
        font-size: 0.3rem;
    }
    .checkbox-miidle {
        padding-left: 0.1rem;
    }
}

.v-transfer-dom .vux-popup-picker-header {
    color: #E64340;
}
.z-apply{
    .login-button{
        border-radius: 0;
        margin-bottom: 1.5rem;
    }
}
</style>