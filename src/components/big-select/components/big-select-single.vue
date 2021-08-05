<template>
    <div class="container" ref="ref-container" :class="size">
        <div class="select-header" :class="{'focus': selectStyle.length===1}">
            <div class="select-input">
                <input
                    :disabled="disabled"
                    type="text"
                    :placeholder="placeholder"
                    v-model="searchData"
                    @input="get_select"
                    @focus="open_select_container"
                    @blur="close_select_container"
                />
            </div>
            <div class="font-icon">
                <icon-delete class="clear-all" v-if="!disabled && searchData !=''" @click="clear_all"></icon-delete>
                <div class="arrow-bottom" :class="{'rotate': rotateFlag}"></div>
            </div>
        </div>
        <div class="select-container" ref="ref-select-container" :class="selectStyle">
            <!-- loading图标通过下拉框是否为空，和loading属性共同判断  -->
            <q-loading :loading="selectListCache.length === 0 && loading && rotateFlag" size="small">
                <div v-show="!(selectListCache.length === 0 && loading)" class="default-select" ref="ref-default-select">
                    <div
                        v-for="(item,index) in selectList"
                        :key="index"
                        class="default-item"
                        :class="{choose:choose_item(item)}"
                        @mousedown="add_selected(item)"
                    >
                        <span :title="item.label">{{item.label}}</span>
                    </div>
                    <div class="spinning" v-if="bottomLoading">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </q-loading>
        </div>
    </div>
</template>

<script>
import methods from '@/assets/js/tools';
import iconDelete from '@/components/vue-icon/icon-delete';

