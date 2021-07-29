<template>
    <div class="page-container">
        <div class="loading-container" v-if="loading">
            <div class="loading" ref="ref-loading" :class="size">
                <template v-if="model=='four-part'">
                    <div class="loading-back-four-part">
                        <div class="back1"></div>
                        <div class="back2"></div>
                        <div class="back3"></div>
                        <div class="back4"></div>
                    </div>
                </template>
                <template v-if="model=='rotate'">
                    <div class="loading-back-rotate"></div>
                </template>
                <template v-if="model=='out-in'">
                    <div class="loading-back-out-in">
                        <div class="back1"></div>
                        <div class="back2"></div>
                        <div class="back3"></div>
                    </div>
                </template>
                <div class="img-container" :style="'height:'+ height+'px'"></div>
            </div>
        </div>
        <div class="main-conatiner" :class="{'mask': loading}">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'QmLoading',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        model: {
            type: String,
            default: 'rotate'
        },
        size: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            timeout: '',
            height: 0
        };
    },
    watch: {
        loading: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.height = 0;
                    const _height = this.size === 'small' ? 36 : this.size === 'default' ? 46 : 56;
                    const _time = this.model === 'rotate' ? 1500 : this.model === 'four-part' ? 2000 : 3000;
                    this.start_timeout(_height, _time);
                } else {
                    clearInterval(this.timeout);
                }
            }
        }
    },
    components: {
    },
    created() {
        clearInterval(this.timeout);
    },
    methods: {
        // chorme使用css动画设置高度宽度会有抖动，所以使用js设置
        start_timeout(val, time) {
            clearInterval(this.timeout);
            const _time = (time - 500) / (val - 7.2);
            this.timeout = setInterval(() => {
                if (this.height > 20 && this.height < 35) {
                    this.height = this.height + 1;
                }
                this.height === val ? this.max_height(val, time) : this.height += 1;
            }, _time);
        },
        max_height(val, time) {
            clearInterval(this.timeout);
            setTimeout(() => {
                this.height = 0;
                this.start_timeout(val, time);
            }, 500);
        }
    },
    beforeDestroy() {
        clearInterval(this.timeout);
    }
};
</script>

<style lang="scss" scoped>
@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
@keyframes four-part1 {
    0% {
        top: -50px;
        left: 0;
        opacity: .1;
    }
    50% {
        top: 0px;
        left: 0;
        opacity: .7;
    }
    100% {
        top: 0px;
        left: 0;
        opacity: 1;
    }
}
@keyframes four-part2 {
    0% {
        top: 0px;
        right: -50px;
        opacity: .1;
    }
    50% {
        top: 0px;
        right: 0;
        opacity: .7;
    }
    100% {
        top: 0px;
        right: 0;
        opacity: 1;
    }
}
@keyframes four-part3 {
    0% {
        top: 50%;
        left: -50px;
        opacity: .1;
    }
    50% {
        top: 50%;
        left: 0;
        opacity: .7;
    }
    100% {
        top: 50%;
        left: 0;
        opacity: 1;
    }
}
@keyframes four-part4 {
    0% {
        bottom: -50px;
        right: 0;
        opacity: .1;
    }
    50% {
        bottom: 0;
        right: 0;
        opacity: .7;
    }
    100% {
        bottom: 0;
        right: 0;
        opacity: 1;
    }
}
@keyframes out-in1 {
    0% {
        left: -1000%;
        border-radius: 50%;
        margin-top:34%;
        height: 34%;
        opacity: .1;
    }
    35% {
        left: 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    50% {
        left: 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    65% {
        left: 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    100% {
        left: 1000%;
        opacity: .1;
        margin-top:34%;
        height: 34%;
    }
}
@keyframes out-in2 {
    0% {
        left: -1000%;
        border-radius: 50%;
        margin-top:34%;
        height: 34%;
        opacity: .1;
    }
    35% {
        left: 34%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    50% {
        left: 34%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    65% {
        left: 34%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    100% {
        left: 1000%;
        border-radius: 50%;
        margin-top:34%;
        height: 34%;
        opacity: .1;
    }
}
@keyframes out-in3 {
    0% {
        left: -1000%;
        border-radius: 50%;
        margin-top:34%;
        height: 34%;
        opacity: .1;
    }
    35% {
        left: 66%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    50% {
        left: 66%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    65% {
        left: 66%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-top:0%;
        height: 100%;
        opacity: 1;
    }
    100% {
        left: 1000%;
        border-radius: 50%;
        margin-top:34%;
        height: 34%;
        opacity: .1;
    }
}
.page-container {
    overflow: hidden;
    position: relative;
    min-height: 60px;
    height: 100%;
    width: 100%;
    .loading-container {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .loading{
            border-radius: 10px;
            position: relative;
            text-align: center;
            height: 46px;
            width: 46px;
            z-index: 888;
            &.large {
                height: 56px;
                width: 56px;
            }
            &.small {
                height: 36px;
                width: 36px;
            }
            .loading-back-four-part {
                height: 100%;
                width: 100%;
                border-radius: 10px;
                font-size: 0;
                .back1, .back2, .back3, .back4 {
                    position: absolute;
                    display: inline-block;
                    height: 50%;
                    width: 50%;
                    background-color: $header-environment-color;
                }
                .back1 {
                    border-top-left-radius: 10px;
                    animation: four-part1 2s infinite;
                }
                .back2 {
                    border-top-right-radius: 10px;
                    animation: four-part2 2s infinite;
                }
                .back3 {
                    border-bottom-left-radius: 10px;
                    animation: four-part3 2s infinite;
                }
                .back4 {
                    border-bottom-right-radius: 10px;
                    animation: four-part4 2s infinite;
                }
            }
            .loading-back-out-in {
                height: 100%;
                width: 100%;
                border-radius: 10px;
                font-size: 0;
                .back1, .back2, .back3 {
                    position: absolute;
                    display: inline-block;
                    height: 100%;
                    width: 34%;
                    background-color: $header-environment-color;
                }
                .back1 {
                    left: -1000%;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                    animation: out-in1 3s infinite;
                }
                .back2 {
                    left: -1000%;
                    animation: out-in2 3s infinite;
                    animation-delay: .3s;
                }
                .back3 {
                    left: -1000%;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    animation: out-in3 3s infinite;
                    animation-delay: .7s;
                }
            }
            .loading-back-rotate {
                height: 100%;
                width: 100%;
                border-radius: 10px;
                font-size: 0;
                background-color: $header-environment-color;
                animation: rotate 1.5s infinite ;
            }
            .img-container {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 0%;
                transform-origin: bottom;
                background-size: 100%;
                z-index: 999;
                background-position: bottom;
                background-image: url('../assets/images/noback-logo.png');
            }
        }
    }
    .main-conatiner {
        opacity: 1;
        transition: all .5s;
    }
    .mask {
        pointer-events: none;
        opacity: .3;
    }
}

</style>
