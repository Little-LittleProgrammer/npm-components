<template>
    <div>
        <div class="qm-container">
            <div class="qm-select-header">
                <input type="text" :placeholder="placeholder" class="select-input"  v-model="searchData" :class="size" v-on:input="get_select" @focus="open_select_container" @blur="close_select_container">
                <div class="select-tag" v-if="type==='multiple'">
                    <span v-if="selectVal.length >=1">{{selectVal[0].label}}</span>
                    <span v-if="selectVal.length>1">+{{selectVal.length-1}}</span>
                </div>
                <div class="clear-all" v-if="selectVal.length != 0 || searchData !=''" @click="clear_all"></div>
                <div class="arrow-bottom" v-if="selectStyle.length !== 2 && selectVal.length === 0"></div>
            </div>
            <div class="qm-select-container" :class="selectStyle">
                <div v-if="type === 'default' ">
                    <div v-if="selectAllList.length === 0 && loading" class="loading">
                        <span v-for="item in 5" :key="item"></span>
                    </div>
                    <div v-else class="default-select">
                        <div v-for="(item,index) in selectList" :key="index" class="default-item" :class="{choose:chooseItem(item)}" @mousedown="add_selected_list(item)">
                            <span>{{item.label}}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
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
                            <div class="multiple-all">
                                <div v-for="(item,index) in selectList" :key="index" class="multiple-item" :class="{choose:chooseItem(item)}" @click="add_selected_list(item)">
                                    <span>{{item.label}}</span>
                                    <span class="icon" v-if="chooseItem(item)">&#10003;</span>
                                </div>
                            </div>
                            <div class="multiple-middle">
                                <!-- <button>全选</button> -->
                                &#8644;
                            </div>
                            <div class="multiple-selected">
                                <div v-for="(item, index) in selectVal" :key="index" class="selected-item" @click="cancel_check(item)">
                                    <span>{{item.label}}</span>
                                    <span class="icon">&#10003;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QmSelectBigData',
    props: {
        selectAllList: { // 下拉框数据
            type: Array,
            require: true
        },
        type: { // 下拉框类型：单选'default'，多选'multiple'
            type: String,
            default: 'default'
        },
        size: { // 下拉框尺寸, 'large|small|default'
            type: Array,
            default: function() {
                return ['w-200', 'h-35'];
            }
        },
        async: { // 异步同步，async:异步(分页查找)，sync:同步(一次性全部查找完成)
            type: String,
            default: 'sync'
        },
        pageSize: { // 页面大小
            type: Number,
            default: 100
        },
        defaultCheckedList: { // 是否有默认选中值
            type: Array,
            default: () => []
        },
        num: {
            type: Number,
            default: 0
        }
    },
    watch: {
        selectAllList: {
            immediate: true,
            handler(val){
                this.loading = true;
                let timeOut = ''; // 当查询回来数据为空时，避免一直为loading图标
                if (timeOut !== '' || timeOut !== undefined) {
                    clearTimeout(timeOut);
                }
                timeOut = setTimeout(() => {
                    this.loading = false;
                }, 5000);
                this.selectAllList = val;
                if (this.async === 'sync') {
                    this._selectList = this.selectAllList;
                    this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
                } else {
                    if (this.scrollPageState.scrollPage === 0) this._selectList = this.selectAllList;
                    this.selectList = [...this.selectList, ...this.selectAllList];
                }
            }
        },
        defaultCheckedList: {
            immediate: true,
            handler(val) {
                if (val && this.type === 'multiple') {
                    this.placeholder = '';
                    this.selectVal = this.defaultCheckedList;
                }
            }
        }
    },
    data() {
        return {
            scrollPageState: {
                scrollPage: 0,
                pageSize: 100
            },
            scrollLock: false,
            selectList: [],
            selectVal: '' || [],
            searchData: '',
            seleContainerStatus: false,
            animationFlag: false,
            selectStyle: [],
            loading: true,
            placeholder: '请选择'
        };
    },
    mounted() {
        this.scrollPageState.pageSize = this.pageSize;
        if (this.async === 'async') {
            this.$emit('findSelectList', this.scrollPageState.scrollPage, this.searchData);
        }
        if (this.type === 'multiple') {
            const _cache = this.size[0];
            const num = +_cache.replace(/^\D+/g, '');
            const str = 'w-' + num * 2.5;
            this.selectStyle = [str];
        } else {
            this.selectStyle = [this.size[0]];
        }
    },
    methods: {
        // 打开搜索框
        open_select_container() {
            this.seleContainerStatus = true;
            this.selectStyle.push('animation');
            if (this.selectAllList.length !== 0) {
                this.listen_select_scroll();
            }
            if (this.type === 'multiple') {
                document.addEventListener('mousedown', this.mouse_event);
                this.set_input_left();
            }
        },
        // 阻止焦点移除
        mouse_event(e) {
            console.log(e.target.offsetParent.className);
            if (e.target.offsetParent.className.includes('qm-select-container') || e.target.offsetParent.className.includes('multiple-item') || e.target.offsetParent.className.includes('selected-item')) {
                e.preventDefault();
            }
        },
        // 关闭搜索框
        close_select_container() {
            this.seleContainerStatus = false;
            this.selectStyle.splice(1, 1);
            this.reset_select_list();
            if (this.type === 'default') {
                const $domAll = document.getElementsByClassName('default-select')[this.num];
                $domAll.removeEventListener('scroll', this.listen_scroll);
            } else {
                document.removeEventListener('mousedown', this.mouse_event);
                const $domAll = document.getElementsByClassName('multiple-all')[this.num];
                $domAll.removeEventListener('scroll', this.listen_scroll);
            }
        },
        // 已选择的样式
        chooseItem(item) {
            if (this.type === 'multiple') {
                return this.selectVal.find(e => e === item);
            } else {
                return this.selectVal === item;
            }
        },
        // 监听鼠标
        listen_mouse() {
            const $dom = document.getElementsByClassName('qm-select-container')[this.num];
            const mouse_leave_event = () => {
                this.seleContainerStatus = false;
                this.selectStyle.splice(1, 1);
                this.reset_select_list();
                remove_event();
            };
            const remove_event = () => {
                $dom.removeEventListener('mouseleave', mouse_leave_event);
            };
            $dom.addEventListener('mouseleave', mouse_leave_event);
        },
        // 监听滚动事件
        listen_select_scroll() {
            if (this.type === 'default') {
                const $domAll = document.getElementsByClassName('default-select')[this.num];
                $domAll.addEventListener('scroll', this.listen_scroll);
            } else {
                const $domAll = document.getElementsByClassName('multiple-all')[this.num];
                $domAll.addEventListener('scroll', this.listen_scroll);
            }
        },
        // 往已选择框内推数据
        add_selected_list(item) {
            if (this.type === 'multiple') {
                this.searchData = ''
                const _index = this.selectVal.indexOf(item);
                if (_index !== -1) {
                    this.selectVal.splice(_index, 1);
                } else {
                    this.selectVal.push(item);
                }
                this.set_input_left();
            } else {
                this.selectVal = item;
                this.searchData = item.label;
            }
        },
        // 设置 input框的左距离
        set_input_left() {
            const $dom = document.getElementsByClassName('select-input')[this.num];
            let num;
            if (this.selectVal.length > 1) {
                this.placeholder = '';
                num = 2.2;
            } else if (this.selectVal.length === 1) {
                this.placeholder = '';
                num = 1.3;
            } else if (this.selectVal.length === 0) {
                this.placeholder = '请选择';
                num = 0.1;
            }
            $dom.style.paddingLeft = num * 55 + 'px';
        },
        // 搜索
        async get_select(e) {
            this.searchData = e.target.value;
            this._selectList = this.selectAllList;
            this.scrollPageState.scrollPage = 0;
            if (e.target.value.length !== 0) {
                this._selectList = this._selectList.filter(item => {
                        return String(item.label).indexOf(e.target.value) !== -1
                    }
                );
                this.selectList = this._selectList.slice(0, this.scrollPageState.pageSize);
            } else {
                this.selectList = this.selectAllList.slice(0, this.scrollPageState.pageSize);
            }
        },
        // 失去焦点时，重置下拉框
        reset_select_list() {
            this.$nextTick(() => {
                if (this.type === 'default') {
                    this.$emit('selectData', this.searchData);
                } else {
                    const _searchVal = this.selectVal.map(item => item.value);
                    console.log(_searchVal);
                    this.$emit('selectData', _searchVal);
                }
                this.scrollPageState.scrollPage = 0;
                this.searchData = ''
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
            window.requestAnimationFrame(() => {
                this.scrollLock = false;
                this.change_scroll(target);
            });
        },
        // 当监测到下拉框下拉到底部时，push新的数据
        change_scroll(target) {
            if (target.clientHeight > target.scrollHeight - target.scrollTop - 20) {
                this.scrollPageState.scrollPage += 1;
                if (this.async === 'sync') {
                    this.selectList = [...this.selectList, ...this._selectList.slice(this.scrollPageState.scrollPage * this.scrollPageState.pageSize, (this.scrollPageState.scrollPage + 1) * this.scrollPageState.pageSize)];
                } else {
                    this.$emit('findSelectList', this.scrollPageState.scrollPage, this.searchData);
                }
            }
        },
        // 以选择框删除
        cancel_check(item) {
            for (let i = this.selectVal.length - 1; i >= 0; i--) {
                if (this.selectVal[i] === item) {
                    this.selectVal.splice(i, 1);
                }
            }
            this.set_input_left();
        },
        // 清空所有数据
        clear_all() {
            this.selectVal = [];
            this.searchData = '';
            if (this.type === 'default') {
                this.$emit('selectData', this.searchData);
            } else {
                this.$emit('selectData', this.selectVal);
            }
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
}

.qm-select-header {
    position: relative;
    .select-input {
        border: 1px solid rgb(229, 229, 229);
        border-radius: 5px;
        outline: none;
        padding-left: 6px;
        &:focus {
            border:1px solid rgb(66, 160, 251)
        }
    }
    .select-tag {
        position: absolute;
        bottom: 18%;
        left: 6%;
        top: 18%;
        span {
            line-height: 1.5;
            display: inline-block;
            background-color: rgb(249, 249, 249);
            border: 1px solid #ccc;
            border-radius: 10%;
            padding: 0 6px 0;
            height: 100%;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 60px;
        }
    }
    .clear-all {
        cursor: pointer;
        position: absolute;
        color: white;
        border: 1px solid #ccc;
        border-radius: 50%;
        top: 50%;
        margin-top: -5px;
        right: 6px;
        width: 12px;
        height: 12px;
        background-color: #ccc;
        &::after {
            position: absolute;
            content: 'x';
            font-size: 6px;
            top: 4px;
            left: 2px;
            line-height: 0;
        }
        &:hover {
            background-color: rgb(140, 140, 140);
        }
    }
    .arrow-bottom {
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: 6px;
        width: 10px;
        height: 10px;
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
