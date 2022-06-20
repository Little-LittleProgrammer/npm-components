
const methods = {};
/**
     * 基于操作的节流器
     * @param {*} fn 执行的函数
     * @param {*} data 传递的数据，如果是布尔值true，表示清空定时器 （结束）
     */
methods.throttle_event = function(fn, data) {
    // 清除定时器
    clearTimeout(fn.__timebar);
    // 启动节流
    if (data !== true) {
        // 定义默认值
        data = data || {};
        const params = {
            time: data.time || 200,
            context: data.context || null,
            args: data.args
        };
        // 执行定时器
        // 函数也属于对象，因此可以添加属性
        fn.__timebar = setTimeout(function() {
            // 执行方法
            fn.apply(params.context, params.args);
        }, params.time);
    } else {
        // 如果是清除防抖
    }
};
// 防抖（节流)函数，基于时间
methods.throttle = function(fn, time, context, args) {
    if (fn.__lock) {
        return;
    }
    // 添加锁
    fn.__lock = true;
    // 执行函数
    fn.apply(context, args);
    // 1秒后解锁
    setTimeout(function() {
        fn.__lock = false;
    }, time || 1000);
};

// 获取定位元素在页面中的位置
methods.offset = function(dom) {
    // 获取当前元素的定位值
    const result = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    };
        // 依次遍历每一个元素的定位元素，直到body
    while (dom !== document.body) {
        // 获取当前元素的定位元素
        dom = dom.offsetParent;
        if (!dom) {
            return result;
        }
        // dom = dom.parentNode;
        // 累加结果:再加上边框
        result.left += dom.offsetLeft + dom.clientLeft;
        result.top += dom.offsetTop + dom.clientTop;
        // 兼容性考虑 navigator.userAgent
    }
    // 返回结果
    return result;
};

// 两种用法 css(dom, width, '200px')  css(dom,{ color: 'red', width: '200px' })
/**
     * 设置样式的方法
     *
     * @param {*} dom 元素
     * @param {*} key css属性名称
     * @param {*} value css属性值
     */
methods.css = function(dom, key, value) {
    // 判读 key是对象还是字符串
    if (typeof key === 'string') {
        dom.style[key] = value;
    } else {
        // 遍历
        for (const name in key) {
            // name表示属性名称， key[name]表示属性值
            methods.css(dom, name, key[name]);
        }
    }
};

// 滚动方法
methods.update_scroll = function(dom, num, itemH = 30) {
    dom.scrollTop = num * itemH;
};

export default methods;

