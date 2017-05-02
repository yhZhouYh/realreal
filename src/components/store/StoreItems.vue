<template>
    <div class="z-box store-items">
        <check-card :items="items" @checkItem="checkItem"></check-card>
        <service-item container=".z-store-detail"
                      v-for="item in serviceItems"
                      :item="item"
                      :key="item">
        </service-item>
          <blank v-if="!serviceItems.length"
                   :define="true">
                <div>暂无相关商品~</div>
            </blank>   
    </div>
</template>
<script>
    import ServiceItem from './ServiceItem'
    import CheckCard from './CheckCard'
    export default {
        props: ['items', 'serviceItems'],
        components: {
            ServiceItem,
            CheckCard
        },
        methods: {
            checkItem(item, index){
                this.$emit('checkItem', item, index)
            }
        }
    }
</script>
<style>

</style>