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
    <big-select :selectAllList="list" :defaultChecked="defaultChecked"></big-select>
    <big-select v-model="defaultCheckedList" :selectAllList="list" type="multiple"></big-select>

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
            defaultCheckedList: [],
            defaultChecked: '123123123'
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
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
}
</style>
