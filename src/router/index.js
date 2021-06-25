import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/waterMark',
        name: 'WaterMark',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/water-mark.vue')
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
    {
        path: '/skeleton',
        name: 'Skeleton',
        component: () => import(/* webpackChunkName: "about" */ '../views/skeleton.vue')
    },
    {
        path: '/qm-swiper',
        name: 'QmSwiper',
        component: () => import(/* webpackChunkName: "about" */ '../views/qm-swiper.vue')
    },
    {
        path: '/qm-swiper-app',
        name: 'QmSwiperApp',
        component: () => import(/* webpackChunkName: "about" */ '../views/qm-swiper-app.vue')
    },
    {
        path: '/3d-house',
        name: '3dHouse',
        component: () => import(/* webpackChunkName: "about" */ '../views/3d-house.vue')
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    document.title = '测试';
    store.commit('SET_WATERMARK_FLAG', false);
    next();
});

router.afterEach(() => {
    setTimeout(() => {
        store.commit('SET_WATERMARK_FLAG', true);
    }, 100);
    // document.title = to.meta.title
    // next()
});

export default router;
