<template>
    <div class="container" ref="ref-container" :class="size">
        <div class="select-header" :class="{'focus': selectClass.length===1}">
            <div class="select-tag">
                <span v-if="selectVal.length >=1">{{selectVal[0].label}}</span>
                <span v-if="selectVal.length>1">+{{selectVal.length-1}}</span>
            </div>
            <div class="select-input">
                <input :disabled="disabled" type="text" :placeholder="getPlacehorder" v-model="searchData" v-on:input="get_select" @focus="open_select_container" @blur="close_select_container">
            </div>
            <div class="font-icon">
                <icon-delete class="clear-all" v-if="!disabled && (selectVal.length != 0 || searchData !='')" @click="clear_all"></icon-delete>
                <div class="arrow-bottom" :class="{'rotate': rotateFlag}"></div>
            </div>
        </div>
        <div class="select-container" ref="ref-select-container" :class="selectClass" :style="selectStyle">
            <q-loading :loading="selectListCache.length === 0 && loading && rotateFlag" size="small">
                <div v-show="!(selectListCache.length === 0 && loading)">
                    <div class="multiple-title parent-node">
                        <span>全部选项列表</span>
                        <span></span>
                        <span>已选择选项列表</span>
                    </div>
                    <div class="select-multiple parent-node">
                        <div class="multiple-all" ref="ref-multiple-all">
                            <div :style="'height:'+getLeftScrollH" v-if="selectList.length !== 0">
                                <div :style="`transform:translateY(${offSetLeftY}px); `" class="parent-node">
                                    <div v-for="(item,index) in selectList" :key="index" class="multiple-item parent-node" :class="{choose: chooseAllStyle || chooseItem(item)}" @click="add_selected_list(item)">
                                        <span class="text" :title="item.label">{{item.label}}</span>
                                        <span class="icon" v-show="chooseAllStyle || chooseItem(item)">&#10003;</span>
                                    </div>
                                </div>
                            </div>
                            <template v-else>
                                <p class="none-data">暂无数据</p>
                            </template>
                            <div class="spinning" v-if="bottomLoading">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div class="multiple-middle parent-node">
                            <div class="choose_all parent-node" @click="choose_all">
                            <!-- <div class="choose_all" > -->
                                <span>&#8644;</span>
                            </div>
                        </div>
                        <div class="multiple-selected parent-node" ref="ref-multiple-selected">
                            <div :style="'height:'+getRightScrollH" v-if="selectVal.length !== 0" class="parent-node">
                                <div :style="`transform:translateY(${offSetRightY}px); `" class="parent-node">
                                    <div v-for="(item, index) in selectViewVal" :key="index" class="selected-item parent-node" @click="cancel_check(item)">
                                        <span :title="item.label">{{item.label}}</span>
                                        <span class="icon">&#10003;</span>
                                    </div>
                                </div>
                            </div>
                            <template v-else>
                                <p class="none-data">暂无数据</p>
                            </template>
                        </div>
                    </div>
                </div>
            </q-loading>
        </div>
    </div>
</template>

<script>
import methods from '../tools/index';
import iconDelete from '../../vue-icon/icon-delete.vue';
import QLoading from '../../q-loading';

