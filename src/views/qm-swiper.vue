<template>
  <qm-swiper swiperStyle="y" :imgList="imgList" width="800"></qm-swiper>
</template>

<script>
import QmSwiper from '@/components/qm-swiper/index'
export default {
    components: { QmSwiper },
    data() {
        return {
            imgList: [
                {key:0, url: require('@/assets/images/switper/1.jpg')},
                {key:1, url: require('@/assets/images/switper/2.jpeg')},
                {key:2, url: require('@/assets/images/switper/3.jpeg')},
                {key:3, url: require('@/assets/images/switper/4.jpg')},
                {key:4, url: require('@/assets/images/switper/5.jpeg')},
            ],
        }
    }
}
</script>

<style>

</style>