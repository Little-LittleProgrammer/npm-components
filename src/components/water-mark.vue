<template>
    <div :class="{ 'qm-watermark': $store.state.watermarkFlag }" v-show="$store.state.watermarkFlag">
        <h1 v-for="item in 16" :key="'line'+item"><span v-for="i in 60" :key="'name'+i">{{$store.state.username}}</span></h1>
    </div>
</template>

<script>
export default {

};
</script>

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
        animation: watermark-enter 1s;
        position: fixed;
        z-index: 99999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        opacity: 0.1;
        font-size: 20px;
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
