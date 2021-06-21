<template>
    <div>
        <big-select-mutiple
            v-if="type === 'multiple'"
            :selectAllList="selectAllList"
            :size="size"
            :async="async"
            :pageSize="pageSize"
            :defaultCheckedList="defaultCheckedList"
            :placeholder = "placeholder"
            @findSelectList="findSelectList"
            @selectData="selectData"
        ></big-select-mutiple>
        <big-select-single
            v-else
            :selectAllList="selectAllList"
            :size="size"
            :async="async"
            :pageSize="pageSize"
            :defaultChecked="defaultChecked"
            :placeholder = "placeholder"
            @selectData="selectData"
        ></big-select-single>
    </div>
</template>

<script type="text/javascript">
import BigSelectMutiple from './components/big-select-mutiple.vue';
import BigSelectSingle from './components/big-select-single.vue';
export default {
    name: 'BigSelect',
    props: {
        selectAllList: {
            // 下拉框数据
            type: Array,
            require: true
        },
        type: {
            // 下拉框类型：单选'default'，多选'multiple'
            type: String,
            default: 'default'
        },
        size: {
            // 下拉框尺寸,
            type: Array,
            default: function() {
                return ['w-200', 'h-35'];
            }
        },
        async: {
            // 异步同步，async:异步(分页查找)，sync:同步(一次性全部查找完成)
            type: String,
            default: 'sync'
        },
        pageSize: {
            // 页面大小
            type: Number,
            default: 100
        },
        defaultCheckedList: {
            // 是否有默认选中值
            type: Array,
            default: () => []
        },
        defaultChecked: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    data() {
        return {};
    },
    components: {
        BigSelectMutiple,
        BigSelectSingle
    },
    mounted() {},
    methods: {
        selectData(val) {
            this.$emit('selectData', val);
        },
        findSelectList(page, data) {
            this.$emit('findSelectList', page, data);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
