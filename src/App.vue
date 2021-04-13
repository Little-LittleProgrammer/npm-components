<template>
  <div id="app">
    <water-mark></water-mark>
    <div id="nav">
      <router-link to="/">下拉框</router-link> |
      <router-link to="/Table">表格</router-link> |
      <router-link to="/darg-to-recycle">拖拽致回收站</router-link> |
      <router-link to="/image-zoom">图片放大器</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import waterMark from '@/components/water-mark.vue'
export default {
  components: {waterMark}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
