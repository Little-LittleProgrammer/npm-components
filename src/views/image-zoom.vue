<template>
  <div class="img-container">
    <div id="image">
    </div>
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
      Methods.imageZoom(app, 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1936934555,1071348084&fm=26&gp=0.jpg', 200, 200)
    }
  }
}
</script>

<style>
.img-container {
  width: 400px;
  margin: 10px auto;
}
</style>