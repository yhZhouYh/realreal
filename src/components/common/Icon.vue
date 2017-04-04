<template>
    <svg class="zicon zheader-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
    export default{
        props: ['icon'],
        computed: {
            iconName () {
                return '#' + this.icon
            }
        }
    }
</script>
<style>

</style>