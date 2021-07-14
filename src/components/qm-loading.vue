<template>
    <div class="container">
        <div class="loading-container" v-if="loading">
            <div class="loading" :class="size">
                <template v-if="model=='out-in'">
                    <div class="loading-back-out-in">
                        <div class="back1"></div>
                        <div class="back2"></div>
                        <div class="back3"></div>
                        <div class="back4"></div>
                    </div>
                    <div class="img-container img-container-out-in"></div>
                </template>
                <template v-if="model=='rotate'">
                    <div class="loading-back-rotate"></div>
                    <div class="img-container img-container-rotate"></div>
                </template>
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

        };
    },
    components: {
    },
    mounted() {
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
$header-environment-color: #FCC800;
@keyframes loading{
    0%{
        height: 0px;
        opacity: .2;
    }
    100%{
        height: 100%;
        opacity: 1;
    }
}
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
@keyframes out-in1 {
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
@keyframes out-in2 {
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
@keyframes out-in3 {
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
@keyframes out-in4 {
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
.container {
    overflow: hidden;
    position: relative;
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
            height: 56px;
            width: 56px;
            z-index: 888;
            &.large {
                height: 56px;
                width: 56px;
            }
            &.small {
                height: 36px;
                width: 36px;
            }
            .loading-back-out-in {
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
                    animation: out-in1 2s infinite;
                }
                .back2 {
                    border-top-right-radius: 10px;
                    animation: out-in2 2s infinite;
                }
                .back3 {
                    border-bottom-left-radius: 10px;
                    animation: out-in3 2s infinite;
                }
                .back4 {
                    border-bottom-right-radius: 10px;
                    animation: out-in4 2s infinite;
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
                height: 0px;
                background-image: url('../assets/images/noback-logo.png');
                background-size: 100%;
                animation: loading 1.5s infinite;
                z-index: 999;
                background-position: bottom;
                &-out-in {
                    animation: loading 2s infinite;
                }
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