let timeOut = ''; // 当查询回来数据为空时，避免一直为loading图标
export default {
    name: 'QmSelectBigData',
    props: {
        selectAllList: {
            // 下拉框数据
            type: Array,
            require: true
        },
        size: {
            // 下拉框尺寸,
            type: String
        },
        async: {
            // 异步同步，async:异步(分页查找)，sync:同步(一次性全部查找完成)
            type: String
        },
        pageSize: {
            // 页面大小
            type: Number
        },
        defaultChecked: {
            // 是否有默认选中值
            type: String
        },
        placeholder: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    components: { iconDelete },
    computed: {},
    watch: {
        selectAllList: {
            // 监听下拉框数据
            immediate: true,
            handler(val) {
                if (this.watchFlag) {
                    if (this.async === 'sync') {
                        this.loading = true;
                        if (timeOut !== '' || timeOut !== undefined) {
                            clearTimeout(timeOut);
                        }
                        timeOut = setTimeout(() => {
                            this.loading = false; // 超过5秒，loading取消
                        }, 5000);
                        // 同步时的方法
                        // _selectList是全部的缓存，selectList是筛选到的要渲染的list，selectAllList就是全部，主要用于考虑异步与搜索
                        this.selectListCache = val;
                        this.selectList = val.slice(0, this.scrollPageState.pageSize);
                        // 默认值
                        this.searchData = val.find((item) => item.value == this.defaultChecked)?.label ?? '';
                    } else {
                        this.selectListCache = [...new Set([...this.selectListCache, ...val])];
                        this.selectList = this.selectListCache;
                        if (val.length < this.pageSize) {
                            this.bottomLoading = false;
                        } else {
                            // 防止 immediate 时 val.length = 0,造成this.bottomLoading = false;
                            this.bottomLoading = true;
                        }
                    }
                }
            }
        },
        defaultChecked: {
            immediate: true,
            handler(val) {
                // 默认值
                if (this.async === 'sync') {
                    this.searchData = this.selectAllList?.find((item) => item.value == val)?.label ?? '';
                } else {
                    // 同步情况暂无默认值
                }
            }
        }
    },
    data() {
        return {
            scrollPageState: {
                // 判断分页的
                scrollPage: 0,
                pageSize: 50
            },
            scrollLock: false, // 限流锁
            selectList: [],
            selectListCache: [],
            searchData: '',
            selectStyle: [], // 第一个值是宽度，第二个值是动画
            loading: true,
            rotateFlag: false, // 箭头旋转
            $domAll: '',
            interval: '',
            oldScrollTop: 0,
            bottomLoading: false,
            searchCache: '',
            watchFlag: true // 监听下拉框的打开与关闭，主要用来防止还在请求时关闭下拉框，造成重新打开时，关闭之前请求的数据填充
        };
    },
    mounted() {
        this.scrollPageState.pageSize = this.pageSize;
    },
    methods: {
    // 打开搜索框
        open_select_container() {
            // 开始吧一些样式定好
            this.selectStyle.push('animation');
            this.rotateFlag = true; // 箭头旋转
            this.watchFlag = true; // 监听selectAllList标志
            // 防止打开时是loading时获取不到dom以及scroll监听
            if (this.async === 'async') {
                this.async_search_list();
            }
            if (this.$domAll) {
                this.update_scroll(this.$domAll, 0);
            }
            this.interval = setInterval(() => {
                console.log('interval');
                this.$domAll = this.$refs['ref-default-select'];
                if (this.selectListCache.length !== 0) {
                    // 当有数据时，开启监听,并关闭循环
                    this.listen_select_scroll();
                    console.log('clearInterval');
                    clearInterval(this.interval);
                    this.$domAll && this.update_scroll(this.$domAll, 0); // 再次置顶
                }
            }, 500);
        },
        // 关闭搜索框
        close_select_container() {
            this.selectStyle.pop(); // 删除数组的值,anmation
            clearInterval(this.interval);
            if (this.async == 'async') {
                this.watchFlag = false; // 监听selectAllList标志
            }
            if (this.selectListCache.length !== 0) {
                // 如果下拉框有数据
                // const $domAll = document.getElementsByClassName('default-select')[this.num];
                this.$domAll.removeEventListener('scroll', this.listen_scroll);
            }
            this.rotateFlag = false; // 箭头旋转
            this.reset_select_list();
        },
        // 失去焦点时，重置下拉框
        reset_select_list() {
            this.$nextTick(() => {
                // 防止还是loading时关闭下拉框 ?.
                const _cache = this.selectListCache.find((item) => item.label == this.searchData)?.value ?? '';
                this.$emit('select', _cache);
                if (!_cache) { // 当内容为空时，重置输入框里的值，防止输入的搜索词搜索不到时，未清空搜索框
                    this.searchData = '';
                }
                this.reset_value();
            });
        },
        // 已选择的样式
        choose_item(item) {
            return this.searchData === item.label;
        },
        // 往已选择框内推数据
        add_selected(item) {
            // 确定选择的内容, 并清空搜索内容（异步时）
            this.searchData = item.label;
            this.searchCache = '';
        },

        // 重置操作
        reset_value() {
            this.scrollPageState.scrollPage = 0;
            this.oldScrollTop = 0;
            this.searchCache = '';
            if (this.async === 'sync') {
                this.selectListCache = this.selectAllList;
                this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
            } else {
                this.bottomLoading = true;
                setTimeout(() => {
                    this.selectListCache = [];
                }, 300);
            }
        },

        // 搜索
        async get_select(e) {
            this.reset_value();
            // 搜索时，改变下拉框内容
            this.searchData = e.target.value;
            if (e.target.value.length !== 0) {
                if (this.async == 'sync') {
                    // 判断输入的内容是否为空
                    this.selectListCache = this.selectListCache.filter((item) => {
                        // 过滤属性
                        return String(item.label).indexOf(e.target.value) !== -1;
                    });
                    this.selectList = this.selectListCache.slice(
                        0,
                        this.scrollPageState.pageSize
                    ); // 并按照分页裁剪
                } else {
                    this.searchCache = e.target.value;
                    this.selectListCache = [];
                    this.async_search_list(this.searchCache);
                }
            } else {
                // ，为空的话，重置下拉框
                if (this.async == 'async') {
                    this.searchData = '';
                    this.async_search_list();
                }
            }
        },
        // 监听滚动事件
        listen_select_scroll() {
            this.$domAll.addEventListener('scroll', this.listen_scroll);
        },
        // 监听scroll滚动
        listen_scroll(e) {
            if (this.scrollLock === true) {
                return;
            }
            this.scrollLock = true;
            window.requestAnimationFrame(() => { // requestAnimationFrame 保证高频事件每一帧只执行一次
                this.scrollLock = false;
                this.change_scroll(e);
            });
        },
        // 当监测到下拉框下拉到底部时，push新的数据
        change_scroll(e) {
            const { target } = e;
            if (this.oldScrollTop < target.scrollTop) {
                // 防止多次触发下列事件导致 scrollPage 无限增加
                this.oldScrollTop = Math.max(target.scrollTop, this.oldScrollTop);
                if (
                    target.clientHeight ==
                target.scrollHeight - target.scrollTop
                ) {
                    this.scrollPageState.scrollPage += 1;
                    if (this.async === 'sync') {
                        this.selectList = [
                            ...this.selectList,
                            ...this.selectListCache.slice(
                                this.scrollPageState.scrollPage *
                                this.scrollPageState.pageSize,
                                (this.scrollPageState.scrollPage + 1) *
                                this.scrollPageState.pageSize
                            )
                        ];
                    } else {
                        this.async_search_list(this.searchCache);
                    }
                }
            }
        },

        // 同步情况下的通讯
        async_search_list(text) {
            methods.throttle_event(this.send_message, {
                time: 800,
                content: this,
                args: [text || '']
            });
        },
        send_message(text) {
            const _obj = {
                page: this.scrollPageState.scrollPage,
                pageSize: this.scrollPageState.pageSize,
                text };
            this.$emit('findSelectList', _obj);
        },
        // 滚动到默认选项入口，以后拓展
        update_scroll(dom, num) {
            /* this.scrollPageState.scrollPage = Math.floor((num + 1 + 10) / 10);
            this. */
            dom.scrollTop = num * 30;
        },
        // 清空所有数据
        clear_all() {
            this.searchData = '';
            this.$emit('select', `${this.searchData}`);
        }
    }
};
</script>

<style lang="scss" scoped>

.container {
    vertical-align: middle;
    display: inline-block;
    position: relative;
    text-align: left;
    width: inherit;
    * {
        box-sizing: border-box;
    }
}
.default {
    height: 32px !important;
}
.small {
    height: 24px !important;
}
.large {
    height: 40px !important;
}
.focus {
    border-color: $primary-color !important;
    box-shadow: 0 0 0 2px rgba(250, 160, 0, 0.2);
}
.select-header {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: 100%;
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0 3px;
    &:hover {
        border-color: $primary-color;
        .clear-all {
            display: block !important;
        }
    }
    .select-input {
        flex: 1;
        line-height: 1;
        input {
            width: 100%;
            border: 0;
            outline: none;
        }
    }
    .font-icon {
        position: relative;
        width: 14px;
        .rotate {
            transform: rotate(180deg);
        }
        .clear-all {
            position: absolute;
            cursor: pointer;
            display: none;
            z-index: 2;
            background-color: #fff;
            top: -8px;
        }
        .arrow-bottom {
            position: absolute;
            transition: all 0.5s;
            transform-origin: 7px 0;
            &::before,
            &::after {
                position: absolute;
                content: '';
                top: -2px;
                width: 0px;
                height: 0px;
                line-height: 0;
                border: 7px solid transparent;
                border-top: 7px solid #ccc;
            }
            &::after {
                top: -5px;
                border-top: 7px solid #fff;
            }
        }
    }
}
.select-container {
    width: 100%;
    margin-top: 5px;
    box-shadow: 4px 4px 20px #ccc;
    z-index: 999;
    transition: all 0.5s;
    max-height: 0px;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    opacity: 1;
    top: 100%;
    background-color: #fff;
    &.animation {
        max-height: 300px;
        border: 1px solid rgb(238, 238, 238);
        opacity: 1;
    }
    .default-select {
        max-height: 290px;
        overflow: auto;
        .default-item {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            line-height: 30px;
            padding-left: 8px;
            position: relative;
            &:hover {
                background-color: rgb(255, 251, 227) !important;
            }
            &.choose {
                font-weight: bold;
                background-color: #fafafa;
            }
        }
        .spinning {
            @keyframes loading {
                from{
                    left: 10%;
                }
                to {
                    left: 90%;
                }
            }
            @keyframes loading-resrve {
                from{
                    left: 90%;
                }
                to {
                    left: 10%;
                }
            }
            height: 20px;
            width: 60px;
            margin: 0 auto;
            position: relative;
            span {
                top: 50%;
                margin-top: -5px;
                left: 50%;
                margin-left: -5px;
                height: 10px;
                width: 10px;
                background-color: $primary-color;
                border-radius: 50%;
                position: absolute;
            }
            span:first-of-type {
                animation: loading 1s linear infinite;
            }
            span:last-of-type {
                animation: loading-resrve 1s linear infinite;
            }
        }
    }
}
</style>
