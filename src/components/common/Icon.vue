<template>
    <svg class="zicon zheader-icon" :class="{zflex: vertical}" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
    export default{
        props: {
            icon: {
                type: String
            },
            vertical: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            iconName () {
                return '#' + this.icon
            }
        }
    }
</script>
<style>

</style>