import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table',
    name: 'Table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/demo-table.vue')
  },
  {
    path: '/big-select',
    name: 'BigSelect',
    component: () => import(/* webpackChunkName: "about" */ '../views/big-select.vue')
  },
  {
    path: '/darg-to-recycle',
    name: 'DargToRecycle',
    component: () => import(/* webpackChunkName: "about" */ '../views/darg-to-recycle.vue')
  },
  {
    path: '/image-zoom',
    name: 'ImageZoom',
    component: () => import(/* webpackChunkName: "about" */ '../views/image-zoom.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = '测试';
  store.commit('SET_WATERMARK_FLAG', false);
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    store.commit('SET_WATERMARK_FLAG', true);
  },100)
  // document.title = to.meta.title
  // next()
});

export default router
