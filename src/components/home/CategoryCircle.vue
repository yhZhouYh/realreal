<template>
    <a class="z-category-circle zflex zflex-center"
         :style="{background: backcolor}">
        <svg class="zicon zheader-icon"
             aria-hidden="true">
            <use v-bind:xlink:href="svgsrc"></use>
        </svg>
    </a>
</template>
<script>
export default {
    props: ['backcolor', 'svgsrc']
}
</script>
<style lang="less">
.z-category-circle {
    width: 0.8rem;
    height: 0.8rem;
    .zicon{
        display: block;
    }
}
</style>