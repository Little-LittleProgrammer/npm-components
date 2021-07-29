<template>
    <div ref="ref-watermark">
        <div class="qm-watermark">
            <h2 v-for="item in 16" :key="'line'+item"><span :style="'margin-right:'+gap" v-for="i in 60" :key="'name'+i">{{name}}</span></h2>
        </div>
        <slot :name="content">
            <div class="error-warning">
                <img id="forbidImg" src="./images/forbidden.jpg" alt="" srcset="">
                <p>请勿删除水印!!!</p>
            </div>
        </slot>
    </div>

</template>

<script>
import { htmlTocanvas } from './tools/index';
export default {
    name: 'QContainerWater',
    props: {
        name: {
            type: String,
            default: ''
        },
        gap: { // 水印之间的距离
            type: String,
            default: '100px'
        }
    },
    data() {
        return {
            content: 'content'
        };
    },
    mounted() {
        const $dom = document.getElementsByClassName('qm-watermark')[0];
        const $content = this.$slots.content;
        let _width = 0;
        let _height = 0;
        $content.forEach(item => {
            _width += item.elm.clientWidth;
            _height += item.elm.clientHeight;
        });
        if ($content) {
            const option = { // 配置canvas的样式
                width: _width,
                height: _height,
                style: {
                    position: 'fixed',
                    zIndex: '999',
                    pointerEvents: 'none'
                }
            };
            htmlTocanvas($dom, option).then(($canvas) => {
                this.listen_dom($canvas);
                this.listen_css($canvas);
            });
        }
    },
    methods: {
        listen_dom($dom) { // 监听元素是否被删除
            // 观察器的配置（需要观察什么变动）
            const config = { attributes: true, childList: true, subtree: true };
            // 当观察到变动时执行的回调函数
            const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.removedNodes[0] === $dom) {
                        this.content = '';
                        // 停止观察
                        observer.disconnect();
                    }
                }
            };
            // 创建一个观察器实例并传入回调函数
            const observer = new MutationObserver(callback);
            // 以上述配置开始观察目标节点
            observer.observe(this.$refs['ref-watermark'], config);
        },
        listen_css($dom) { // 监听元素的css变化
            const callback = (mutationsList, observer) => { // 监听css变化, 防止去除canvas标签
                mutationsList.forEach((mutation) => {
                    if (mutation.type == 'attributes' && mutation.attributeName === 'style') {
                        console.log('css changed', mutation);
                        $dom.style.display = 'block';
                        $dom.style.opacity = '1';
                        $dom.style.visibility = 'visible';
                    }
                    if (mutation.type == 'attributes' && mutation.attributeName === 'class') {
                        console.log('className changed', mutation);
                        this.content = '';
                        // 停止观察
                        observer.disconnect();
                    }
                });
            };
            const observer = new MutationObserver(callback);
            observer.observe($dom, {
                attributes: true, // 将其配置为侦听属性更改,
                attributeFilter: ['style', 'class'] // 监听style属性
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .qm-watermark { // 水印
        position: fixed;
        z-index: 99999;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
        opacity: 0.15;
        font-family: Cursive, serif;
        font-size: 14px;
        overflow: hidden;
        $e:17;
        @for $i from 0 to $e {
            h2:nth-child(#{$i}){
                line-height: 1;
                margin: 0;
                white-space: nowrap;
                transform-origin: (18% * ($i - 1)) 1%;
                transform: rotate(-20deg);
                text-indent: (-200px * ($i - 1));
            }
        }
    }
    .error-warning {
        margin: 100px auto;
        text-align: center;
        font-size: 30px;
    }
</style>
