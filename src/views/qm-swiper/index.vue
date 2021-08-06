<template>
    <div>
        <router-link :to="{name:'QmSwiperPC'}">pc</router-link> <br>
        <router-link :to="{name:'QmSwiperApp'}">app</router-link>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'QmSwiper',
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
</style>
