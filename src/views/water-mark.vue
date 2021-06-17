<template>
    <div class="container">
        <div :key="key">
            <div class="form">
                <ul>
                    <li>
                        <div>
                            <span>文件：</span>
                            <input type="file" accept="image/*" @change="get_file_data" />
                        </div>
                    </li>
                    <li>
                        <div @change="get_layout">
                            <span>样式：</span>
                            <input checked type="radio" name="layout" value="1" /> 斜切平铺
                            <input type="radio" name="layout" value="2" /> 自定义
                        </div>
                    </li>
                    <transition-group name="animation" tag="div" class="list" mode="out-in">
                        <div
                            class="watermark-info-container"
                            v-for="(item, index) in markList"
                            :key="item.index"
                        >
                            <li>
                                <div>
                                    <span>姓名：</span>
                                    <input v-model="item.username" type="text" />
                                </div>
                                <div>
                                    <span>字体颜色：</span>
                                    <input
                                        type="text"
                                        :id="'color-input'+item.index"
                                        v-model="item.color"
                                        auto-complete="off"
                                        @focus="open_picker(index, $event)"
                                        @input="change_color(index, $event)"
                                    />
                                    <color-picker
                                        ref="ref-colorPicker"
                                        :color="item.color"
                                        :targetElem="'#color-input'+item.index"
                                        @onChange="(color)=>{ set_form_color(color, item, index)}"
                                    ></color-picker>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>字体大小：</span>
                                    <input
                                        v-model="item.size"
                                        type="text"
                                        @input="set_form_size(item, index)"
                                    />
                                </div>
                                <span
                                    class="dot"
                                    v-if="markList.length !== 1"
                                    :disabled="form.layout!=='2'"
                                    :class="{'disabled':form.layout!=='2'}"
                                    @click="del_water_mark(index)"
                                >x</span>
                            </li>
                        </div>
                    </transition-group>
                    <transition-group name="animation" tag="div" class="list" mode="out-in">
                        <div
                            class="watermark-info-container"
                            v-for="(item, index) in imgMarkList"
                            :key="item.index"
                        >
                            <li>
                                <div>
                                    <span>图片文件：</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        @change="get_img_mark_data($event, index)"
                                    />
                                </div>
                                <span class="dot" @click="del_img_water_mark(index)">x</span>
                            </li>
                        </div>
                    </transition-group>
                    <li class="button-group">
                        <button
                            v-if="form.layout=='2'"
                            :class="{'disabled':form.layout!=='2'}"
                            @click="add_water_mark"
                        >添加文字水印</button>
                        <button
                            v-if="form.layout=='2'"
                            :class="{'disabled':form.layout!=='2'}"
                            @click="add_img_water_mark"
                        >添加图片水印</button>
                        <button @click="get_img">生成图片</button>
                        <a
                            :disabled="exportDisabled"
                            :class="{'disabled':exportDisabled}"
                            :href="url"
                            :download="markList[0].username+'.png'"
                        >导出</a>
                        <button @click="reload_page">重置</button>
                    </li>
                </ul>
            </div>
            <div class="result-container" ref="ref-result-container">
                <div class="img-container" ref="ref-img-container">
                    <img :src="imgUrl" alt />
                    <template v-if="form.layout=='2'">
                        <template v-for="item in markList">
                            <div class="name-box" ref="ref-name" :key="item.index">
                                <div class="name-rotate" ref="ref-name-rotate">
                                    <span
                                        draggable="true"
                                        @dragstart="drag_handle"
                                    >{{item.username}}</span>
                                    <icon-rotate
                                        class="icon rotate"
                                        @mousedown.stop.prevent="rotate_name"
                                    ></icon-rotate>
                                </div>
                            </div>
                        </template>
                        <template v-for="item in imgMarkList">
                            <div class="name-box" ref="ref-name" :key="item.index">
                                <div class="name-rotate" ref="ref-name-rotate">
                                    <img
                                        class="img-mark"
                                        draggable="true"
                                        @dragstart="drag_handle"
                                        :src="item.imgSrc"
                                        alt
                                        srcset
                                    />
                                    <icon-size
                                        class="icon size"
                                        @mousedown.stop.prevent="scale_img"
                                    ></icon-size>
                                    <icon-rotate
                                        class="icon rotate"
                                        @mousedown.stop.prevent="rotate_name"
                                    ></icon-rotate>
                                </div>
                            </div>
                        </template>
                    </template>
                    <div v-else class="qm-watermark">
                        <p v-for="item in 16" :key="'line'+item">
                            <span v-for="i in 60" :key="'name'+i">{{markList[0].username}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iconSize from '@/components/vue-icon/icon-size';
import iconRotate from '@/components/vue-icon/icon-rotate';
import Methods from '@/assets/js/tools.js';
import colorPicker from '@/components/color-picker/color-picker';
export default {
    data() {
        return {
            imgUrl: '',
            form: {
                layout: '1'
            },
            keyIndex: 0, // 文字水印index
            markList: [
                // 文字水印列表
                {
                    index: 0,
                    username: '',
                    color: '#000000',
                    size: 14
                }
            ],
            imgKeyIndex: 100, // 图片水印index，从100开始，避免与文字的重复
            imgMarkList: [], // 图片水印列表
            url: '',
            exportDisabled: true,
            key: 0
        };
    },
    components: {
        iconRotate,
        colorPicker,
        iconSize
    },
    mounted() {},

    methods: {
        get_layout(e) {
            // 获取水印样式
            this.form.layout = e.target.value;
            this.markList = [this.markList[0]];
            this.keyIndex = 0;
            this.imgMarkList = [];
            this.imgKeyIndex = 100;
        },
        get_file_data(data) {
            // 文件选取，并读取图片
            const fileReader = new FileReader();
            const $resultContainer = this.$refs['ref-result-container'];
            const $imgContainer = this.$refs['ref-img-container'];
            fileReader.onload = (e) => {
                this.imgUrl = e.target.result;
                const _image = new Image();
                _image.src = this.imgUrl;
                _image.onload = (e) => {
                    // 设置图片与容器的宽度，最大不能超过显示器宽度
                    if (e.path[0].width > document.body.clientWidth) {
                        $resultContainer.style.width =
                            document.body.clientWidth + 'px';
                        $imgContainer.style.width =
                            document.body.clientWidth - 40 + 'px';
                    } else {
                        $resultContainer.style.width = e.path[0].width + 'px';
                        $imgContainer.style.width = e.path[0].width - 40 + 'px';
                    }
                };
            };
            // readAsDataURL
            fileReader.readAsDataURL(data.target.files[0]);
            fileReader.onerror = () => {
                new Error('blobToBase64 error');
            };
        },
        get_img() {
            // 生成图片
            const $dom = document.getElementsByClassName('img-container')[0];
            const option = {
                width: $dom.clientWidth,
                height: $dom.clientHeight,
                style: {
                    margin: '0 auto'
                }
            };
            Methods.htmlTocanvas($dom, option).then(($canvas) => {
                this.exportDisabled = false;
                this.url = $canvas.toDataURL('image/png');
                console.log(this.url);
            });
        },

        /**
         * 文字水印部分
         */
        add_water_mark() {
            // 添加水印
            this.keyIndex++; // 唯一值
            this.markList.push({
                index: this.keyIndex,
                username: '',
                color: '#000000',
                size: 14
            });
        },
        del_water_mark(e) {
            // 删除水印
            this.markList.splice(e, 1);
        },
        /**
         * 颜色选择器
         */
        open_picker(index, event) {
            this.$refs['ref-colorPicker'][index].openPicker();
            this.$refs['ref-colorPicker'][index].updateValue(event);
        },
        change_color(index, e) {
            const _cacheColor = e.target.value;
            const $dom =
                this.form.layout === '1'
                    ? this.$refs['ref-img-container']
                    : this.$refs['ref-name'][index];
            $dom.style.color = _cacheColor;
            this.$refs['ref-colorPicker'][index].updateValue(e);
        },
        set_form_color(color, item, index) {
            item.color = color;
            const $dom =
                this.form.layout === '1'
                    ? this.$refs['ref-img-container']
                    : this.$refs['ref-name'][index];
            $dom.style.color = color;
        },
        set_form_size(item, index) {
            const $dom =
                this.form.layout === '1'
                    ? this.$refs['ref-img-container']
                    : this.$refs['ref-name'][index];
            $dom.style.fontSize = item.size + 'px';
        },

        /**
         * 图片水印部分
         */
        add_img_water_mark() {
            this.imgMarkList.push({
                index: this.imgKeyIndex,
                imgSrc: ''
            });
            this.imgKeyIndex++;
        },
        del_img_water_mark(e) {
            this.imgMarkList.splice(e, 1);
        },
        get_img_mark_data(data, index) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(data.target.files[0]);
            fileReader.onload = (e) => {
                this.imgMarkList[index].imgSrc = e.target.result;
            };
        },
        scale_img(e) {
            // 缩放图片
            this._parentNode =
                e.target.tagName.toLowerCase() === 'svg'
                    ? e.target.previousSibling
                    : e.target.parentNode.previousSibling;
            const _grentParentNode =
                e.target.tagName.toLowerCase() === 'svg'
                    ? e.target.parentNode
                    : e.target.parentNode.parentNode;
            this._pos = {
                w: _grentParentNode.offsetWidth,
                h: _grentParentNode.offsetHeight,
                x: e.clientX,
                y: e.clientY
            };
            document.addEventListener('mousemove', this.get_scale);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', this.get_scale);
            });
        },
        get_scale(e) {
            // 缩放图片的mousemove事件，给图片设置宽高
            e.preventDefault();
            const $dom = this._parentNode;
            // 设置图片的最小缩放为30*30
            const w = Math.max(30, this._pos.x - e.clientX + this._pos.w - 20);
            const h = Math.max(30, this._pos.y - e.clientY + this._pos.h);
            $dom.style.width = w + 'px';
            $dom.style.height = h + 'px';
        },
        /**
         * 公共交互部分
         */
        drag_handle(e) {
            // 拖拽事件
            const $dom = e.target.parentNode.parentNode;
            const transformOption = this.get_origin_transform($dom);
            const startX = e.clientX;
            const startY = e.clientY;
            $dom.ondrag = (e) => {
                e.preventDefault();
                const option = {
                    // 算法逻辑： 当前鼠标坐标 - 开始鼠标坐标 + 之前的transform值
                    moveX:
                        e.clientX -
                        startX +
                        parseInt(transformOption.translateX || 0),
                    moveY:
                        e.clientY -
                        startY +
                        parseInt(transformOption.translateY || 0),
                    deg: transformOption.rotate || 0
                };
                this.set_transform($dom, option);
            };
            $dom.ondragover = (e) => {
                e.preventDefault();
            };
        },
        get_origin_transform($dom) {
            // 获得一开始的transform属性
            let old = $dom.style.transform;
            const transformOption = {};
            if (old) {
                old = old.split(' ');
                old.forEach((item) => {
                    // 读取到transform值，并格式化成 transformOption = { translateX: val, translateY: val, deg: val}
                    transformOption[item.replace(/\((.*)\)/, '')] =
                        item.replace(/[^0-9-]/g, '');
                });
            }
            return transformOption;
        },
        set_transform(dom, option) {
            // 设置transform属性
            Methods.css(dom, {
                transform: `rotate(${option.deg}deg) translateX(${option.moveX}px) translateY(${option.moveY}px)`
            });
        },
        rotate_name(e) {
            // 水印旋转部分
            this._parentNode =
                e.target.tagName.toLowerCase() === 'svg'
                    ? e.target.parentNode
                    : e.target.parentNode.parentNode;
            this._grentParentNode =
                e.target.tagName.toLowerCase() === 'svg'
                    ? e.target.parentNode.parentNode
                    : e.target.parentNode.parentNode.parentNode;
            document.addEventListener('mousemove', this.get_rotate_deg);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', this.get_rotate_deg);
            });
        },
        get_rotate_deg(e) {
            // 获取水印旋转角度
            const $dom = this._parentNode;
            const $domParent = this._grentParentNode;
            const transformOption = this.get_origin_transform($domParent);
            // 中心点的计算是根据浏览器视口的计算，offset是根据页面元素的位置，所以要减去卷动值，此中心点计算未包括transform的值
            const positonByHtml = {
                // 算法逻辑：当前元素距离视口的值 + 宽高的一半 - 屏幕的卷动值
                centerX:
                    Methods.offset($dom).left +
                    $dom.clientWidth / 2 -
                    document.documentElement.scrollLeft,
                centerY:
                    Methods.offset($dom).top +
                    $dom.clientHeight / 2 -
                    document.documentElement.scrollTop
            };
            let x = e.clientX;
            let y = e.clientY;
            const origin = {
                // 中心点+transform的值
                x:
                    +positonByHtml.centerX +
                    parseInt(transformOption.translateX || 0),
                y:
                    +positonByHtml.centerY +
                    parseInt(transformOption.translateY || 0)
            };
            // 计算出当前鼠标相对于元素中心点的坐标
            x = x - origin.x; // 因为x大于origin.x 是在y轴右边，直接减就行了
            y = origin.y - y; // 但是y如果要在x轴上方，它是比origin.y要小的，所以这里就需要反过来

            // 然后计算就可以了
            const deg = (Math.atan2(y, x) / Math.PI) * 180;
            const option = {
                moveX: 0,
                moveY: 0,
                deg: -deg || 0
            };
            this.set_transform($dom, option);
        },
        // 重新渲染页面
        reload_page() {
            this.key++;
            this.form = {
                layout: '1'
            };
            this.keyIndex = 0;
            this.markList = [
                {
                    index: 0,
                    username: '',
                    color: '#000000',
                    size: 14
                }
            ];
            this.imgMarkList = [];
            this.imgKeyIndex = 100;
            this.imgUrl = '';
            this.exportDisabled = true;
        }
    }
};
</script>

