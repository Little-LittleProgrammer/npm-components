<template>
    <div class="default-select">
        <big-select-mutiple
            v-if="type === 'multiple'"
            :disabled="disabled"
            :defaultCheckedList="defaultChecked"
            :selectAllList="selectAllList"
            :size="size"
            :async="async"
            :pageSize="pageSize"
            :placeholder = "placeholder"
            @findSelectList="find_select_list"
            @select="select_data"
        ></big-select-mutiple>
        <big-select-single
            v-else
            :disabled="disabled"
            :selectAllList="selectAllList"
            :size="size"
            :async="async"
            :pageSize="pageSize"
            :defaultChecked="defaultChecked"
            :placeholder = "placeholder"
            @select="select_data"
            @findSelectList="find_select_list"
        ></big-select-single>
    </div>
</template>

<script type="text/javascript">
import BigSelectMutiple from './components/big-select-mutiple.vue';
import BigSelectSingle from './components/big-select-single.vue';

export default {
    name: 'QBigSelect',
    model: {
        prop: 'defaultChecked',
        event: 'select'
    },
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
            type: String,
            default: 'default'
        },
        async: {
            // 异步同步，async:异步(分页查找)，sync:同步(一次性全部查找完成)
            type: String,
            default: 'sync'
        },
        pageSize: {
            // 页面大小
            type: Number,
            default: 50
        },
        defaultChecked: {

        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
    },
    components: {
        BigSelectMutiple,
        BigSelectSingle
    },
    mounted() {},
    methods: {
        select_data(val) {
            this.$emit('select', val);
        },
        find_select_list(obj) {
            this.$emit('findSelectList', obj);
        }
    }
};
</script>

<style lang="scss" scoped>
.default-select {
    width: 200px;
}
</style>
