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
    <big-select v-model="defaultChecked" :selectAllList="listAsync" async="async" :pageSize="10" @findSelectList="get_list"></big-select>
    <big-select v-model="defaultCheckedList" :selectAllList="listAsync" async="async" type="multiple" :pageSize="10" @findSelectList="get_list"></big-select>
    <big-select v-model="defaultChecked2" :selectAllList="list" :pageSize="10" ></big-select>
    <big-select :size="['w-200','h-40']" v-model="defaultCheckedList2" :selectAllList="bigList" type="multiple" :pageSize="50" placeholder="我有一万条数据哦"></big-select>

  </div>
</template>

<script>
// @ is an alias to /src
import bigSelect from '@/components/big-select';
const _list = [
    {label: '一', value: '1'},
    {label: '二', value: '2'},
    {label: '三', value: '3'},
    {label: '四', value: '4'},
    {label: '五', value: '5'},
    {label: '六', value: '6'},
    {label: '七', value: '7'},
    {label: '八', value: '8'},
    {label: '九', value: '9'},
    {label: '十', value: '10'},
    {label: '十一', value: '11'},
    {label: '十二', value: '12'},
    {label: '十三', value: '13'},
    {label: '十四', value: '14'},
    {label: '十五', value: '15'},
    {label: '十六', value: '16'},
    {label: '十七', value: '17'},
    {label: '十八', value: '18'},
    {label: '十九', value: '19'},
    {label: '二十', value: '20'},
    {label: '二十一', value: '21'},
    {label: '二十二', value: '22'},
    {label: '二十三', value: '23'},
    {label: '二十四', value: '24'},
    {label: '二十五', value: '25'},
    {label: '二十六', value: '26'},
    {label: '二十七', value: '27'},
    {label: '二十八', value: '28'},
    {label: '二十九', value: '29'},
    {label: '三十', value: '30'},
    {label: '三十一', value: '31'},
    {label: '三十二', value: '32'},
    {label: '三十三', value: '33'},
    {label: '三十四', value: '34'},
    {label: '三十五', value: '35'},
    {label: '三十六', value: '36'},
    {label: '三十七', value: '37'},
    {label: '三十八', value: '38'},
    {label: '三十九', value: '39'},
    {label: '四十', value: '40'},
    {label: '四十一', value: '41'},
    {label: '四十二', value: '42'},
    {label: '四十三', value: '43'},
    {label: '四十四', value: '44'},
    {label: '四十五', value: '45'},
    {label: '四十六', value: '46'},
    {label: '四十七', value: '47'},
    {label: '四十八', value: '48'},
    {label: '四十九', value: '49'},
    {label: '五十', value: '50'},
    {label: '五十一', value: '51'},
    {label: '五十二', value: '52'},
    {label: '五十三', value: '53'},
    {label: '五十四', value: '54'},
    {label: '五十五', value: '55'},
    {label: '五十六', value: '56'},
    {label: '五十七', value: '57'},
    {label: '五十八', value: '58'},
    {label: '五十九', value: '59'},
    {label: '六十', value: '60'}
];
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
            defaultChecked: '20',
            defaultCheckedList2: [],
            defaultChecked2: '20',
            listAsync: [],
            bigList: []
        };
    },
    async mounted() {
        setTimeout(() => {
            console.log('1');
            this.list = _list;
            const _listbig = new Array(10000).fill({label: '1', value: '1'});
            this.bigList = _listbig.map(item => {
                return {
                    label: this.getRandom(8) + '',
                    value: this.getRandom(8) + ''
                };
            });
        }, 3000);
        // setTimeout(() => {
        //     console.log('2');
        //     this.defaultCheckedList = ['1', '3', '24'];
        // }, 5000);
    },
    methods: {
        abc() {
            console.log(this.defaultChecked);
            console.log(this.defaultCheckedList);
        },
        getRandom(num){
            var random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
            return random;
        },
        get_list(obj) {
            console.log(obj);
            setTimeout(() => {
                this.listAsync = _list.filter(item => item.label.includes(obj.text)).slice(obj.page * obj.pageSize, (obj.page + 1) * obj.pageSize);
                console.log('12', this.listAsync);
            }, 2000);
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
