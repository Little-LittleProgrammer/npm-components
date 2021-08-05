import QPageWatermark from './index.vue';

// 为组件添加 install 方法，用于按需引入
QPageWatermark.install = function(Vue) {
    Vue.component(QPageWatermark.name, QPageWatermark);
};

export default QPageWatermark;
