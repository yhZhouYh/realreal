<template>
    <div class="z-page z-address-manage">
        <z-header :showBack="true"
                  backWords=""
                  title="订单详情">
        </z-header>
        <div class="z-container">
            <addressItem :addressLists="addressLists"
                         @checkaddress="checkaddress(item)"></addressItem>
            <div class="button-box login-button-box"
                 v-if="$route.query.isManage || !addressLists.length">
                <x-button @click.native="addAddress">添加地址</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
export default{
    components: {
        ZHeader
    }
}
</script>
<style>
</style>