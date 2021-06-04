<template>
  <div>
    <img v-if="a1" src="../assets/images/1.jpg" alt="">
    <img v-if="a2" src="../assets/images/2.jpg" alt="">
    <img v-if="a3" src="../assets/images/3.jpg" alt="">
    <img src="../assets/images/trash.jpg" alt="拖拽到此处以删除" title="拖拽到此处以删除">
  </div>
</template>

<script>
export default {
    data() {
        return {
            a1: true,
            a2: true,
            a3: true
        };
    },
    mounted() {
        this.init_dom();
    },
    methods: {
        init_dom() {
            const imgs = [...document.getElementsByTagName('img')];
            const trash = imgs.pop();
            // 为所有元素绑定事件按
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].ondragstart = function(e) {
                    console.log(e);
                    e.dataTransfer.setData('domId', i);
                };
            }
            // 丢弃到垃圾桶
            trash.ondrop = (e) => {
                const domId = 'a' + e.dataTransfer.getData('domId');
                console.log(domId);
                this[domId] = false;
            };
            // 让ondrop事件生效
            trash.ondragover = (e) => {
                e.preventDefault();
            };
        }
    }
};
</script>

<style lang="scss" scoped>
 img {
    width: 200px;
    height: 300px;
  }
</style>
