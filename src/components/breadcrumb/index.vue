<template>
    <div class="breadcrumb-container">
        <div v-if="isRoute">
            <span v-for="(item, index) in breadcrumbList" :key="item.id + $refs['abc']">
                <span class="breadcrumb-link" @click="jump_page(item, index)">{{item.title}}</span>
                <span class="breadcrumb-separator">/</span>
            </span>
        </div>
        <div v-else></div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'Breadcrumb',
    props: {
        isRoute: {
            type: Boolean,
            default: true
        },
        routes: {
            type: Array,
            default: () => []
        },
        useStrict: { // 严格模式, 会增加计算复杂度, 当路由存在重复时使用, 例如: a/b, a/c/b, 两种路径时
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formatMap: undefined, // 格式化后的 route 数据
            breadcrumbList: [],
            queryCache: {}, // query的缓存
            parentList: [],
            index: 0 // 给每个queryCache设置1个id
        };
    },
    computed: {},
    watch: {
        routes: {
            immediate: true,
            handler(val) {
                if (this.isRoute && val.length > 0) {
                    this.formatMap = new Map();
                    this.flatten(val);
                }
            }
        },
        $route: {
            immediate: true,
            handler(val) {
                if (this.isRoute && val) {
                    this.create_breadcrumb_list();
                }
            }
        }
    },
    components: {},
    mounted() {},
    methods: {
        // 格式化数据
        flatten(list, pid = 0, pPath = '') {
            list.forEach((item) => {
                if (item.children) {
                    let _cacheObj = {};
                    if (item.meta) {
                        _cacheObj = {
                            id: item.meta.id,
                            pid: item.meta.pid,
                            path: item.path,
                            title: item.meta.title,
                            name: item.name
                        };
                        this.formatMap.set(item.meta.id, _cacheObj);
                    }
                    this.flatten(item.children, item.meta.id, _cacheObj.path);
                } else {
                    if (item.meta) {
                        const _cacheObj = {
                            id: item.meta.id,
                            pid: item.meta.pid,
                            path: item.path,
                            title: item.meta.title,
                            name: item.name
                        };
                        this.formatMap.set(item.meta.id, _cacheObj);
                    }
                }
            });
        },
        // 生成正确的顺序
        create_breadcrumb_list() {
            const _route = this.$route;
            let _cacheObj = {};
            if (Object.keys(_route.query).length !== 0) {
                const _fin = _route.path.split('/')[_route.path.split('/').length - 1];
                // 缓存query, {'opening-ad': {id:1,path: 'opening-ad', query: 't:10021232'}}
                this.queryCache[_fin] = {
                    id: this.index++,
                    path: _fin,
                    query: _route.query
                };
                // this.delete_wheel(this.queryCache);
            }
            if (Object.keys(this.queryCache).length > 10) {
                // 保证 queryCache 里只有10个子节点, 根据id判断, id最小的节点删除
                const _arr = Object.values(this.queryCache);
                _arr.sort((a, b) => a.id - b.id);
                delete this.queryCache[_arr[0].path];
            }
            console.log('queryCache', this.queryCache);
            _cacheObj = this.formatMap.get(this.$route.meta.id);
            if (Object.keys(_cacheObj).length > 0) {
                this.parentList = [];
                this.find_family(this.formatMap, _cacheObj.pid);
                this.breadcrumbList = [
                    _cacheObj,
                    ...this.parentList
                ].reverse();
            }
        },
        // 找到某一个子路由的全部祖先
        find_family(map, pid) {
            if (pid != 0) {
                const _cacheObj = map.get(pid);
                this.parentList.push(_cacheObj);
                this.find_family(map, _cacheObj.pid);
            }
        },
        // // 删除 path 重复的
        // delete_wheel(arr) {
        //     for (var i = 0; i < arr.length - 1; i++) {
        //         for (var j = i + 1; j < arr.length; j++) {
        //             if (arr[i].path == arr[j].path) {
        //                 arr.splice(i, 1);
        //                 j--;
        //             }
        //         }
        //     }
        //     return arr;
        // },
        // 跳到对应的页面
        jump_page(item, index) {
            console.log(item);
            if (index !== this.breadcrumbList.length - 1) {
                const query = this.queryCache[item.path.split('/')[item.path.split('/').length - 1]]?.query;
                this.$router.push({
                    name: item.name,
                    query
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    .breadcrumb-separator {
        padding: 0 8px;
    }
    span:last-child {
        .breadcrumb-separator {
            display: none;
        }
        .breadcrumb-link {
            color: #000;
            cursor: default;
        }
    }
}
</style>
