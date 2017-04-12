<template>
    <svg class="zicon zheader-icon" :class="{zflex: vertical}" aria-hidden="true" :style="{marginRight: margin}">
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
            },
            horizon: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            iconName () {
                return '#' + this.icon
            },
            margin () {
                if(this.horizon){
                    return '10px'
                }
            }
        }
    }
</script>
<style>

</style>