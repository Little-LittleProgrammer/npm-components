<template>
    <div class="container" ref="ref-container" :class="size">
        <div class="select-header" :class="{'focus': selectStyle.length===2}">
            <div class="select-tag">
                <span v-if="selectVal.length >=1">{{selectVal[0].label}}</span>
                <span v-if="selectVal.length>1">+{{selectVal.length-1}}</span>
            </div>
            <div class="select-input">
                <input type="text" :placeholder="getPlacehorder" v-model="searchData" :class="size" v-on:input="get_select" @focus="open_select_container" @blur="close_select_container">
            </div>
            <div class="font-icon">
                <icon-delete class="clear-all" v-if="selectVal.length != 0 || searchData !=''" @click="clear_all"></icon-delete>
                <div class="arrow-bottom" :class="{'rotate': rotateFlag}"></div>
            </div>
        </div>
        <div class="select-container" ref="ref-select-container" :class="selectStyle">
            <div v-show="selectListCache.length === 0 && loading" class="loading-container">
                <qm-loading :loading="true" size="small"></qm-loading>
            </div>
            <div v-show="!(selectListCache.length === 0 && loading)">
                <div class="multiple-title">
                    <span>全部选项列表</span>
                    <span></span>
                    <span>已选择选项列表</span>
                </div>
                <div class="select-multiple">
                    <div class="multiple-all" ref="ref-multiple-all">
                        <template v-if="selectList.length !== 0">
                            <div v-for="(item,index) in selectList" :key="index" class="multiple-item" :class="{choose:chooseItem(item)}" @click="add_selected_list(item)">
                                <span class="text">{{item.label}}</span>
                                <span class="icon" v-if="chooseItem(item)">&#10003;</span>
                            </div>
                        </template>
                        <template v-else>
                            <p class="none-data">暂无数据</p>
                        </template>
                        <div class="spinning" v-if="bottomLoading">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="multiple-middle">
                        <!-- <button>全选</button> -->
                        &#8644;
                    </div>
                    <div class="multiple-selected" ref="ref-multiple-selected">
                        <template v-if="selectVal.length !== 0">
                            <div v-for="(item, index) in selectVal" :key="index" class="selected-item" @click="cancel_check(item)">
                                <span>{{item.label}}</span>
                                <span class="icon">&#10003;</span>
                            </div>
                        </template>
                        <template v-else>
                            <p class="none-data">暂无数据</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import methods from '@/assets/js/tools';
