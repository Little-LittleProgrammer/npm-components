<template>
  <div id="app" v-cloak>
    <q-page-watermark name="王叁贰" size="20px" gap="150">
      <template slot="content">
        <div class="nav-container">
          <div class="nav-left">
            <img src="./assets/images/logo.png" alt="" >
          </div>
          <div id="nav">
            <router-link to="/">下拉框</router-link> |
            <router-link to="/waterMark">水印图</router-link> |
            <router-link to="/darg-to-recycle">拖拽致回收站</router-link> |
            <router-link :to="{path:'/image-zoom',query: {name: '图片放大器'}}">图片放大器</router-link> |
            <router-link to="/skeleton">骨架屏</router-link> |
            <router-link to="/qm-swiper">轮播图</router-link>
          </div>
        </div>
        <div class="header">
           <breadcrumb :routes="$store.state.routes"></breadcrumb>
        </div>
        <router-view/>
      </template>
    </q-page-watermark>
  </div>
</template>

<script>
import QPageWatermark from '@/components/q-page-watermark/index.vue';
import breadcrumb from '@/components/breadcrumb';
export default {
    components: {QPageWatermark, breadcrumb}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
[v-cloak]{
    display: none;
}

.nav-container {
  background-color: slateblue;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-left {
    width: 100px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
  #nav {
    flex: 1;
    padding: 20px;

    a {
      font-weight: bold;
      color: white;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
.header {
  border: 1px solid #e8e8e8;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}

@media screen and ( max-width: 375px) {
  html {
    font-size: 0.26666vw;
  }
}
</style>
