<template>
    <div class="z-box store-items">
        <check-card :items="items"></check-card>
        <service-item container=".z-store-detail"
                      v-for="item in serviceItems"
                      :item="item"
                      :key="item">
        </service-item>
    
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
        }
    }
</script>
<style>

</style>