import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: '王三二',
        watermarkFlag: false,
        routes: []
    },
    mutations: {
        SET_WATERMARK_FLAG(state, val) {
            state.watermarkFlag = val;
        },
        SET_ROUTES(state, val) {
            state.routes = val;
        }
    },
    actions: {
    },
    modules: {
    }
});
