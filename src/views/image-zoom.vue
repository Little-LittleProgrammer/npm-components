<template>
  <div class="img-container">
    <div id="image">
    </div>
  </div>

</template>

<script>
import Methods from '@/assets/js/tools';
export default {
    mounted() {
        this.init_image();
    },
    methods: {
        init_image() {
            var app = document.getElementById('image');
            Methods.imageZoom(app, require('../assets/images/forbidden.jpg'), 200, 200);
        }
    }
};
</script>

<style lang="scss" scoped>
.img-container {
  width: 400px;
  margin: 10px auto;
}
</style>
