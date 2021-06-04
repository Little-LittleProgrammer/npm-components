<template>
  <qm-swiper swiperStyle="y" :imgList="imgList" :lunboTime="null" width="100%"></qm-swiper>
</template>

<script>
import QmSwiper from '@/components/qm-swiper-app/index';
export default {
    components: { QmSwiper },
    data() {
        return {
            imgList: [
                {key: 0, url: require('@/assets/images/swiper-app/1.jpeg')},
                {key: 1, url: require('@/assets/images/swiper-app/2.jpeg')},
                {key: 2, url: require('@/assets/images/swiper-app/3.jpeg')}
            ]
        };
    }
};
</script>

<style>

</style>
