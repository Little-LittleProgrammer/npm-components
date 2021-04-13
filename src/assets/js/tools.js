var Methods = (function () {
  var methods = {};
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
          var params = {
              time : data.time || 200,
              context: data.context || null,
              args: data.args
          }
          // 执行定时器
          // 函数也属于对象，因此可以添加属性
          fn.__timebar = setTimeout(function() {
              // 执行方法
              fn.apply(params.context, params.args)
          }, params.time);
      } else {
          // 如果是清除防抖 
      }
      
  }
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
      setTimeout(function () {
          fn.__lock = false;
      }, time || 1000)
  }
  // 获取定位元素在页面中的位置
  methods.offset = function(dom) {
      // 获取当前元素的定位值
      var result = {
          left: dom.offsetLeft,
          top: dom.offsetTop
      };
      // 依次遍历每一个元素的定位元素，直到body
      while (dom !== document.body) {
          // 获取当前元素的定位元素
          // dom = dom.offsetParent;
          dom = dom.parentNode;
          // 累加结果:再加上边框
          result.left += dom.offsetLeft + dom.clientLeft;
          result.top += dom.offsetTop + dom.clientTop;
          // 兼容性考虑 navigator.userAgent

      }
      // 返回结果
      return result;
  }

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
          for (var name in key) {
              // name表示属性名称， key[name]表示属性值
              methods.css(dom, name, key[name])
          }
      }
  }


  /**
   * // 京东放大器
   *
   * @param {*} dom 元素
   * @param {*} url 图片地址
   * @param {*} width 宽
   * @param {*} height 高
   */
  methods.imageZoom = function(dom, url, width, height) {
      // 创建图片的方式：1、new Image 2、document.createElement('img')
      var mask = document.createElement('div');
      var big = document.createElement('div');
      dom.appendChild(mask);
      dom.appendChild(big);
      methods.css(dom, {
          width: width + 'px',
          height: height + 'px',
          position: 'relative',
          backgroundImage: 'url(' + url + ')',
          backgroundSize: 'cover',
          border: '1px solid #ccc'
      })
      // 遮罩层
      methods.css(mask, {
          width: width / 2 + 'px',
          height: height / 2 + 'px',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'yellow',
          opacity: 0.5,
          cursor: 'move',
          display: 'none'
      })
      // 设置右侧放大器
      methods.css(big, {
          width: width + 'px',
          height: height + 'px',
          position: 'absolute',
          top: 0,
          left: '100%',
          background: 'url(' + url + ')' + ' ' + 'no-repeat',
          backgroundSize: '200%',
          border: '1px solid #ccc',
          display: 'none'
      })
      // 修改Mask样式
      function changeMaskStyle(x, y) {
        methods.css(mask, {
              left: x + 'px',
              top: y + 'px'
          })
      }
      // 修改big样式
      function changeBigStyle(x, y) {
        methods.css(big, {
              backgroundPositionX: x * -2 + 'px',
              backgroundPositionY: y * -2 + 'px',
          })
      }
      function demo(e) {
          // 鼠标的位置，就是遮罩层的位置,mask中心点
          var x = e.pageX - positonByHtml.left;
          var y = e.pageY - positonByHtml.top;
          // console.log(x,y)
          //将中心点变成顶点
          x -= width / 4;
          y -= height / 4;
          // 边界处理
          if (x < 0) {
              x = 0;
              // 宽度超出右边框
          } else if (x > width / 2) {
              x = width / 2;
          }
          if (y < 0) {
              y = 0;
              // 高度超出右边框
          } else if (y > height / 2) {
              y = height / 2;
          }
          // 设置样式
          methods.throttle(function () {
              console.log('1')
              changeMaskStyle(x, y)
          })
          changeBigStyle(x, y)
      }
      // 获取元素在页面中的位置
      var positonByHtml = methods.offset(dom)
      // 函数体局部变量
      // eslint-disable-next-line no-unused-vars
      var x, y, top, left, maskWidth, maskHeight, domHeight, domWidth
      // mask显影交互
      // 鼠标移入移出 ：mouseover,mouseout(冒泡多次执行)   mouseenter,mouseleave（执行一次）
      // 鼠标移入，显示
      dom.addEventListener('mouseenter', function () {
          methods.css(mask, 'display', 'block')
          methods.css(big, 'display', 'block')
          // 直接绑定鼠标移入事件
          document.addEventListener('mousemove', demo)
      })
      // 鼠标移出，隐藏
      dom.addEventListener('mouseleave', function () {
          methods.css(mask, 'display', 'none')
          methods.css(big, 'display', 'none')
          document.removeEventListener('mousemove', demo)
      })
  }

  /**
   * addEventlisten的浏览器兼容
   *
   * @param {*} dom  元素
   * @param {*} type  事件类型
   * @param {*} fn    事件回调函数
   */
  methods.bindEvent = function(dom, type, fn) {
      // 判读火狐浏览器，通过ua判断
      if (type === 'mousewheel' && /firefox/i.test(navigator.userAgent)) {
          type = 'DOMMouseScroll';
      }
      // 能力检测，判断方法是否存在，存在的画使用，不存在的话不使用
      if (dom.addEventListener) {
          // dom2级般的方式，都在冒泡阶段触发
          dom.addEventListener(type, fn);
      } else if (dom.attachEvent) {
          // 争对IE绑定事件
          dom.attachEvent('on' + type, function (e) {
              // 兼容性
              e.target = e.srcElement;
              e.currentTarget = this;
              // this指向元素
              fn.call(dom, e);
          })
      } else {
          // 缓存
          var oldFn = dom['on' + type];
          // dom0级绑定方式
          dom['on' + type] = function (e) {
              // 如果已近绑定过，先执行之前的
              oldFn && oldFn(e || window.event);
              // 在执行新的
              fn(e || window.event);
          }
      }
  }

  /**
   * removeEventListen的浏览器兼容
   *
   *@param {*} dom  元素
  * @param {*} type  事件类型
  * @param {*} fn    事件回调函数
  */
  methods.removeEvent = function (dom, type, fn) {
      // 判读火狐浏览器，通过ua判断
      if (type === 'mousewheel' && /firefox/i.test(navigator.userAgent)) {
          type = 'DOMMouseScroll';
      }
      // 能力检测
      if (dom.removeEventListener) {
          // DOM2
          dom.removeEventListener(type, fn);
      } else if (dom.detachEvent) {
          // IE
          dom.detachEvent('on' + type, fn);
      } else {
          // DOM0
          dom['on' + type] = null;
      }
  }

  /**
   * 时间格式化(第二个参数不传表示当前时间)
   *
   * @param {*} format 格式
   * @param {*} date 时间 (时间戳或者yyyy-mm-dd)
   */
  methods.formatTime = function(format, date) {
      date = date ? new Date(date) : new Date();
      var result = {};
      var reg = /[ymd]+/g;
      var middle = format.split(reg);
      var y = format.indexOf('y');
      var m = format.indexOf('m');
      var d = format.indexOf('d');
      console.log(y, m, d)
      var returnResult = ''
      switch (true) {
          case y !== -1:
              // 也可以这么写
              if (/yyyy/i.test(format)) {
                  // if (format.indexOf('yyyy') !== -1 ){
                  result.year = date.getFullYear();
              } else {
                  result.year = date.getFullYear().substr(2, 2);
              }
              break;
          case m !== -1:
              if (format.indexOf('mm') !== -1) {
                  var a = date.getMonth() + 1
                  result.month = result.month <= 9 ? '0' : '' + a;
              } else {
                  result.month = date.getMonth().substr(1, 1) + 1;
              }
              break;
          case d !== -1:
              if (format.indexOf('dd') !== -1) {
                  var b = date.getDate()
                  result.date = result.date <= 9 ? '0' : '' + b;
              } else {
                  result.date = date.getDate().substr(1, 1);
              }
              break;
          default:
              break;
      }
      if (y >= 0 && m >= 0 && d >= 0) {
          if (y < m && m < d) {
              returnResult = middle[0] + ' ' + result.year + ' ' + middle[1] + ' ' + result.month + ' ' + middle[2] + ' ' + result.date + ' ' + middle[3];
          } else if (d < m && m < y) {
              returnResult = middle[0] + ' ' + result.date + ' ' + middle[1] + ' ' + result.month + ' ' + middle[2] + ' ' + result.year + ' ' + middle[3];
          } else if (m < d && d < y) {
              returnResult = middle[0] + ' ' + result.month + ' ' + middle[1] + ' ' + result.date + ' ' + middle[2] + ' ' + result.year + ' ' + middle[3];
          }
      } else {
          if (y > m) {
              returnResult = middle[0] + ' ' + result.month + ' ' + middle[1] + ' ' + result.year + ' ' + middle[2];
          } else {
              returnResult = middle[0] + ' ' + result.year + ' ' + middle[1] + ' ' + result.month + ' ' + middle[2];
          }

      }
      return returnResult;
  }

  /**
   * 时间格式化(第二个参数不传表示当前时间)
   *
   * @param {*} format 格式
   * @param {*} date 时间 (时间戳或者yyyy-mm-dd)
   */
  methods.formatTime2 = function(format, date) {
      var time = date ? new Date(date) : new Date();
      var result = format
          // 处理年
          .replace(/(y{1,4})/g, function (match, $1) {
              var year = time.getFullYear();
              return String(year).slice(4 - $1.length);
          })
          // 处理月
          .replace(/(m{1,2})/g, function (match, $1) {
              var month = time.getMonth() + 1;
              return $1.length === 2 ? (month.length === 1 ? '0' + month : month) : month;
          })
          // 处理日
          .replace(/(d{1,2})/g, function (match, $1) {
              var day = String(time.getDate());
              return $1.length === 2 ? (day.length === 1 ? '0' + day : day) : day;
          })
      return result;
  }

  /**
   * 倒计时
   *
   * @param {*} dom 需要写进的元素
   * @param {*} date 目的时间
   */
  methods.countdown = function(dom, date) {
      var start = new Date(date).getTime();
      // 计算倒计时
      function main() {
          // 获取当前时间戳
          var now = Date.now();
          // 获取时间戳差值
          var time = start - now;
          // 获取时分秒天
          var hour = time / 1000;
          var minute = hour / 60;
          var second = minute / 60;
          var day = second / 24;
          dom.innerHTML = Math.floor(day) + '天:' + Math.floor(day % 24) + '时：' + Math.floor(minute % 60) + '分：' + Math.floor(second % 60) + '秒';
      }
      main();
      // 定时器
      setInterval(function () {
          main();
      }, 800)
  }

  // 观察者模式
  methods.Observer = (function () {
      // 消息队列
      var _msg = {};
      return {
          /**
           * 订阅消息
           * @type    消息名称
           * @fn      回调函数
           * 任务：将消息回调函数，存储再消息队列中
          */
          on: function (type, fn) {
              // 判断这种类型的消息是否存在
              if (_msg[type]) {
                  // 继续存储
                  _msg[type].push(fn)
              } else {
                  // 初始化消息管道
                  _msg[type] = [fn]
              }
          },
          /**
           * 发布消息
           * @type    消息名称
           * 从第二个参数开始：表示执行消息回调函数的时候，传递的参数
           * 作用：遍历该类型的消息回调函数，并逐一执行
          */
          trigger: function (type) {
              // 获取传递的参数
              // 判断该类型的消息是否存在
              if (_msg[type]) {
                  // 获取传递的参数
                  var args = Array.prototype.slice.call(arguments, 1)
                  // 遍历并逐一执行
                  for (var i = 0; i < _msg[type].length; i++) {
                      // 执行
                      // args是数组，所以要注意传递,因此要借助apply
                      _msg[type][i].apply(null, args)
                  }
              }
          },
          /**
           * 注销消息
           * @type    消息名称
           * @fn      回调函数    注意，匿名函数无法注销
           * 作用：从消息队列中，移除该回调函数
          */
          off: function (type, fn) {
              // 如果没有传递参数，清空消息队列
              if (type === undefined) {
                  _msg = {}
                  return;
              }
              if (fn) {
                  // 如果type和fn都传递了，从该类型的消息管道中，找到fn，并将其移除
                  for (var i = _msg[type].length - 1; i >= 0; i--) {
                      // 寻找fn
                      if (_msg[type][i] === fn) {
                          // 移除fn,从后向前遍历，从数组中删除成员不会影响遍历
                          _msg[type].splice(i, 1);
                          return;
                      }
                  }
              } else {
                  // 传递了type，清空该类型的消息管道
                  _msg[type] = [];
              }
          },
          /**
           * 单次订阅
           * @type    消息名称
           * @fn      回调函数
           * 任务：注册完就注销
          */
          once: function (type, fn) {
              var me = this;
              // 包装函数
              function callback() {
                  // 注销回调函数,防止无限循环
                  me.off(type, callback)
                  // apply第二个参数可以是数组，也可以是类数组对象
                  fn.apply(null, arguments);
              }
              // 订阅
              this.on(type, callback)
          }
      }
  })();

  // 继承基类的原型(寄生式继承)
  methods.inherit = function(Child, Parent) {
      function F() {
          //纠正构造函数
          this.constructor = Child;
      }
      // 更改原型
      F.prototype = Parent.prototype;
      Child.prototype = new F();
      // 实现对静态属性的继承
      for (let key in Parent){
          // eslint-disable-next-line no-prototype-builtins
          if(Parent.hasOwnProperty(key)) {
              Child[key] = Parent[key];
          }
      }
      return Child;
  };

  // 实现ajax
  methods.ajax = function (options) {
      // 适配参数
      options = Object.assign({
          url: '',
          method: 'GET',
          data: '',
          headers:{},
          async: true
      }, options);
      // 适配data属性
      // 如果是对象转成字符串
      if (typeof options.data !== 'string') {
          // 适配
          let str = '';
          // 解析data对象
          for (let key in options.data) {
              // 拼接字符串
              str += `&${key}=${options.data[key]}`;
          }
          // 更新data属性
          options.data = str.slice(1);
      }
      // 如果是get请求
      if (options.method.toUpperCase() === 'GET' ) {
          // 数据放在query上
          options.url += '?' + options.data
      }
      console.log(options)
      // 返回promise规范
      return new Promise((resolve, reject) => {
          // 1、创建ajax对象
          let xhr;
          // 判断，能力检测
          if (window.XMLHttpRequest) {
              xhr = new XMLHttpRequest();
          // 低版本IE
          } else if (window.ActiveXObject) {
              // eslint-disable-next-line no-undef
              xhr = new ActiveXObject();
          } else {
              alert('您的浏览器不支持');
              return reject('您的浏览器不支持')
          }
          // 2、监听状态改变
          xhr.onreadystatechange = function() {
              // 判断状态码
              if (xhr.readyState === 4) {
                  // 判断状态码
                  if (xhr.status === 200 || xhr.status === 304) {
                      // 成功
                      resolve(JSON.parse(xhr.responseText))
                  } else {
                      reject('请求失败')
                  }
              }
          }
          // 3、打开连接
          xhr.open(options.method, options.url, options.async)
          // 更改请求头
          if (options.headers) {
              // 遍历请求头
              for (let key in options.headers) {
                  xhr.setRequestHeader(key, options.headers[key])
              }
          }
          // 4、发送数据
          xhr.send(options.data);
      })
  }
  // 表单序列化
  methods.serialize = function(form) {
      // 定义结果
      let str = ''
      // 遍历表单控件
      console.log(form.elements)
      Array.from(form.elements, item => {
          // 获取具有name字段的表单控件值
          if (item.name) {
              // 区分单选和多选
              if (item.type === 'checkbox' || item.type === 'radio') {
                  // 判断选中状态
                  if (item.checked) {
                      // 存储结果
                      str += `&${item.name}=${item.value}`
                  }
              } else {
                  // 其他表单控件
                  str += `&${item.name}=${item.value}`
              }
          }
      })
      return str.slice(1)
  }

  return methods;
})()

export default Methods;