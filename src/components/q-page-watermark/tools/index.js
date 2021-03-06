
// 两种用法 css(dom, width, '200px')  css(dom,{ color: 'red', width: '200px' })
/**
     * 设置样式的方法
     *
     * @param {*} dom 元素
     * @param {*} key css属性名称
     * @param {*} value css属性值
     */
export function css(dom, key, value) {
    // 判读 key是对象还是字符串
    if (typeof key === 'string') {
        dom.style[key] = value;
    } else {
        // 遍历
        for (const name in key) {
            // name表示属性名称， key[name]表示属性值
            css(dom, name, key[name]);
        }
    }
}

/**
     * 将html代码转化为图片
     * @param {*} dom dom元素
     * @param {*} options 配置  宽高：width， height， canvas样式：style
     * @description
     */
export function html_to_canvas(dom, options) {
    options = Object.assign({ width: 100, height: 100, style: {} }, options); // 默认样式
    const $canvas = document.createElement('canvas');
    $canvas.id = 'canvas';
    $canvas.width = options.width;
    $canvas.height = options.height;
    if (JSON.stringify(options.style) !== '{}') { // 配置canvas的样式
        for (const key in options.style) {
            css($canvas, `${key}`, `${options.style[key]}`);
        }
    }
    const ctx = $canvas.getContext('2d');

    async function init_main() { // 主方法
        const data = await get_svg_dom_string(dom);
        // const DOMURL = window.URL || window.webkitURL || window;
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(data)));
        // const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        // const url = DOMURL.createObjectURL(svg);
        // img.setAttribute('crossOrigin', 'anonymous');
        // img.src = url;
        return new Promise(resolve => {
            img.onload = function() { // 最终生成的canvas
                ctx.drawImage(img, 0, 0);
                // const parentNode = dom.parentNode;
                // parentNode.insertBefore($canvas, dom); // 将canvas插入原来的位置
                // parentNode.removeChild(dom); // 最终移除页面中被转换的代码
                resolve($canvas);
            };
        });
    }

    async function get_svg_dom_string(element) { // 将html代码嵌入svg
        const $dom = await render_dom(element, true);
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" width = "${options.width}" height = "${options.height}">
                        <foreignObject width="100%" height="100%">
                                ${$dom}
                        </foreignObject>\n
                    </svg>
                `;
    }

    async function render_dom(element, isTop) { // 递归调用获取子标签
        const tag = element.tagName.toLowerCase();
        let _str = `<${tag} `;
        let _flag = true;
        // 最外层的节点要加xmlns命名空间
        isTop && (_str += `xmlns="http://www.w3.org/1999/xhtml" `);
        if (_str === '<img ') { // img标签特殊处理
            _flag = false;
            let base64Img = '';
            if (element.src.length > 30000) { // 判断src属性是不是base64， 是的话不用处理，不是的话，转换base64
                base64Img = element.src;
            } else {
                base64Img = await get_base64_image(element.src);
            }
            _str += `src="${base64Img}" style="${get_element_styles(element)}" />\n`;
        } else if (_str.includes('svg') || _str.includes('path')) {
            _flag = false;
            _str = '';
        } else {
            _str += `style="${get_element_styles(element)}">\n`;
        }
        if (element.children.length) {
            for (const el of element.children) {
                _str += await render_dom(el);
            }
        } else {
            _str += element.innerHTML;
        }
        if (_flag) {
            _str += `</${tag}>\n`;
        }
        return _str;
    }

    function get_element_styles(element) { // 获取标签的所有样式
        let _css = '';
        // 能力检测
        _css = window.getComputedStyle(element);
        let _style = '';
        for (const key of _css) {
            // 排除无用样式
            if (key === '-webkit-locale') {
                _style += '';
            } else {
                _style += `${key}:${_css[key]};`;
            }
        }
        // 将字符串里的双引号变成单引号，防止赋值style的时候造成混乱
        return _style.replace(/\"/g, '\'');
    }

    function get_base64_image(img) { // 获取图片的base64
        const _image = new Image();
        _image.src = img;
        return new Promise(resolve => {
            _image.onload = function() {
                const $canvas = document.createElement('canvas');
                $canvas.id = 'image';
                $canvas.width = _image.width;
                $canvas.height = _image.height;
                const ctxImg = $canvas.getContext('2d');
                ctxImg.drawImage(_image, 0, 0, _image.width, _image.height);
                const _ext = _image.src.substring(_image.src.lastIndexOf('.') + 1).toLowerCase();
                const _dataURL = $canvas.toDataURL('image/' + _ext);
                resolve(_dataURL);
            };
        });
    }

    return init_main();
}

