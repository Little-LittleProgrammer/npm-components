<style lang="scss" scoped>
    @keyframes watermark-enter { // 水印
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 0.1;
        }
    }
    .qm-watermark { // 水印
        position: fixed;
        z-index: 99999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        opacity: 0.1;
        font-size: 14px;
        font-family: Cursive, serif;
        overflow: hidden;
        $e:17;
        @for $i from 0 to $e {
            h1:nth-child(#{$i}){
                white-space: nowrap;
                transform-origin: (18% * ($i - 1)) 1%;
                transform: rotate(-20deg);
                text-indent: (-200px * ($i - 1));
            }
        }
        span {
            margin-right: 180px;
        }
    }
</style>

<template>
    <div class="qm-watermark">
        <h1 v-for="item in 16" :key="'line'+item"><span v-for="i in 60" :key="'name'+i">{{$store.state.username}}</span></h1>
    </div>
</template>

<script>
import Methods from '@/assets/js/tools.js'
export default {
    data() {
        return {
        }
    },
    mounted() {
        let $dom = document.getElementsByClassName('qm-watermark')[0]
        let option = {
            width: document.documentElement.clientWidth, 
            height: document.documentElement.clientHeight,
            style: {
                position: 'absolute',
                zIndex: '999',
                left: '0',
                pointerEvents: 'none'
            }
        }
        Methods.htmlTocanvas($dom, option)
    }
};
</script>


