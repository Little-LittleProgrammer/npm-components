import QLoading from './index.vue';

// 为组件添加 install 方法，用于按需引入
QLoading.install = function(Vue) {
    Vue.component(QLoading.name, QLoading);
};

export default QLoading;
