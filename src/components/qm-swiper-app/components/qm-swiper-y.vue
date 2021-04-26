<template>
    <div class="container" :class="containerWidth" :style="containerHeight">
        <div class="lunbo" @touchstart="touch_down">
            <img :style="containerHeight" v-for="item in imgList" :key="item.key" :src="item.url" alt="" @mousedown="(e) => e.preventDefault()">
        </div>
        <div class="smallBtn" @click="change_img">
            <span v-for="item in imgList" :key="item.key" :id="item.key"></span>
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
            index: 0,
            timebar: '',
            boxs: '',
            smallBtn: '',
            startY:0,
            endY:0,
            containerWidth: '',
            containerHeight: ''
        }
    },
    watch: {
        imgList: {
            immediate: true,
            handler(val) {
                if ( val.length !== 0 ) {
                    this.$nextTick(() => {
                        this.container = document.querySelector('.container')
                        this.boxs = document.querySelector('.lunbo')
                        this.smallBtn = document.querySelectorAll('.smallBtn span')
                        this.smallBtn[0].setAttribute('class','choose')
                        if (this.lunboTime !== null) {
                            this.start_time()
                        } 
                    })
                }
            }
        },
        width: {
            immediate:true,
            handler(val) {
                this.$nextTick(() => {
                    let _img = new Image()
                    _img.src = this.imgList[0].url
                    if(val.indexOf('%') !== -1) {
                        const _data = val.replace('%', '')
                        this.containerWidth = 'w-p-' + _data
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: ( this.container.clientWidth * e.path[0].height / e.path[0].width) + 'rem'
                            } 
                        }
                    } else {
                        this.containerWidth = 'w-' + val;
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: ( this.container.clientWidth * e.path[0].height / e.path[0].width) + 'rem'
                            } 
                        }
                    }
                })
                
            }
        },
        // height: {
        //     immediate:true,
        //     handler(val) {
        //         if(val.indexOf('%') !== -1) {
        //             const _data = val.replace('%', '')
        //             this.containerHeight = 'h-p-' + _data
        //         } else {
        //             this.containerHeight = 'h-' + val
        //         }
        //     }
        // },
    },
    methods: {
        // 定时器
        time_set(){
            this.index++
            // 判断边界
            if(this.index >= this.imgList.length){
                this.index =0;
            }
            this.animate_img();
        },
        // 开始轮播
        start_time() {
            if (this.lunboTime !== null) {
                this.timebar= setInterval(this.time_set, this.lunboTime);
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
            this.clear_interval() // 清空定时器
            this.boxs.style.transition = 'none' // 将动画清掉，以避免手指移动时卡顿
            this.startY = e.changedTouches[0].clientY; // 记录开始位置
            this.boxs.addEventListener('touchmove', this.touch_move); // 移动监听
            document.addEventListener('touchend', this.touch_up); // 手指谈起监听
        },
        // 手指弹起事件
        touch_up(e) {
            const _height = this.container.clientHeight
            this.endY = e.changedTouches[0].clientY; // 记录最终位置
            this.boxs.style.transition = 'all .5s' // 动画恢复
            if (this.endY - this.startY <= -(_height / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index++;
                if(this.index >= this.imgList.length){
                    this.index = this.imgList.length - 1;
                }
                this.animate_img(this.start_time)
            } else if (this.endY - this.startY >= (_height / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index--;
                if(this.index < 0){
                    this.index = 0;
                }
                this.animate_img(this.start_time)
            } else { // 如果小于，则恢复初始位置
                this.animate_img(this.start_time)
            }
            this.boxs.removeEventListener('touchmove', this.touch_move); // 移除手指移动事件
            document.removeEventListener('touchup', this.touch_up); // 移除手指弹起事件
        },
        touch_move(e) { // 手指移动事件，设置图片移动距离
            const _height = this.container.clientHeight
            this.boxs.style.top = (-this.index * _height + e.changedTouches[0].clientY - this.startY) + 'rem';
        },
        left(){ // 左箭头点击事件
            // 关闭定时器
            this.clear_interval()
            this.index--;
            if(this.index < 0){
                this.index = this.imgList.length - 1;
            }
            // 轮播方法，参数为定时器名称
            this.animate_img(this.start_time)
        },
        right(){ // 右箭头点击事件
            // 关闭定时器
            this.clear_interval()
            this.index++;
            if(this.index >= this.imgList.length){
                this.index = 0;
            }
            this.animate_img(this.start_time)
        },
        animate_img(fn){ // 底部span切换
            const _height = this.container.clientHeight
            this.boxs.style.top = (-this.index * _height) + 'rem';
            for (let i = 0; i < this.smallBtn.length; i++) {
                if (i === +this.index) {
                    this.smallBtn[i].setAttribute('class','choose')
                } else {
                    this.smallBtn[i].setAttribute('class', '')
                }
            }
            if(fn){
                fn()
            }
        },
        change_img(e) { // 点击底部span的回调，使用事件委托
            if (e.target.id !=='') {
                // 关闭定时器
                this.clear_interval()
                this.index = e.target.id;
                this.animate_img(this.start_time)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@each $i in ('300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000') {
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
        top: 0;
        transition: all .5s;
        background-color: #ccc;
        position: absolute;
        img {
            width: 100%;
        }
    }
    .smallBtn{
        position:absolute;
        right: 5rem;
        top: 10%;
        bottom: 10%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span{
            display:block;
            cursor: pointer;
            width: 6rem;
            height: 6rem;
            line-height: 30rem;
            background-color: #ccc;
            border-radius: 50%;
            margin-top: 5rem;
        }
        .choose{
            background-color: #f00;
        }
    }
}
</style>