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
    <div class="z-cate-container">
      <div class="z-cate-box zflex-center zflex"
           v-for="items in cateSvgs">
        <div class="z-cate-item zflex1"
             v-for="item in items">
          <z-category :backcolor="item.backcolor"
                      :svgsrc="item.svgsrc"></z-category>
        </div>
      </div>
    </div>
    <!--分类圈圈结束-->
    <!--news开始-->
    <div class="z-box">
      <marquee></marquee>
    </div>
    <!--news结束-->
  </div>
</template>

<script>
import ZHeader from '@/components/common/ZHeader.vue'
import TfCarousel from '@/components/common/carousel.vue'
import ZCategory from './CategoryCircle.vue'
import Marquee from 'vux/src/components/marquee/marquee.vue'
import MarqueeItem from 'vux/src/components/marquee/marquee-item.vue'
export default {
  components: {
    ZHeader,
    TfCarousel,
    ZCategory,
    Marquee,
    MarqueeItem
  },
  data() {
    return {
      imgs: [],
      cateSvgs: [
        [{ backcolor: '#4da4d1', svgsrc: '#real-icon-jiadian' },
        { backcolor: '#ec633f', svgsrc: '#real-icon-iconfontdayinji' },
        { backcolor: '#f5ce33', svgsrc: '#real-icon-dianshang' },
        { backcolor: '#8dc52c', svgsrc: '#real-icon-shangmenfuwu' },
        { backcolor: '#f25a59', svgsrc: '#real-icon-shenghuofuwu' }],
        [{ backcolor: '#ce1c1a', svgsrc: '#real-icon-444' },
        { backcolor: '#4ddf74', svgsrc: '#real-icon-tongcheng' },
        { backcolor: '#8185a0', svgsrc: '#real-icon-xingyezixun' },
        { backcolor: '#e1b77d', svgsrc: '#real-icon-icon052' },
        { backcolor: '#c8c8c8', svgsrc: '#real-icon-quanbufenlei' }]
      ],
      news: [
        '我好像喜欢'
      ]
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
.z-cate-container{
  padding: 0 0.3rem 0.3rem;
  background-color: #fff;
}
.z-cate-box {
  padding-top: 0.3rem;
}
.z-box{
  padding: 0.15rem 0.2rem;
  background-color: #fff;
  margin-top: 0.18rem;
}
</style>
