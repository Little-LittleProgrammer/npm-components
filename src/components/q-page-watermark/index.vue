<template>
    <div ref="ref-watermark">
        <div ref="ref-js-qm-watermark" class="qm-watermark">
            <span :style="'font-size:'+size">{{name}}</span>
        </div>
        <slot :name="content">
            <div class="error-warning">
                <svg t="1627979603207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9080" width="200" height="200"><path d="M318.24 267.848h132.856c6.608 0 12 5.392 12 12v614.672c0 6.608-5.392 12-12 12H318.24c-6.608 0-12-5.392-12-12V279.848c0-6.608 5.392-12 12-12z m-168.584 664.168h398.68c4.96 0 9.192 2.824 11.088 7.408 1.896 4.576 0.904 9.568-2.608 13.072l-5.888 5.896c-3.096 3.096-3.096 8.152 0 11.248L584.8 1003.52c3.504 3.504 4.496 8.496 2.6 13.072-1.896 4.584-6.128 7.408-11.088 7.408H149.656c-6.608 0-12-5.392-12-12v-67.984c0-6.608 5.392-12 12-12z m392.592-664.168H675.36c6.52 0 11.856 5.224 12 11.744l6.216 289.48c0.112 5-2.68 9.328-7.28 11.296-4.6 1.96-9.664 0.984-13.2-2.552l-26.888-26.888c-3.088-3.096-8.168-3.08-11.248 0L550.928 634.96c-3.08 3.08-3.096 8.16 0 11.248l75.056 75.064c2.264 2.256 3.432 4.976 3.512 8.168l3.768 141.32c0.088 3.416-1.096 6.392-3.512 8.808l-23.44 23.432c-2.336 2.344-5.176 3.52-8.48 3.52h-55.584c-6.608 0-12-5.392-12-12V279.848c0-6.608 5.392-12 12-12z m-446.92 0h131.76c6.608 0 12 5.392 12 12v614.672c0 6.608-5.392 12-12 12h-77.864c-6.24 0-11.408-4.736-11.952-10.952l-53.896-614.672c-0.304-3.472 0.744-6.576 3.104-9.152 2.36-2.576 5.36-3.896 8.848-3.896zM12 164.984h745.336c6.608 0 12 5.392 12 12v39.704c0 6.608-5.392 12-12 12H12c-6.608 0-12-5.392-12-12v-39.704c0-6.608 5.392-12 12-12zM299.016 0H470.32c3.664 0 6.824 1.464 9.184 4.272 2.36 2.8 3.264 6.16 2.64 9.768l-19.856 114.936c-1 5.808-5.928 9.96-11.816 9.96H318.864c-5.888 0-10.816-4.152-11.824-9.96L287.184 14.04c-0.616-3.608 0.288-6.968 2.648-9.768C292.192 1.464 295.344 0 299.016 0z m663.2 1021.816L809.2 868.8c-2.92-2.92-7.68-2.92-10.592 0l-153.016 153.016c-2.912 2.912-7.672 2.912-10.592 0l-49.008-49.008c-2.92-2.92-2.92-7.68 0-10.592l153.016-153.016c2.912-2.92 2.912-7.68 0-10.592L585.992 645.592c-2.92-2.92-2.92-7.68 0-10.592l49.008-49.008c2.92-2.92 7.68-2.92 10.592 0l153.016 153.016c2.912 2.912 7.672 2.912 10.592 0l153.016-153.016c2.912-2.92 7.672-2.92 10.592 0l49.008 49.008c2.912 2.92 2.912 7.68 0 10.592L868.8 798.608c-2.92 2.912-2.92 7.672 0 10.592l153.016 153.016c2.912 2.912 2.912 7.672 0 10.592l-49.008 49.008c-2.92 2.912-7.68 2.912-10.592 0z" p-id="9081" fill="#E09D16"></path></svg>
                <p>请勿删除水印!!!</p>
            </div>
        </slot>
    </div>

</template>

<script>
import { htmlTocanvas, css } from './tools/index';
export default {
    name: 'QPageWatermark',
    props: {
        name: {
            type: String,
            default: ''
        },
        gap: { // 水印之间的距离
            type: String,
            default: '100'
        },
        size: {
            type: String,
            default: '14px'
        }
    },
    data() {
        return {
            content: 'content'
        };
    },
    watch: {
        name: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.$nextTick(() => { // 防止获取name时，dom还没渲染出来
                        const $dom = this.$refs['ref-js-qm-watermark'];
                        css($dom.children[0], {
                            width: this.gap + 'px',
                            height: this.gap + 'px',
                            'line-height': this.gap + 'px'
                        });
                        const $content = this.$slots.content;
                        if ($content) {
                            const option = { // 配置canvas的样式
                                width: this.gap,
                                height: this.gap
                            };
                            htmlTocanvas($dom, option).then(($canvas) => {
                                // 监听元素
                                const parentNode = $dom.parentNode;
                                const a = $canvas.toDataURL('image/jpg');
                                const $abc = document.createElement('div');
                                css($abc, {
                                    'z-index': '999',
                                    'position': 'absolute',
                                    'left': '0',
                                    'top': '0',
                                    'width': '100%',
                                    'height': '100%',
                                    'background-image': `url(${a})`,
                                    'background-repeat': 'repeat',
                                    pointerEvents: 'none'
                                });
                                parentNode.insertBefore($abc, $dom); // 将canvas插入原来的位置
                                parentNode.removeChild($dom); // 最终移除页面中被转换的代码
                                this.listen_dom($abc);
                                this.listen_css($abc);
                            });
                        }
                    });
                }
            }
        }
    },
    mounted() {

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
        opacity: 0.15;
        font-family: Cursive, serif;
        overflow: hidden;
        display: inline-block;
        span {
            line-height: 50px;
            margin: 0 auto;
            display: inline-block;
            height: 50px;
            width: 50px;
            transform: rotate(-30deg);
        }
    }
    .error-warning {
        margin: 100px auto;
        text-align: center;
        font-size: 30px;
    }
</style>
