import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '父亲0',
            id: 'Home',
            pid: '0'
        }
    },
    {
        path: '/waterMark',
        name: 'WaterMark',
        meta: {
            title: '父亲1',
            id: 'waterMark',
            pid: '0'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/water-mark.vue')
    },
    {
        path: '/darg-to-recycle',
        name: 'DargToRecycle',
        meta: {
            id: 'DargToRecycle',
            pid: '0',
            title: '父亲2'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/darg-to-recycle.vue')
    },
    {
        path: '/image-zoom',
        name: 'ImageZoom',
        meta: {
            id: 'ImageZoom',
            pid: 'waterMark',
            title: '父亲1-孩子1'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/image-zoom.vue')
    },
    {
        path: '/skeleton',
        name: 'Skeleton',
        meta: {
            id: 'Skeleton',
            pid: 'ImageZoom',
            title: '父亲1-孩子1-孙子1'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/skeleton.vue')
    },
    {
        path: '/qm-swiper',
        name: 'QmSwiper',
        meta: {
            id: 'QmSwiper',
            pid: '0',
            title: '父亲3'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/qm-swiper/index.vue'),
        children: [
            {
                path: 'qm-swiper-pc',
                name: 'QmSwiperPC',
                meta: {
                    id: 'QmSwiperPC',
                    pid: 'QmSwiper',
                    title: '父亲3-孩子1'
                },
                component: () => import(/* webpackChunkName: "about" */ '../views/qm-swiper/qm-swiper.vue')
            },
            {
                path: 'qm-swiper-app',
                name: 'QmSwiperApp',
                meta: {
                    id: 'QmSwiperApp',
                    pid: 'QmSwiper',
                    title: '父亲3-孩子2'
                },
                component: () => import(/* webpackChunkName: "about" */ '../views/qm-swiper/qm-swiper-app.vue')
            }
        ]
    },
    {
        path: '/3d-house',
        name: '3dHouse',
        meta: {
            id: '3dHouse',
            pid: '0',
            title: '父亲4'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/3d-house.vue')
    }
];

store.commit('SET_ROUTES', routes);
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
