<template>
    <div class="qm-container" ref="ref-qm-container" :class="size">
        <div class="qm-select-header" :class="{'focus': selectStyle.length===2}">
            <div class="select-tag">
                <span v-if="selectVal.length >=1">{{selectVal[0].label}}</span>
                <span v-if="selectVal.length>1">+{{selectVal.length-1}}</span>
            </div>
            <div class="select-input">
                <input type="text" :placeholder="getPlacehorder" v-model="searchData" :class="size" v-on:input="get_select" @focus="open_select_container" @blur="close_select_container">
            </div>
            <div class="clear-all" v-if="selectVal.length != 0 || searchData !=''" @click="clear_all"></div>
            <div class="arrow-bottom" v-else></div>
        </div>
        <div class="qm-select-container" ref="ref-qm-select-container" :class="selectStyle">
            <div v-if="selectAllList.length === 0 && loading" class="loading">
                <span v-for="item in 5" :key="item"></span>
            </div>
            <div v-else>
                <div class="multiple-title">
                    <span>全部选项列表</span>
                    <span></span>
                    <span>已选择选项列表</span>
                </div>
                <div class="select-multiple">
                    <div class="multiple-all" ref="ref-multiple-all">
                        <div v-for="(item,index) in selectList" :key="index" class="multiple-item" :class="{choose:chooseItem(item)}" @click="add_selected_list(item)">
                            <span>{{item.label}}</span>
                            <span class="icon" v-if="chooseItem(item)">&#10003;</span>
                        </div>
                    </div>
                    <div class="multiple-middle">
                        <!-- <button>全选</button> -->
                        &#8644;
                    </div>
                    <div class="multiple-selected" ref="ref-multiple-selected">
                        <div v-for="(item, index) in selectVal" :key="index" class="selected-item" @click="cancel_check(item)">
                            <span>{{item.label}}</span>
                            <span class="icon">&#10003;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import methods from '@/assets/js/tools';
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
    model: {
        prop: 'defaultCheckedList',
        event: 'change'
    },
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
                this.loading = true;
                let timeOut = ''; // 当查询回来数据为空时，避免一直为loading图标
                if (timeOut !== '' || timeOut !== undefined) {
                    clearTimeout(timeOut);
                }
                timeOut = setTimeout(() => {
                    this.loading = false; // 超过5秒，loading取消
                }, 5000);
                this.selectAllList = val;
                if (this.async === 'sync') { // 同步时的方法
                    this._selectList = this.selectAllList; // _selectList是全部的缓存，selectList是筛选到的要渲染的list，selectAllList就是全部
                    this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
                } else { // 异步时的方法
                    if (this.scrollPageState.scrollPage === 0) this._selectList = this.selectAllList;
                    this.selectList = [...this.selectList, ...this.selectAllList];
                }
            }
        },
        defaultCheckedList: { // 默认的选择数据
            immediate: true,
            handler(val) {
                if (val.length !== 0) {
                    this.placeholder = '';
                    this.selectVal = this.defaultCheckedList;
                }
            }
        }
    },
    data() {
        return {
            scrollPageState: { // 判断分页的
                scrollPage: 0,
                pageSize: 100
            },
            scrollLock: false, // 限流锁
            selectList: [],
            selectVal: [],
            searchData: '',
            selectStyle: [], // 第一个值是宽度，第二个值是动画
            loading: true
        };
    },
    mounted() { // 开始吧一些样式定好
        this.scrollPageState.pageSize = this.pageSize;
        if (this.async === 'async') {
            this.$emit('findSelectList', this.scrollPageState.scrollPage, this.searchData);
        }
        const _cache = this.size[0];
        const num = +_cache.replace(/^\D+/g, '');
        const str = 'w-' + num * 2.5; // 复选框的宽度大1.5倍
        this.selectStyle = [str];
        // const $dom = document.getElementsByClassName('qm-container');
        // const $domSelect = document.getElementsByClassName('qm-select-container');
        const $dom = this.$refs['ref-qm-container'];
        const $domSelect = this.$refs['ref-qm-select-container'];
        const _resurt = methods.offset($dom);
        if (document.documentElement.clientWidth - _resurt.left < 500) {
            $domSelect.style.right = 0;
        } else {
            $domSelect.style.left = 0;
        }
    },
    methods: {
        // 打开搜索框
        open_select_container() {
            this.selectStyle.push('animation');
            if (this.selectAllList.length !== 0) { // 当有数据时，开启监听
                this.listen_select_scroll();
            }
            // 多选时，监听鼠标的按钮按下，来判断焦点
            document.addEventListener('mousedown', this.mouse_event);
        },

        // 阻止焦点移除
        mouse_event(e) {
            // 针对这块，千万不要将类名命名重名
            if (e.target.offsetParent?.className.includes('qm-select-container') || e.target.offsetParent?.className.includes('multiple-item') || e.target.offsetParent?.className.includes('selected-item')) {
                e.preventDefault();
            }
        },

        // 关闭搜索框
        close_select_container() {
            this.selectStyle.splice(1, 1); // 删除数组第二个值
            this.reset_select_list();
            document.removeEventListener('mousedown', this.mouse_event);
            if (this.selectAllList.length !== 0) {
                // const $domAll = document.getElementsByClassName('multiple-all')[this.num];
                const $domAll = this.$refs['ref-multiple-all'];
                $domAll.removeEventListener('scroll', this.listen_scroll);
            }
        },

        // 已选择的样式
        chooseItem(item) {
            return this.selectVal.find(e => e === item);
        },

        // 监听滚动事件
        listen_select_scroll() {
            // const $domAll = document.getElementsByClassName('multiple-all')[this.num];
            const $domAll = this.$refs['ref-multiple-all'];
            $domAll.addEventListener('scroll', this.listen_scroll);
        },

        // 往已选择框内推数据
        add_selected_list(item) { // 确定选择的内容
            const _index = this.selectVal.indexOf(item);
            if (_index !== -1) { // 判断是否已被选择
                this.selectVal.splice(_index, 1);
            } else {
                this.selectVal.push(item);
            }
        },

        // 搜索
        async get_select(e) { // 搜索时，改变下拉框内容
            this.searchData = e.target.value;
            this._selectList = this.selectAllList;
            this.scrollPageState.scrollPage = 0; // 分页重置
            if (e.target.value.length !== 0) { // 判断输入的内容是否为空，为空的话，重置下拉框
                this._selectList = this._selectList.filter(item => { // 过滤属性
                    return String(item.label).indexOf(e.target.value) !== -1;
                });
                this.selectList = this._selectList.slice(0, this.scrollPageState.pageSize); // 并按照分页裁剪
            } else {
                this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
            }
        },

        // 失去焦点时，重置下拉框
        reset_select_list() {
            this.$nextTick(() => {
                if (this.selectAllList.length !== 0) {
                    console.log('select', this.selectVal);
                    this.$emit('selectData', this.selectVal); // 多选情况下 返回筛选的数据列表
                }
                this.scrollPageState.scrollPage = 0;
                this.searchData = '';
                if (this.async === 'sync') {
                    this._selectList = this.selectAllList;
                    this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
                } else {
                    this.selectList = this._selectList;
                }
            });
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
            if (target.clientHeight > target.scrollHeight - target.scrollTop - 20) { // 当滚动到距离底部只有20px的时候，加载下一波
                this.scrollPageState.scrollPage += 1;
                if (this.async === 'sync') {
                    this.selectList = [...this.selectList, ...this._selectList.slice(this.scrollPageState.scrollPage * this.scrollPageState.pageSize, (this.scrollPageState.scrollPage + 1) * this.scrollPageState.pageSize)];
                } else {
                    this.$emit('findSelectList', this.scrollPageState.scrollPage, this.searchData);
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
            this.$emit('selectData', this.selectVal);
        }

    }
};
</script>

<style lang="scss" scoped>
@keyframes load{
    0%,100%{
        height: 40px;
        background: lightgreen;
        margin-right: 5px;
    }
    50%{
        height: 70px;
        margin: -15px 0;
        margin-right: 5px;
        background: lightblue;
    }
}
.loading{
    height: 100px;
    margin: 50px auto 0;
    text-align: center;
    span{
        display: inline-block;
        width: 8px;
        height: 100%;
        border-radius: 4px;
        margin-right: 5px;
        background: lightgreen;
        animation: load 1s ease infinite;
        @for $i from 1 through 4 {
            &:nth-child(#{$i+1}) {
                animation-delay: ($i*0.2s);
            }
        }
    }
}

@each $i in (100, 200, 300, 400, 500, 600, 700, 800, 900, 1000) {
    .w-#{$i} {
        width: $i+px;
    }
    .h-#{($i/20)} {
        height: ($i/20)+px;
    }
}

