<template>
    <div class="container">
        <div :key="key">
            <div class="form">
                <ul>
                    <li>
                        <div>
                            <span>文件： </span>
                            <input type="file" accept="image/*" @change="get_file_data" />
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>姓名： </span>
                            <input v-model="form.username" type="text"/>
                        </div>
                        <div>
                            <span>字体颜色： </span>
                            <input type="text" id="color-input" v-model="form.color" auto-complete="off"  @focus="open_picker"/>
                            <color-picker ref="ref-colorPicker" :color="form.color" :targetElem="'#color-input'" @onChange="set_form_color"></color-picker>
                        </div>
                    </li>
                    <li>
                        <div @change="get_layout">
                            <span> 样式： </span>
                            <input checked type="radio" name="layout" value="1"/> 斜切平铺
                            <input type="radio" name="layout" value="2"/> 自定义
                        </div>
                        <div>
                            <span> 字体大小： </span>
                            <input v-model="form.size" type="text" @input="set_form_size"/>
                        </div>
                    </li>
                    <li>
                        <button @click="get_img">生成图片 </button>
                        <a :disabled="exportDisabled" :class="{'disabled':exportDisabled}" :href="url" download="watermarkImage.png">导出</a>
                        <button @click="reload_page">重置 </button>
                    </li>
                </ul>

            </div>
            <div class="result-container" ref="ref-result-container">
                <div class="img-container" ref="ref-img-container">
                    <img :src="imgUrl" alt />
                        <!-- <template v-for="item in markList" > 未来考虑自定义多个水印 -->
                        <div v-if="form.layout==2"  class="name-box" ref="ref-name" >
                            <div class="name-rotate" ref="ref-name-rotate">
                                <span draggable="true" @dragstart="drag_handle">{{form.username}}</span>
                                <icon-rotate class="icon rotate" @mousedown.prevent="rotate_name"></icon-rotate>
                            </div>
                        </div>
                        <!-- </template> -->
                    <div v-else class="qm-watermark">
                        <p v-for="item in 16" :key="'line'+item"><span v-for="i in 60" :key="'name'+i">{{form.username}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iconRotate from '@/components/vue-icon/icon-rotate';
import Methods from '@/assets/js/tools.js';
import colorPicker from '@/components/color-picker/color-picker';
export default {
    data() {
        return {
            imgUrl: '',
            markList: ['1', '2'],
            url: '',
            form: {
                username: '',
                color: '#000000',
                layout: 1,
                size: 14
            },
            exportDisabled: true,
            key: 0
        };
    },
    components: {
        iconRotate, colorPicker
    },
    mounted() {

    },

    methods: {
        get_layout(e) {
            this.form.layout = e.target.value;
            if (this.form.layout == 1) {
                console.log(1);
            }
        },
        get_file_data(data) {
            const fileReader = new FileReader();
            const $resultContainer = this.$refs['ref-result-container'];
            const $imgContainer = this.$refs['ref-img-container'];
            fileReader.onload = (e) => {
                this.imgUrl = e.target.result;
                const _image = new Image();
                _image.src = this.imgUrl;
                _image.onload = (e) => {
                    if (e.path[0].width > document.body.clientWidth) {
                        $resultContainer.style.width = document.body.clientWidth + 'px';
                        $imgContainer.style.width = document.body.clientWidth - 40 + 'px';
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
        open_picker(event) {
            this.$refs['ref-colorPicker'].openPicker();
            this.$refs['ref-colorPicker'].updateValue(event);
        },
        set_form_color(color) {
            this.form.color = color;
            const $dom = this.$refs['ref-img-container'];
            $dom.style.color = color;
        },
        set_form_size() {
            const $dom = this.$refs['ref-img-container'];
            $dom.style.fontSize = this.form.size + 'px';
        },
        get_img() {
            const $dom = document.getElementsByClassName('img-container')[0];
            const option = {
                width: $dom.clientWidth,
                height: $dom.clientHeight,
                style: {
                    margin: '0 auto'
                }
            };
            Methods.htmlTocanvas($dom, option).then(data => {
                this.url = data;
                this.exportDisabled = false;
            });
        },
        drag_handle(e){
            const $dom = this.$refs['ref-name'];
            // const $domParent = this.$refs['ref-img-container'];
            // const positonByHtml = Methods.offset($domParent);
            const transformOption = this.get_origin_transform($dom);
            const startX = e.clientX;
            const startY = e.clientY;
            $dom.ondrag = (e) => {
                e.preventDefault();
                const option = {
                    moveX: e.clientX - startX + parseInt(transformOption.translateX || 0),
                    moveY: e.clientY - startY + parseInt(transformOption.translateY || 0),
                    deg: transformOption.rotate || 0
                };
                // 边界处理
                // if (e.clientX - positonByHtml.left < 0) {
                //     moveX = positonByHtml.left - startX;
                // } else if (e.clientX > positonByHtml.left + $domParent.clientWidth) {
                //     moveX = positonByHtml.left + $domParent.clientWidth - startX;
                // }
                // if (e.clientY < positonByHtml.top) {
                //     moveY = positonByHtml.top - startY;
                // } else if (e.clientY > positonByHtml.top + $domParent.clientHeight) {
                //     moveY = positonByHtml.top + $domParent.clientHeight - startY;
                // }
                this.set_transform($dom, option);
            };
            $dom.ondragover = (e) => {
                e.preventDefault();
            };
        },
        get_origin_transform($dom) {
            let old = $dom.style.transform;
            const transformOption = {};
            if (old) {
                old = old.split(' ');
                old.forEach(item => {
                    transformOption[item.replace(/\((.*)\)/, '')] = item.replace(/[^0-9-]/g, '');
                });
            }
            return transformOption;
        },
        set_transform(dom, option) {
            Methods.css(dom, {
                transform: `rotate(${option.deg}deg) translateX(${option.moveX}px) translateY(${option.moveY}px)`
            });
        },
        rotate_name() {
            document.addEventListener('mousemove', this.get_rotate_deg);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', this.get_rotate_deg);
            });
        },
        get_rotate_deg(e) {
            const $dom = this.$refs['ref-name-rotate'];
            const $domParent = this.$refs['ref-name'];
            const transformOption = this.get_origin_transform($domParent);
            const positonByHtml = {
                centerX: Methods.offset($dom).left + $dom.clientWidth / 2,
                centerY: Methods.offset($dom).top + $dom.clientHeight / 2
            };
            let x = e.clientX;
            let y = e.clientY;
            const origin = {x: +positonByHtml.centerX + parseInt(transformOption.translateX || 0), y: +positonByHtml.centerY + parseInt(transformOption.translateY || 0) }; // 先手动指定当前中心点，也可以根据当前元素的left+width/2 的到x  top+height/2 得到y值
            // 计算出当前鼠标相对于元素中心点的坐标
            x = x - origin.x; // 因为x大于origin.x 是在y轴右边，直接减就行了
            y = origin.y - y;// 但是y如果要在x轴上方，它是比origin.y要小的，所以这里就需要反过来

            // 然后计算就可以了
            const deg = Math.atan2(y, x) / Math.PI * 180;
            const option = {
                moveX: 0,
                moveY: 0,
                deg: -deg || 0
            };
            this.set_transform($dom, option);
        },
        // 重新渲染页面
        reload_page(){
            this.key++;
            this.form = {
                username: '',
                color: '#000000',
                layout: 1,
                size: 14
            };
            this.imgUrl = '';
            this.exportDisabled = true;
        }
    }};
</script>

<style lang="scss" scoped>
* {
    list-style: none;
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
            li {
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:last-child {
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
        button,a {
            padding: 0 10px;
            margin-left: 10px;
            border: 1px solid #E6A817;
            border-radius: 8px;
            color: white;
            background-color: #E6A817;
            &:hover {
                background-color: #CC7400;
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
                        right: -5px;
                        top: -5px;
                    }
                }
            }
            .qm-watermark { // 水印
                position: absolute;
                z-index: 99999;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                pointer-events: none;
                font-family: Cursive, serif;
                overflow: hidden;
                $e:17;
                @for $i from 0 to $e {
                    p:nth-child(#{$i}){
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

@each $i in (20, 40, 60, 80, 100, 120, 140, 160,180, 200) {
    .w-#{$i} {
        width: $i+px
    }
}

</style>

