<template>
  <!--头部开始-->
  <div>
    <z-header :showArrow="false">
      <div slot="leftitems"
           style="color:#ea2a1d">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-zuobiao"></use>
        </svg>
      </div>
      <div slot="leftitems"
           style="font-size:14px;">
        南宁
      </div>
      <div slot="rightitems"
           style="margin-right: 5px;">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-search"></use>
        </svg>
        <p class="zheader-icon-word">搜索</p>
      </div>
      <div slot="rightitems">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-fabuxuqiuben01"></use>
        </svg>
        <p class="zheader-icon-word">需求</p>
      </div>
    </z-header>
    <!--头部结束-->
    <!--轮播开始-->
    <div class="z-carousel-box">
      <tf-carousel :imgs="imgs"
                   :delay="4000"></tf-carousel>
    </div>
    <!--轮播结束-->
    <!--分类圈圈开始-->
    <div class="z-cate-box zflex">
      <div class="z-cate-item zflex1">
        <z-category backcolor="#4da4d1" svgsrc="#real-icon-jiadian"></z-category>
      </div>
      <div class="z-cate-item zflex1">
        <z-category backcolor="#4da4d1" svgsrc="#real-icon-jiadian"></z-category>
      </div>
      <div class="z-cate-item zflex1">
        <z-category backcolor="#4da4d1" svgsrc="#real-icon-jiadian"></z-category>
      </div>
    </div>
    <!--分类圈圈结束-->
  </div>
</template>

<script>
import ZHeader from '@/components/common/ZHeader.vue'
import TfCarousel from '@/components/common/carousel.vue'
import ZCategory from './CategoryCircle.vue'
export default {
  components: {
    ZHeader,
    TfCarousel,
    ZCategory
  },
  data() {
    return {
      imgs: []
    }
  },
  created() {
    this.imgs = [{ url: require('../../assets/imgs/img1.jpg') },
    { url: require('../../assets/imgs/img2.jpg') },
    { url: require('../../assets/imgs/img3.jpg') },
    { url: require('../../assets/imgs/img4.jpg') }]
  }
}
</script>

<style>
.z-carousel-box {
  height: 3.85rem;
  margin-top: 0.85rem;
}
</style>
