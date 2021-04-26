<template>
    <div class="container" :class="containerWidth" :style="containerHeight">
        <div class="lunbo" @mousedown="mouse_down" @mousewheel="mouse_wheel">
            <img :style="containerHeight" v-for="item in imgList" :key="item.key" :src="item.url" alt="" @mousedown="(e) => e.preventDefault()">
        </div>
        <span class="left" @click="left">
            <iconLeftArrow/>
        </span>
        <span class="right" @click="right">
            <iconRightArrow/>
        </span>
        <div class="smallBtn" @click="change_img">
            <span v-for="item in imgList" :key="item.key" :id="item.key"></span>
        </div>
    </div>
</template>

<script>
import iconLeftArrow from '@/components/vue-icon/icon-left-arrow'
import iconRightArrow from '@/components/vue-icon/icon-right-arrow'
export default {
    components: { iconLeftArrow, iconRightArrow },
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
            smallBtn: '', // 小圆点的容器
            startX:0, // 鼠标按下去的记录点
            endX:0, // 鼠标松掉的记录点
            containerWidth: '', // 容器宽度值
            containerHeight: '' // 容器高度值
        }
    },
    watch: {
        imgList: {
            immediate: true,
            handler(val) {
                if ( val.length !== 0 ) { // 初始化该初始化的值
                    this.$nextTick(() => {
                        this.container = document.querySelector('.container')
                        this.boxs = document.querySelector('.lunbo')
                        this.smallBtn = document.querySelectorAll('.smallBtn span')
                        console.log(this.smallBtn)
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
            handler(val) { // 根据传入的宽度，动态计算高度
                this.$nextTick(() => {
                    let _img = new Image()
                    _img.src = this.imgList[0].url
                    if(val.indexOf('%') !== -1) {
                        const _data = val.replace('%', '')
                        this.containerWidth = 'w-p-' + _data
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: ( this.container.clientWidth * e.path[0].height / e.path[0].width) + 'px'
                            } 
                        }
                    } else {
                        this.containerWidth = 'w-' + val;
                        _img.onload = (e) => {
                            this.containerHeight = {
                                height: ( this.container.clientWidth * e.path[0].height / e.path[0].width) + 'px'
                            } 
                        }
                    }
                })
                
            }
        },
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
        // 滚轮监听事件
        mouse_wheel(e) {
            if (e.wheelDelta > 0) {
                this.right()
            } else if (e.wheelDelta < 0) {
                this.left()
            }
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
        // 鼠标按下事件
        mouse_down(e) {
            this.clear_interval() // 清空定时器
            this.boxs.style.transition = 'none' // 将动画清掉，以避免鼠标移动时卡顿
            this.startX = e.clientX; // 记录开始位置
            this.boxs.addEventListener('mousemove', this.mouse_move); // 移动监听
            document.addEventListener('mouseup', this.mouse_up); // 鼠标谈起监听
        },
        // 鼠标弹起事件
        mouse_up(e) { 
            const _width = this.container.clientWidth
            this.endX = e.clientX; // 记录最终位置
            this.boxs.style.transition = 'all .5s' // 动画恢复
            if (this.endX - this.startX <= -(_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index++;
                if(this.index >= this.imgList.length){
                    this.index = this.imgList.length - 1;
                }
                this.animate_img(this.start_time)
            } else if (this.endX - this.startX >= (_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.index--;
                if(this.index < 0){
                    this.index = 0;
                }
                this.animate_img(this.start_time)
            } else { // 如果小于，则恢复初始位置
                this.animate_img(this.start_time)
            }
            this.boxs.removeEventListener('mousemove', this.mouse_move); // 移除鼠标移动事件
            document.removeEventListener('mouseup', this.mouse_up); // 移除鼠标弹起事件
        },
        mouse_move(e) { // 鼠标移动事件，设置图片移动距离
            const _width = this.container.clientWidth
            this.boxs.style.left = (-this.index * _width + e.clientX - this.startX) + 'px';
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
            const _width = this.container.clientWidth
            this.boxs.style.left = (-this.index * _width) + 'px';
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
        width: unquote($i+px);
    }
    .h-#{$i} {
        height: unquote($i+px);
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
    .left,
    .right{
        width: 40px;
        height: 100%;
        position:absolute;
        text-align: center;
        display: flex;
        align-items: center;
        transition: all .3s;
    }
    .right{
        right: 0px;
    }
    .left:hover,
    .right:hover {
        background-color:rgba(0, 0, 0, 0.5);
    }
    .smallBtn{
        position:absolute;
        bottom: 10px;
        left: 10%;
        right: 10%;
        height: 30px;
        text-align: center;
        span{
            display:inline-block;
            cursor: pointer;
            width: 12px;
            height: 12px;
            line-height: 30px;
            background-color: #ccc;
            border-radius: 50%;
            margin-right: 10px;
        }
        .choose{
            background-color: #f00;
        }
    }
}
</style>