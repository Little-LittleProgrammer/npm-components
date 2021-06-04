<!--
 * @Author: your name
 * @Date: 2021-05-11 16:17:23
 * @LastEditTime: 2021-05-27 17:58:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /npm-components/src/views/Home.vue
-->
<template>
  <div class="home">
    <!-- multiple -->
    <big-select :selectAllList="list" async="async" type="multiple" :defaultCheckedList="defaultCheckedList" @findSelectList="asd"></big-select>
    <big-select v-model="defaultCheckedList" style="margin-left:700px" :selectAllList="list" type="multiple"></big-select>

  </div>
</template>

<script>
// @ is an alias to /src
import bigSelect from '@/components/big-select';

export default {
    name: 'Home',
    components: {
        bigSelect
    },
    data() {
        return {
            list: [],
            show: '',
            defaultCheckedList: []
        };
    },
    async mounted() {
        const _list = new Array(10000).fill(1);
        const _cache = _list.map(() => {
            const _num = this.getRandom(10);
            return { value: _num, label: _num };
        });
        this.list = _cache;
    },
    methods: {
        getRandom(num){
            var random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
            return random;
        },
        asd(val) {
            console.log(val);
        }
    }
};
</script>

<style lang="scss" scoped>
.test-div {
  width: 100px;
  height: 100px;
  background-color: #000;
  .test-span {
    color: red;
  }
}
</style>
