<template>
    <a href="javascript:;"class="z-store-item" v-touch-ripple>
        <!--<div class="store-img back-img"
             :style="{backgroundImage:'url('+item.shopImg+')'}"></div>-->
             <img class="store-img back-img" :src="item.shopImg"></img>
        <div class="store-desc">
            <p>{{item.shopName}}</p>
            <div class="zflex gray storeSale">
                <span class="zflex1">已接单{{item.sale}}</span>
                <!--<span>已接单{{item.sale}}</span>-->
            </div>
        </div>
    </a>
</template>a
<script>
export default {
    props: ['item']
}
</script>
<style lang="less">
.z-store-item {
    width: 49.5%;
    background: #fff;
    float: left;
    margin: 0 1% 1% 0;
    &:nth-child(even) {
        margin-right: 0;
    }
}

.store-img {
    height: 3.45rem;
    width: 100%;
}

.back-img {
    background-position: center center;
    background-size: cover;
}

.store-desc {
    padding: 0.2rem;
}
.storeSale{
    font-size: 0.23rem;
}
</style>