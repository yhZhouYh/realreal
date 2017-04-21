<template>
    <div class="z-page z-apply">
         <z-header :showBack="true"
                  backWords=""
                  title="申请入驻">
        </z-header>
        <div class="z-container">
            <group>
                <x-input title="店铺名称" required placeholder="请输入您的店铺名称"></x-input>
                <x-input title="公司名称" required placeholder="请输入您的公司名称"></x-input>
                <x-input title="联系人姓名" required placeholder="请输入联系人姓名"></x-input>
                <x-input type="number" is-type="china-mobile" title="联系人电话" required placeholder="请输入联系人手机号码"></x-input>
                <x-address :list="address" title="联系地址"></x-address>
            </group>
        </div>
    </div>
</template>
<script>
    import ZHeader from '@/components/common/ZHeader.vue'
    import XInput from 'vux/src/components/X-input'
    import {getArea} from '../../api'
    import XAddress from 'vux/src/components/x-address'
    // import {ChinaAddressV3Data} from 'vux'
    export default { 
        name: 'apply',
        components: {
            ZHeader,
            XInput,
            XAddress
        },
        data () {
            return {
                address : []
            }
        },
        created () {
            getArea().then(res => {
                console.log(res)
            })
        }
    }
</script>
<style>

</style>