<style lang="scss" scoped>
* {
    list-style: none;
}

.animation-enter,
.animation-leave-to {
    opacity: 0;
    max-height: 0 !important;
    margin-top: 0px !important;
    padding: 0px 10px !important;
    border: none !important;
}
// 给过程添加过渡
.animation-enter-active,
.animation-leave-active {
    transition: all 0.5s;
}
.container {
    text-align: left;
    margin: 0 auto;
    .form {
        width: 500px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin: 20px auto;
        ul {
            padding: 0;
            margin: 0;
            .watermark-info-container {
                position: relative;
                margin-top: 10px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 10px;
                li:first-child {
                    margin-top: 0px;
                }
                .dot {
                    cursor: pointer;
                    background-color: wheat;
                    position: absolute;
                    font-size: 16px;
                    right: 0px;
                    top: 0px;
                    height: 14px;
                    width: 14px;
                    text-align: center;
                    line-height: 10px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                }
            }
            li {
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &.button-group {
                    justify-content: flex-end;
                }
            }
        }
        input {
            border: 1px solid #d9d9d9;
            border-radius: 8px;
            outline: none;
            padding: 1px 6px;
        }
        button,
        a {
            padding: 0 10px;
            margin-left: 10px;
            border: 1px solid #e6a817;
            border-radius: 8px;
            color: white;
            background-color: #e6a817;
            &:hover {
                background-color: #cc7400;
            }
        }
        .disabled {
            background-color: #bbb;
        }
    }
    .result-container {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin: 0 auto;
        width: 500px;
        .img-container {
            position: relative;
            width: 460px;
            img {
                width: 100%;
            }
            .name-box {
                position: absolute;
                right: 5%;
                bottom: 5%;
                .name-rotate {
                    padding: 0 10px;
                    transform-origin: center;
                    &:hover {
                        border: 1px solid;
                    }
                    .img-mark {
                        transform-origin: left bottom;
                        cursor: move;
                        width: 50px;
                    }
                }
                span {
                    cursor: move;
                }
                .icon {
                    position: absolute;
                    &.rotate {
                        bottom: -5px;
                        right: -5px;
                    }
                    &.size {
                        transform: rotate(90deg);
                        left: -5px;
                        top: -5px;
                    }
                }
            }
            .qm-watermark {
                // 水印
                position: absolute;
                z-index: 99999;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                pointer-events: none;
                font-family: Cursive, serif;
                overflow: hidden;
                $e: 17;
                @for $i from 0 to $e {
                    p:nth-child(#{$i}) {
                        white-space: nowrap;
                        transform-origin: (18% * ($i - 1)) 1%;
                        transform: rotate(-20deg);
                        text-indent: (-10px * ($i - 1));
                    }
                }
                span {
                    margin-right: 30px;
                }
            }
        }
    }
}

@each $i in (20, 40, 60, 80, 100, 120, 140, 160, 180, 200) {
    .w-#{$i} {
        width: $i + px;
    }
}
</style>