export default {
    name: 'QmSelectBigData',
    props: {
        selectAllList: { // 下拉框数据
            type: Array
        },
        size: { // 下拉框尺寸,
            type: String
        },
        async: { // 异步同步，async:异步(分页查找)，sync:同步(一次性全部查找完成)
            type: String
        },
        pageSize: { // 页面大小
            type: Number
        },
        defaultCheckedList: { // 是否有默认选中值
            type: Array
        },
        placeholder: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    components: { iconDelete, QLoading },
    computed: {
        getPlacehorder() {
            if (this.selectVal.length >= 1) {
                return '';
            } else {
                return this.placeholder;
            }
        },
        getLeftScrollH() { // 列表总高度
            if (this.async == 'async') {
                return 300;
            }
            return this.itemH * this.selectListCache.length + 'px';
        },
        getRightScrollH() { // 列表总高度
            if (this.async == 'async') {
                return 300;
            }
            return this.itemH * this.selectVal.length + 'px';
        }
    },
    watch: {
        selectAllList: { // 监听下拉框数据
            immediate: true,
            handler(val) {
                if (this.watchFlag) {
                    if (this.async === 'sync') { // 同步时的方法
                        this.loading = true;
                        let timeOut = ''; // 当查询回来数据为空时，避免一直为loading图标
                        if (timeOut !== '' || timeOut !== undefined) {
                            clearTimeout(timeOut);
                        }
                        timeOut = setTimeout(() => {
                            this.loading = false; // 超过5秒，loading取消
                        }, 5000);
                        this.selectListCache = val || []; // _selectList是全部的缓存，selectList是筛选到的要渲染的list，selectAllList就是全部
                        this.showNum = this.viewH / this.itemH + 4;
                        this.selectList = this.selectListCache.slice(0, this.showNum);
                        // 下拉框列表后加载的情况, 默认值
                        this.selectVal = val?.filter((item) => {
                            return this.defaultCheckedList?.some((e) => e == item.value);
                        });
                    } else { // 异步时的方法
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
        defaultCheckedList: {
            immediate: true,
            handler(val) {
                // 下拉框列表先加载的情况
                if (this.async === 'sync' && this.selectAllList.length > 0 && this.firstTime) {
                    this.selectVal = this.selectAllList.filter((item) => {
                        return val?.some((e) => e == item.value);
                    });
                } else {
                    // 同步情况暂无默认值
                }
            }
        },
        selectVal(val) {
            if (this.async == 'sync') {
                if (this.selectVal.length > (this.viewH / this.itemH + 4)) {
                    this.selectViewVal = this.selectVal.slice(this.selectedViewNum, this.selectedViewNum + this.viewH / this.itemH + 4);
                } else {
                    this.selectViewVal = this.selectVal;
                }
            } else { // 异步情况下, 始终等于
                this.selectViewVal = this.selectVal;
            }
        }
    },
    data() {
        return {
            scrollPageState: { // 判断分页的
                scrollPage: 0,
                pageSize: 50
            },
            scrollLock: false, // 限流锁
            searchData: '',
            selectClass: [], // 第一个值是宽度，第二个值是动画
            selectStyle: {}, // 宽度和定位
            loading: true,
            rotateFlag: false,
            interval: '', // 定时器
            oldBottomScrollTop: 0,

            selectViewVal: [], // 右侧视野中的值
            selectVal: [], // 右侧全部的值
            selectList: [], // 左侧视野中的值
            selectListCache: [], // 左侧全部的值

            bottomLoading: false,
            watchFlag: true,
            padding: 0,

            firstTime: true, // 性能优化, 为了解决卡顿问题

            selectedViewNum: 0, // 当前已选择数据所在的位置
            offSetLeftY: 0, // 左侧动态偏移量
            offSetRightY: 0, // 右侧动态偏移量
            itemH: 30, // 列表单行高度
            showNum: 0, // 显示的个数
            viewH: 300, // 可视区域高度
            chooseAllStyle: false// 全选样式
        };
    },
    mounted() { // 开始吧一些样式定好
        this.scrollPageState.pageSize = this.pageSize;
        const $dom = this.$refs['ref-container'];
        // 复选框的宽度, 当选择框的宽度小于500时，为500，当选择框的宽度大于500时，为选择框的宽度
        const _cache = window.getComputedStyle($dom).width;
        let _num = +_cache.replace(/\D+$/g, '');
        _num = _num <= 500 ? '500' : _num;
        this.selectStyle.width = `${_num}px`;
        const _resurt = methods.offset($dom);
        if (_num <= 500) {
            if (document.documentElement.clientWidth - _resurt.left < _num) {
                // bug antdv中的a-tabs（有动画的情况）
                this.selectStyle.right = 0;
            } else {
                this.selectStyle.left = 0;
            }
        }
        if (this.async === 'async') {
            this.showNum = this.pageSize;
        } else {
            this.showNum = this.viewH / this.itemH + 4;
        }
    },
    methods: {
        // 打开搜索框
        open_select_container() {
            this.selectClass.push('animation');
            this.watchFlag = true;
            this.rotateFlag = true;
            if (this.async === 'async') {
                this.async_search_list();
            }
            this.interval = setInterval(() => {
                this.$domAll = this.$refs['ref-multiple-all'];
                this.$selectedDom = this.$refs['ref-multiple-selected'];
                if (this.selectListCache.length !== 0) {
                    this.listen_select_scroll();
                    clearInterval(this.interval);
                }
            }, 500);
            // 多选时，监听鼠标的按钮按下，来判断焦点
            document.addEventListener('mousedown', this.mouse_event);
        },

        // 阻止焦点移除
        mouse_event(e) {
            const _dom = e.target.parentNode.className;
            // 防止className为 underfined
            if (typeof (_dom) == 'string' && _dom?.includes('parent-node')) {
                e.preventDefault();
            }
        },

        /**
         * 模版里绑定的元素事件
         */
        // 已选择的样式
        chooseItem(item) {
            return this.selectVal.find((e) => e === item);
        },
        // 往已选择框内推数据
        add_selected_list(item) { // 确定选择的内容
            this.chooseAllStyle = false;
            const _index = this.selectVal.indexOf(item);
            if (_index !== -1) { // 判断是否已被选择
                this.selectVal.splice(_index, 1);
            } else {
                this.selectVal.push(item);
            }
            if (this.searchData !== '') {
                this.reset_value();
                this.async_search_list();
            }
        },
        // 搜索
        async get_select(e) { // 搜索时，改变下拉框内容
            this.reset_value();
            this.searchData = e.target.value;
            if (this.async == 'sync') {
                this.selectListCache = this.selectAllList.filter((item) => { // 过滤属性
                    return String(item.label).indexOf(e.target.value) !== -1;
                });
                this.selectList = this.selectListCache.slice(0, this.showNum); // 并按照分页裁剪
            } else {
                this.async_search_list(this.searchData);
            }
        },
        // 已选择框删除
        cancel_check(item) {
            this.chooseAllStyle = false;
            for (let i = this.selectVal.length - 1; i >= 0; i--) {
                if (this.selectVal[i] === item) {
                    this.selectVal.splice(i, 1);
                }
            }
        },
        // x事件, 清空所有数据
        clear_all() {
            this.chooseAllStyle = false;
            this.selectVal = [];
            this.searchData = '';
            this.$emit('select', this.selectVal);
        },
        // 元素事件 end

        /**
         * 滚轮监听事件
         */
        // 监听滚动事件 start
        listen_select_scroll() {
            this.$domAll.addEventListener('scroll', this.listen_left_scroll);
            this.$selectedDom.addEventListener('scroll', this.listen_right_scroll);
        },
        // 监听scroll滚动
        listen_left_scroll(e) {
            if (this.scrollLock === true) {
                return;
            }
            this.scrollLock = true;
            const { target } = e;
            window.requestAnimationFrame(() => { // requestAnimationFrame 保证高频事件每一帧只执行一次
                this.scrollLock = false;
                if (this.async === 'sync') {
                    this.change_left_sync_scroll(target);
                } else {
                    this.change_async_scroll(target);
                }
            });
        },
        listen_right_scroll(e) {
            if (this.scrollLock === true) {
                return;
            }
            this.scrollLock = true;
            const { target } = e;
            window.requestAnimationFrame(() => { // requestAnimationFrame 保证高频事件每一帧只执行一次
                this.scrollLock = false;
                if (this.async === 'sync') {
                    this.change_right_sync_scroll(target);
                } else {
                    this.change_async_scroll(target);
                }
            });
        },
        // 监听滚动事件 end

        /**
         * 异步时的滚轮监听
         */
        // 同步时采用的虚拟滚动 start
        change_left_sync_scroll(target) {
            this.offSetLeftY = target.scrollTop - (target.scrollTop % this.itemH); // 设置动态偏移量模拟滚动
            this.selectList = this.selectListCache.slice(
                Math.floor(target.scrollTop / this.itemH),
                Math.floor(target.scrollTop / this.itemH) + this.showNum
            ); // 根据滚动条高度来截取需要展示的列表区间
        },
        change_right_sync_scroll(target) {
            this.selectedViewNum = Math.floor(target.scrollTop / this.itemH);
            this.offSetRightY = target.scrollTop - (target.scrollTop % this.itemH); // 设置动态偏移量模拟滚动
            this.selectViewVal = this.selectVal.slice(
                Math.floor(target.scrollTop / this.itemH),
                Math.floor(target.scrollTop / this.itemH) + this.showNum
            ); // 根据滚动条高度来截取需要展示的列表区间
        },
        // 同步时采用的虚拟滚动 end

        /**
         * 异步时的滚轮监听与请求操作
         */
        // 异步时的请求 start
        change_async_scroll(target) {
            if (this.oldBottomScrollTop < target.scrollTop) {
                // 防止多次触发滚动事件导致 scrollPage 无限增加
                this.oldBottomScrollTop = Math.max(target.scrollTop, this.oldBottomScrollTop);
                if (
                    target.clientHeight == target.scrollHeight - target.scrollTop
                ) {
                    this.scrollPageState.scrollPage += 1;
                    this.async_search_list(this.searchCache);
                }
            }
        },
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
        // 异步时的请求 end

        /**
         * 关闭搜索框,并重置属性
         */
        // 关闭搜索框一系列操作 start
        close_select_container() {
            clearInterval(this.interval);
            this.selectClass.pop(); // 删除数组第二个值
            this.rotateFlag = false;
            if (this.async == 'async') {
                this.watchFlag = false; // 监听selectAllList标志
            }
            this.reset_select_list();
            document.removeEventListener('mousedown', this.mouse_event);
            if (this.selectListCache.length !== 0) {
                this.$domAll.removeEventListener('scroll', this.listen_left_scroll);
                this.$selectedDom.removeEventListener('scroll', this.listen_right_scroll);
            }
        },

        // 失去焦点时，重置下拉框
        reset_select_list() {
            this.$nextTick(() => {
                this.$emit('select', this.selectVal.map((item) => item.value)); // 多选情况下 返回筛选的数据列表
                this.reset_value();
            });
        },

        // 重置操作
        reset_value() {
            this.scrollPageState.scrollPage = 0;
            this.oldBottomScrollTop = 0;
            this.searchData = '';
            if (this.async === 'sync') {
                this.selectListCache = this.selectAllList;
                this.selectList = this.selectAllList.slice(0, this.showNum);
                this.offSetLeftY = 0;
                this.offSetRightY = 0;
                this.selectedViewNum = 0;
                this.firstTime = false;
            } else {
                this.bottomLoading = true;
                setTimeout(() => {
                    this.selectListCache = [];
                }, 300);
            }
            methods.update_scroll(this.$domAll, 0);
            methods.update_scroll(this.$selectedDom, 0);
        },
        // 关闭搜索框一系列操作 end

        // 全选
        choose_all() {
            if (this.async == 'sync') {
                this.chooseAllStyle = !this.chooseAllStyle;
                if (this.chooseAllStyle) {
                    this.selectVal = this.selectListCache.map(item => item);
                } else {
                    this.selectVal = [];
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.loading-container {
    display: flex;
    align-items: center;
    height: 110px;
    justify-content: center;
}

@each $i in (100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400) {
    .w-#{($i/2)} {
        width: ($i / 2)+px;
    }
    .h-#{($i/20)} {
        height: ($i/20)+px;
    }
}

.container {
    width: inherit;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    text-align: left;
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
    box-shadow: 0 0 0 2px rgba(250, 160, 0, 0.2)
}

.select-header {
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    height: inherit;
    padding: 0 3px;
    &:hover {
        border-color: $primary-color;
        .clear-all {
            display: block !important;
        }
    }
    .select-input {
        flex:1;
        line-height: 1;
        input {
            width: 100%;
            border: 0;
            outline: none;
        }
    }
    .select-tag {
        display: flex;
        span {
            line-height: 1;
            display: block;
            background-color: rgb(249, 249, 249);
            border: 1px solid #e8e8e8;
            border-radius: 10%;
            padding: 3px 6px;
            height: 50%;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 120px;
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
            top: -8px
        }
        .arrow-bottom {
            position: absolute;
            transition: all .5s;
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
    margin-top: 5px;
    box-shadow: 4px 4px 20px #ccc;
    z-index: 999;
    transition: all .5s;
    max-height: 0px;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    opacity: 1;
    top:100%;
    background-color: #fff;
    &.animation {
        max-height: 300px;
        border: 1px solid rgb(238, 238, 238);
        opacity: 1;
    }

    .multiple-title {
        width: 100%;
        line-height: 25px;
        height: 25px;
        font-weight: bold;
        span:nth-child(2) {
            display: inline-block;
            width: 8%;
        }
        span:nth-child(1),
        span:nth-child(3) {
            display: inline-block;
            width: 45%;
            text-align: center;
        }
    }
    .select-multiple {
        margin:0 0 5px 5px;
        display: flex;
        .none-data {
            text-align: center;
            line-height: 240px;
        }
        .multiple-all,
        .multiple-selected,
        .multiple-middle {
            height: 270px;
            overflow: auto;
        }
        .multiple-all,
        .multiple-selected {
            width: 45%;
            border: 1px solid rgb(238, 238, 238);
            border-radius: 7px;
        }
        .multiple-all {
            .multiple-item{
                cursor: pointer;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 30px;
                padding-left: 8px;
                display: flex;
                &:hover {
                    background-color: rgb(255, 251, 227) !important;
                }
                &.choose {
                    font-weight: bold;
                    background-color:rgb(249, 249, 249);
                }
                .text {
                    flex: 1;
                }
                .icon {
                    width: 20px;
                    display: inline-block;
                    color: #E6A817;
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
        .multiple-middle {
            display: flex;
            width: 40px;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            .choose_all {
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 4px 8px;
                span {
                    line-height: 16px;
                    display: block;
                }
            }
            .choose_all:hover {
                background-color: rgb(238, 238, 238);;
            }
        }
        .multiple-selected {
            .selected-item {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: flex;
                text-indent: 13px;
                text-align: left;
                line-height: 30px;
                font-weight: bold;
                position: relative;
                background-color:rgb(249, 249, 249);
                cursor: pointer;
                span {
                    flex: 1;
                }
                .icon {
                    display: inline-block;
                    position: absolute;
                    right: 26px;
                    width: 10px;
                    color: $primary-color;
                }
                &:hover {
                    background-color:rgb(255, 251, 227);
                }
            }
        }
    }
}

</style>
