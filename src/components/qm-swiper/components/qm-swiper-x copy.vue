<template>
    <div class="movie-container">
        <div class="container" :class="containerWidth" :style="containerHeight">
            <div class="lunbo" :class="containerWidth" @mousedown="mouse_down" @mousewheel="mouse_wheel" :style="containerHeight">
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
    </div>
</template>

<script>
import iconLeftArrow from '@/components/vue-icon/icon-left-arrow'
import iconRightArrow from '@/components/vue-icon/icon-right-arrow'
import methods from '@/assets/js/tools'
export default {
    components: { iconLeftArrow, iconRightArrow },
    props: {
        width: { // 容器宽度
            type: String || Number,
        },
        lunboTime: { // 轮播时间 为null时，不轮播
            type: Number,
        },
        imgList: { // 图片列表
            type: Array
        },
        lunboType: { // 展示模式 defalut，正常模式，movie：电影院模式
            type: String,
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
            containerHeight: '', // 容器高度值,
            zIndex:2 // 设置图片的zIndex
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
                        this.smallBtn[0].setAttribute('class','choose')
                        if (this.lunboTime !== null) {
                            this.start_time()
                        }
                        if (this.lunboType === 'moive') { // 设置最外层容器为父元素宽度
                            const $movieContaner = document.querySelector('.movie-container')
                            methods.css($movieContaner, {
                                width: '100%',
                                overflow:'hidden'
                            })
                            methods.css(this.container, { // 设置container为溢出显示
                                backgroundColor: 'transparent',
                                overflow: 'visible'
                            })
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
                    let _width = 0
                    if(val.indexOf('%') !== -1) { // 当传入的宽度为百分比
                        const _data = val.replace('%', '')
                        this.containerWidth = 'w-p-' + _data 
                        _width = this.container.clientWidth * _data / 100
                    } else { // 当传入的宽度为数字
                        this.containerWidth = 'w-' + val;
                        _width = val
                    }
                    this.imgList.forEach((item, index) => { // 初始化图片顺序
                        if (index !== 0) {
                            methods.css(this.boxs.children[index], {
                                transform: `translateX(${_width}px) translateZ(-1000px)`,
                            })
                        }
                    })
                    methods.css(this.boxs.children[this.imgList.length-1], { // 初始化图片顺序
                        transform: `translateX(${-_width}px) translateZ(-1000px)`,
                    })
                    _img.onload = (e) => { // 设置container容器的高度，高度为图片的等比比例
                        this.containerHeight = {
                            height: ( this.container.clientWidth * e.path[0].height / e.path[0].width) + 'px'
                        } 
                    }
                })
                
            }
        },
    },
    methods: {
        // 定时器
        time_set(){
            this.animate_img(null, 'right');
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
            methods.css(this.boxs, {
                transition: 'none',
            }) // 将动画清掉，以避免鼠标移动时卡顿
            this.startX = e.clientX; // 记录开始位置
            document.addEventListener('mouseup', this.mouse_up); // 鼠标谈起监听
        },
        // 鼠标弹起事件
        mouse_up(e) { 
            const _width = this.container.clientWidth
            this.endX = e.clientX; // 记录最终位置
            methods.css(this.boxs, {
                transition: 'all .5s',
            }) // 动画恢复
            if (this.endX - this.startX <= -(_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.animate_img(this.start_time, 'left')
            } else if (this.endX - this.startX >= (_width / 2)) { // 如果最终位置-开始位置大于图片的一半，则切换图片
                this.animate_img(this.start_time, 'right')
            } 
            document.removeEventListener('mouseup', this.mouse_up); // 移除鼠标弹起事件
        },
        left(){ // 左箭头点击事件
            // 关闭定时器
            this.clear_interval()
            // 轮播方法，参数为定时器名称
            this.animate_img(this.start_time, 'left')
        },
        right(){ // 右箭头点击事件
            // 关闭定时器
            this.clear_interval()
            this.animate_img(this.start_time, 'right')
        },
        animate_img(fn, type){ // 动画切换
            let _width = this.container.clientWidth
            let _idx = 0
            if (type === 'left') { // 当为左边滚动时
                _width = -_width
                methods.css(this.boxs.children[this.index], { // 设置上一张图片向右
                    zIndex: (this.zIndex-1) + '', // 设置zINdex值为第二大
                    transform: `translateX(${-_width}px)`, // 移动
                })
                this.index--
                if(this.index < 0){ // 边界判断
                    this.index = this.imgList.length - 1;
                }
                _idx = this.index === 0 ? this.imgList.length - 1 : this.index-1
            } else if (type === 'right') {
                methods.css(this.boxs.children[this.index], { // 设置上一张图片向左
                    zIndex: (this.zIndex-1) + '', // 设置zINdex值为第二大
                    transform: `translateX(${-_width}px)`,
                })
                this.index++
                if(this.index > this.imgList.length - 1){ // 边界判断
                    this.index = 0;
                }
                _idx = this.index+1 === this.imgList.length ? 0 : this.index+1
            }
            methods.css(this.boxs.children[_idx], { // 设置当前图片的位置
                zIndex: (this.zIndex-1) + '',
                transform: `translateX(${_width}px)`,
            })
            methods.css(this.boxs.children[this.index], { // 设置当前图片后一张图片的位置
                zIndex: (this.zIndex++)+'',
                transform: `translateX(0px)`,
            })
            for (let i = 0; i < this.smallBtn.length; i++) { // 设置景深和小圆点
                if (i === +this.index) {
                    if (this.lunboType === 'moive') {
                        methods.css(this.boxs.children[i], {
                            transform: 'translateZ(0px)',
                        })
                    }
                    this.smallBtn[i].setAttribute('class','choose')
                } else {
                    if (this.lunboType === 'moive') {
                        methods.css(this.boxs.children[i], {
                            transform: this.boxs.children[i].style.transform + 'translateZ(-1000px)',
                        })
                    }
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
                if (this.index < e.target.id) {
                    this.index = e.target.id  === 0 ? 1 : +e.target.id - 1; // 边界判断， 因为动画方法中会对index进行加减法，所以要加减1
                    console.log(this.index)
                    this.animate_img(this.start_time, 'right')
                } else if (this.index > e.target.id) {
                    this.index = e.target.id === this.imgList.length - 1? this.imgList.length - 2 : + e.target.id + 1;
                    console.log(this.index)
                    this.animate_img(this.start_time, 'left')
                }
                
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
    background-color: #ccc;
    .lunbo{
        transform: translateX(0px);
        transition: all .5s;
        position: absolute;
        display: flex;
        align-items: flex-end;
        overflow: visible;
        transform-style: preserve-3d; 
        perspective: 2400px;
        img {  
            transition: all .5s;
            position: absolute;
        }
        img:first-child { 
            transform:translateX(0px);
        }
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