<template>
    <div class="z-categroty-contianer">
        <router-link :to="url" class="z-category-circle zflex zflex-center"
           :style="{background: backcolor}">
            <svg class="zicon zheader-icon"
                 aria-hidden="true">
                <use v-bind:xlink:href="svgsrc"></use>
            </svg>
        </router-link>
        <p>{{categoryname}}</p>
    </div>
</template>
<script>
export default {
    props: ['backcolor', 'svgsrc', 'categoryname', 'cid', 'url']
}
</script>
<style lang="less">
.z-categroty-contianer{
    font-size: 13px;
    text-align: center;
}
.z-category-circle {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    margin: auto;
    .zicon {
        display: block;
        color: #fff;
    }
}
</style>