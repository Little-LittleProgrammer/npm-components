<template>
  <div>
      <template v-if="swiperStyle === 'x'">
          <qm-Swiper-x :imgList="imgList" :lunboTime="lunboTime" :width="width"></qm-Swiper-x>
      </template>
      <template v-else-if="swiperStyle === 'y'">
          <qm-Swiper-y :imgList="imgList" :lunboTime="lunboTime" :width="width"></qm-Swiper-y>
      </template>
  </div>
</template>

<script>
import QmSwiperX from '@/components/qm-swiper-app/components/qm-swiper-x'
import QmSwiperY from '@/components/qm-swiper-app/components/qm-swiper-y'
export default {
    components: { QmSwiperX, QmSwiperY },
    props: {
        swiperStyle: { // 轮播模式：x竖着轮播，y横着轮播
            type: String,
            default: 'x'
        },
        width: { // 容器宽度
            type: String || Number,
            default: '800' 
        },
        // height: { // 容器高度
        //     type: String || Number,
        //     default: '600'
        // },
        lunboTime: { // 轮播时间 为null时，不轮播
            type: Number,
            default: 3000
        },
        imgList: { // 图片列表
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>

</style>