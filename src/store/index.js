import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: '王三二',
        watermarkFlag: false
    },
    mutations: {
        SET_WATERMARK_FLAG(state, val) {
            state.watermarkFlag = val;
        }
    },
    actions: {
    },
    modules: {
    }
});