.qm-container {
    display: inline-block;
    position: relative;
    text-align: left;
}

.focus {
    border-color: rgb(66, 160, 251) !important;
    box-shadow: 0 0 0 2px rgba(24,144,255, 0.2)
}

.qm-select-header {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 3px;
    &:hover {
        border-color: rgb(66, 160, 251);
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
    .clear-all {
        cursor: pointer;
        color: white;
        border: 1px solid #ccc;
        height: 11px;
        width: 11px;
        border-radius: 50%;
        background-color: #ccc;
        position: relative;
        &::after {
            content: 'x';
            position: absolute;
            top: 4px;
            left: 1px;
            line-height: 0;
        }
        &:hover {
            background-color: rgb(140, 140, 140);
        }
    }
    .arrow-bottom {
        position: relative;
        height: 11px;
        width: 11px;
        &::before,
        &::after {
            position: absolute;
            content: '';
            top: 3px;
            left: -8.5px;
            width: 0px;
            height: 0px;
            line-height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #ccc;
        }
        &::after {
            top: 1px;
            border-top: 6px solid #fff;
        }
    }
}

.qm-select-container {
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
        border: 1px solid #ccc;
        opacity: 1;
    }
    .default-select {
        overflow: auto;
        height: 270px;
        .default-item {
            cursor: pointer;
            line-height: 30px;
            position: relative;
            &:hover {
                background-color: rgb(255, 251, 227);
            }
            &.choose {
                background-color:rgb(249, 249, 249);
            }
            .icon {
                display: inline-block;
                position: absolute;
                right: 10px;
                width: 10px;
                color: #E6A817;
            }
        }
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
        .multiple-all,
        .multiple-selected,
        .multiple-middle {
            height: 270px;
            overflow: auto;
        }
        .multiple-all,
        .multiple-selected {
            width: 45%;
            border: 1px solid #ccc;
            border-radius: 7px;
        }
        .multiple-all {
            .multiple-item{
                cursor: pointer;
                line-height: 30px;
                position: relative;
                &:hover {
                    background-color: rgb(255, 251, 227);
                }
                &.choose {
                    background-color:rgb(249, 249, 249);
                }
                .icon {
                    display: inline-block;
                    position: absolute;
                    right: 10px;
                    width: 10px;
                    color: #E6A817;
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