import iconDelete from '@/components/vue-icon/icon-delete';
export default {
    name: 'QmSelectBigData',
    props: {
        selectAllList: { // 下拉框数据
            type: Array
        },
        size: { // 下拉框尺寸,
            type: Array
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
        }
    },
    components: { iconDelete },
    computed: {
        getPlacehorder() {
            if (this.selectVal.length >= 1) {
                return '';
            } else {
                return this.placeholder;
            }
        }
    },
    watch: {
        selectAllList: { // 监听下拉框数据
            immediate: true,
            handler(val){
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
                        this.selectListCache = val; // _selectList是全部的缓存，selectList是筛选到的要渲染的list，selectAllList就是全部
                        this.selectList = val.slice(0, this.scrollPageState.pageSize);
                        // 下拉框列表后加载的情况
                        this.selectVal = val.filter(item => this.defaultCheckedList.join('&*^').includes(item.value));
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
                if (this.async === 'sync') {
                    this.selectVal = this.selectAllList?.filter(item => val.join('&*^').includes(item.value));
                } else {
                    // 同步情况暂无默认值
                }
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
            selectList: [],
            selectVal: [],
            searchData: '',
            selectStyle: [], // 第一个值是宽度，第二个值是动画
            loading: true,
            rotateFlag: false,
            interval: '', // 定时器
            oldScrollTop: 0,
            selectListCache: [],
            bottomLoading: false,
            watchFlag: true
        };
    },
    mounted() { // 开始吧一些样式定好
        this.scrollPageState.pageSize = this.pageSize;
        const _cache = this.size[0];
        let _num = +_cache.replace(/^\D+/g, '');
        // 复选框的宽度, 当选择框的宽度小于500时，为500，当选择框的宽度大于500时，为选择框的宽度
        _num = _num <= 500 ? '500' : _num;
        const _str = 'w-' + _num;
        this.selectStyle = [_str];
        const $dom = this.$refs['ref-container'];
        const $domSelect = this.$refs['ref-select-container'];
        const _resurt = methods.offset($dom);
        if (_num <= 500) {
            if (document.documentElement.clientWidth - _resurt.left < _num) {
            // bug antdv中的a-tabs（有动画的情况）
                $domSelect.style.right = 0;
            } else {
                $domSelect.style.left = 0;
            }
        }
    },
    methods: {
        // 打开搜索框
        open_select_container() {
            this.selectStyle.push('animation');
            this.watchFlag = true;
            this.rotateFlag = true;
            if (this.async === 'async') {
                this.async_search_list();
            }
            this.$domAll && this.update_scroll(this.$domAll, 0);
            this.interval = setInterval(() => {
                this.$domAll = this.$refs['ref-multiple-all'];
                console.log('timeout');
                if (this.selectListCache.length !== 0) {
                    console.log('clearInterval');
                    this.listen_select_scroll();
                    clearInterval(this.interval);
                    this.$domAll && this.update_scroll(this.$domAll, 0); // 再次置顶
                }
            }, 500);
            // 多选时，监听鼠标的按钮按下，来判断焦点
            document.addEventListener('mousedown', this.mouse_event);
        },

        // 阻止焦点移除
        mouse_event(e) {
            // 针对这块，千万不要将类名命名重名
            if (e.target.offsetParent?.className.includes('select-container') || e.target.offsetParent?.className.includes('multiple-item') || e.target.offsetParent?.className.includes('selected-item')) {
                e.preventDefault();
            }
        },

        // 关闭搜索框
        close_select_container() {
            clearInterval(this.interval);
            this.selectStyle.pop(); // 删除数组第二个值
            this.rotateFlag = false;
            this.watchFlag = false; // 监听selectAllList标志
            this.reset_select_list();
            document.removeEventListener('mousedown', this.mouse_event);
            if (this.selectListCache.length !== 0) {
                this.$domAll.removeEventListener('scroll', this.listen_scroll);
            }
        },

        // 失去焦点时，重置下拉框
        reset_select_list() {
            this.$nextTick(() => {
                console.log('select', this.selectVal.map(item => item.value));
                this.$emit('returnSelectData', this.selectVal.map(item => item.value)); // 多选情况下 返回筛选的数据列表
                this.reset_value();
            });
        },

        // 重置操作
        reset_value() {
            this.scrollPageState.scrollPage = 0;
            this.oldScrollTop = 0;
            this.searchData = '';
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

        // 已选择的样式
        chooseItem(item) {
            return this.selectVal.find(e => e === item);
        },

        // 监听滚动事件
        listen_select_scroll() {
            this.$domAll.addEventListener('scroll', this.listen_scroll);
        },

        // 往已选择框内推数据
        add_selected_list(item) { // 确定选择的内容
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
                this.selectListCache = this.selectAllList.filter(item => { // 过滤属性
                    return String(item.label).indexOf(e.target.value) !== -1;
                });
                this.selectList = this.selectListCache.slice(0, this.scrollPageState.pageSize); // 并按照分页裁剪
            } else {
                this.async_search_list(this.searchData);
            }
        },

        // 监听scroll滚动
        listen_scroll(e) {
            if (this.scrollLock === true) {
                return;
            }
            this.scrollLock = true;
            const { target } = e;
            window.requestAnimationFrame(() => { // requestAnimationFrame 保证高频事件每一帧只执行一次
                this.scrollLock = false;
                this.change_scroll(target);
            });
        },

        // 当监测到下拉框下拉到底部时，push新的数据
        change_scroll(target) {
            if (this.oldScrollTop < target.scrollTop) {
                this.oldScrollTop = Math.max(target.scrollTop, this.oldScrollTop);
                if (target.clientHeight == target.scrollHeight - target.scrollTop) { // 当滚动到距离底部只有20px的时候，加载下一波
                    this.scrollPageState.scrollPage += 1;
                    if (this.async === 'sync') {
                        this.selectList = [...this.selectList, ...this.selectListCache.slice(this.scrollPageState.scrollPage * this.scrollPageState.pageSize, (this.scrollPageState.scrollPage + 1) * this.scrollPageState.pageSize)];
                    } else {
                        this.async_search_list(this.searchData);
                    }
                }
            }
        },

        // 已选择框删除
        cancel_check(item) {
            for (let i = this.selectVal.length - 1; i >= 0; i--) {
                if (this.selectVal[i] === item) {
                    this.selectVal.splice(i, 1);
                }
            }
        },

        // 清空所有数据
        clear_all() {
            this.selectVal = [];
            this.searchData = '';
            this.$emit('returnSelectData', this.selectVal);
        },

        // 滚动到默认选项入口，以后拓展
        update_scroll(dom, num) {
            dom.scrollTop = num * 30;
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
                text: text};
            this.$emit('findSelectList', _obj);
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
    display: inline-block;
    position: relative;
    text-align: left;
}

.focus {
    border-color: rgb(66, 160, 251) !important;
    box-shadow: 0 0 0 2px rgba(24,144,255, 0.2)
}

.select-header {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 3px;
    &:hover {
        border-color: rgb(66, 160, 251);
        .clear-all {
            display: block !important;
        }
    }
    .select-input {
        flex:1;
        input {
            width: 100%;
            border: 0;
            outline: none;
        }
    }
    .select-tag {
        display: flex;
        span {
            display: block;
            background-color: rgb(249, 249, 249);
            border: 1px solid #ccc;
            border-radius: 10%;
            padding: 0 6px 0;
            height: 50%;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 60px;
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
            line-height: 250px;
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
                    background-color: #FFA000;
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
            line-height: 270px;
            font-size: 20px;
            padding:0 10px
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
                    color: #E6A817;
                }
                &:hover {
                    background-color:rgb(255, 251, 227);
                }
            }
        }
    }
}

</style>
