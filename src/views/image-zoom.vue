<template>
  <div id="image">
  </div>
</template>

<script>
import Methods from '@/assets/js/tools'
export default {
  mounted() {
    this.init_image()
  },
  methods: {
    init_image() {
      var app = document.getElementById('image');
      Methods.imageZoom(app, '/img/timg.9fd1b2dc.jpg', 200, 200)
    }
  }
}
</script>

<style>

</style>