<template>
    <div class="z-page z-address-manage">
         <z-header :showBack="true"
                  backWords=""
                  title="地址管理">
        </z-header>
        <div class="z-container">
            <addressItem></addressItem>
        </div>
    </div>
</template>
<script>
    import ZHeader from '@/components/common/ZHeader.vue'
    import AddressItem from './AddressItem'
    export default {
        name:'addressManage',
        components: {
            ZHeader,
            AddressItem
        }
    }
</script>
<style> 

</style>