<template>
    <div class="container" :class="containerWidth" :style="containerHeight">
        <div class="lunbo" @touchstart="touch_down">
            <img :style="containerHeight" v-for="item in imgList" :key="item.key" :src="item.url" alt="" @mousedown="(e) => e.preventDefault()">
        </div>
        <div class="desc">
            <span>{{index+1 + '/' + imgList.length}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: { // 容器宽度
            type: String || Number,
            default: '800'
        },
        // height: { // 容器高度
        //     type: String || Number,
        //     default: '600'
        // },
        lunboTime: { // 轮播时间 为null时，不轮播
            type: Number,
            default: 3000
        },
        imgList: { // 图片列表
            type: Array
        }
    },
    data() {
        return {
            index: 0, // 记录当前图片
            timebar: '', // 定时器
            boxs: '', // 轮播图的容器
            startX: 0, // 手指按下去的记录点
            endX: 0, // 手指松掉的记录点
            containerWidth: '', // 容器宽度值
            containerHeight: '' // 容器高度值
        };
    },
    watch: {
        imgList: {
            immediate: true,
            handler(val) {
                if (val.length !== 0) { // 初始化该初始化的值
                    this.$nextTick(() => {
                        this.container = document.querySelector('.container');
                        this.boxs = document.querySelector('.lunbo');
                        if (this.lunboTime !== null) {
                            this.start_time();
                        }
                    });
                }
            }
        },
        width: {
            immediate: true,
            handler(val) { // 根据传入的宽度，动态计算高度
                this.$nextTick(() => {
                    const _img = new Image();
                    _img.src = this.imgList[0].url;
                    if (val.indexOf('%') !== -1) {
                        const _data = val.replace('%', '');
                        this.containerWidth = 'w-p-' + _data;
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: (this.container.clientWidth * (e.path[0].height / 2) / (e.path[0].width / 2)) + 'rem'
                            };
                        };
                    } else {
                        this.containerWidth = 'w-' + val;
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: (this.container.clientWidth * e.path[0].height / e.path[0].width) / 2 + 'rem'
                            };
                        };
                    }
                });
            }
        }
    },
    methods: {
        // 定时器
        time_set(){
            this.index++;
            // 判断边界
            if (this.index >= this.imgList.length){
                this.index = 0;
            }
            this.animate_img();
        },
        // 开始轮播
        start_time() {
            if (this.lunboTime !== null) {
                this.timebar = setInterval(this.time_set, this.lunboTime);
            }
        },
        // 清除定时器
        clear_interval() {
            if (this.lunboTime !== null) {
                clearInterval(this.timebar);
            }
        },
        // 手指按下事件
        touch_down(e) {
            this.clear_interval(); // 清空定时器
            setTimeout(() => { // 防止点击穿透
                this.boxs.style.transition = 'none'; // 将动画清掉，以避免手指移动时卡顿
                this.startX = e.changedTouches[0].clientX; // 记录开始位置
                this.boxs.addEventListener('touchmove', this.touch_move); // 移动监听
                document.addEventListener('touchend', this.touch_up); // 手指谈起监听
            }, 100);
        },
        // 手指弹起弹起事件
        touch_up(e) {
            const _width = this.container.clientWidth;
            this.endX = e.changedTouches[0].clientX; // 记录最终位置
            this.boxs.style.transition = 'all .5s'; // 动画恢复
            if (this.endX - this.startX <= -(_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index++;
                if (this.index >= this.imgList.length){
                    this.index = this.imgList.length - 1;
                }
                this.animate_img(this.start_time);
            } else if (this.endX - this.startX >= (_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index--;
                if (this.index < 0){
                    this.index = 0;
                }
                this.animate_img(this.start_time);
            } else { // 如果小于，则恢复初始位置
                this.animate_img(this.start_time);
            }
            this.boxs.removeEventListener('touchmove', this.touch_move); // 移除手指移动事件
            document.removeEventListener('touchend', this.touch_up); // 移除手指弹起事件
        },
        touch_move(e) { // 手指移动事件，设置图片移动距离
            const _width = this.container.clientWidth;
            this.boxs.style.left = (-this.index * _width + e.changedTouches[0].clientX - this.startX) + 'rem';
        },
        animate_img(fn){ // 底部span切换
            const _width = this.container.clientWidth;
            this.boxs.style.left = (-this.index * _width) + 'rem';
            if (fn){
                fn();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@each $i in ('150', '200', '250', '300', '350', '400', '450', '500', '550', '600', '650', '700', '750', '800') {
    .w-#{$i} {
        width: unquote($i+rem);
    }
    .h-#{$i} {
        height: unquote($i+rem);
    }
}
@each $i in ('10', '20', '30', '40', '50', '60', '70', '80', '90', '100') {
    .w-p-#{$i} {
        width: unquote($i+'%');
    }
    .h-p-#{$i} {
        height: unquote($i+'%');
    }
}
.container{
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ccc;
    .lunbo{
        left: 0;
        transition: all .5s;
        background-color: #ccc;
        position: absolute;
        display: flex;
    }
    .desc {
        width: 36rem;
        height: 17rem;
        background-color: rgba(175, 175, 175, 0.7);
        position: absolute;
        z-index: 10;
        right: 10rem;
        bottom: 5rem;
        border-radius: 8rem;
        span {
            display: block;
            color: #fff;
            font-size: 12rem;
            font-weight: bold;
            line-height: 17rem;
        }
    }
}
</style>
