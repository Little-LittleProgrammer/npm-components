!function(e){function t(t){for(var a,s,l=t[0],c=t[1],o=t[2],u=0,d=[];u<l.length;u++)s=l[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);for(f&&f(t);d.length;)d.shift()();return i.push.apply(i,o||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},s={app:0},r={app:0},i=[];function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[];s[e]?t.push(s[e]):0!==s[e]&&{about:1}[e]&&t.push(s[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"56ea060e"}[e]+".css",r=l.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var o=(f=i[c]).getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(o===a||o===r))return t()}var u=document.getElementsByTagName("style");for(c=0;c<u.length;c++){var f;if((o=(f=u[c]).getAttribute("data-href"))===a||o===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete s[e],d.parentNode.removeChild(d),n(i)},d.href=r,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){s[e]=0})));var n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=r[e]=[t,a]}));t.push(n[2]=a);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=function(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"3903fb33"}[e]+".js"}(e);var o=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;o.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",o.name="ChunkLoadError",o.type=a,o.request=s,n[1](o)}r[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw e};var c=window.webpackJsonp=window.webpackJsonp||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var f=o;i.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"1ef8":function(e,t,n){"use strict";n.r(t);var a=n("1da1"),s=n("2909"),r=(n("96cf"),n("a9e3"),n("fb6a"),n("99af"),n("5319"),n("ac1f"),n("caad"),n("2532"),n("a434"),n("7db0"),n("4de4"),n("d81d"),n("8e1e")),i={name:"QmSelectBigData",props:{selectAllList:{type:Array,require:!0},type:{type:String,default:"default"},size:{type:Array,default:function(){return["w-200","h-35"]}},async:{type:String,default:"sync"},pageSize:{type:Number,default:100},defaultCheckedList:{type:Array,default:function(){return[]}},num:{type:Number,default:0}},watch:{selectAllList:{immediate:!0,handler:function(e){var t=this;this.loading=!0;var n="";""===n&&void 0===n||clearTimeout(n),n=setTimeout((function(){t.loading=!1}),5e3),this.selectAllList=e,"sync"===this.async?(this._selectList=this.selectAllList,this.selectList=this.selectAllList.slice(0,this.scrollPageState.pageSize)):(0===this.scrollPageState.scrollPage&&(this._selectList=this.selectAllList),this.selectList=[].concat(Object(s.a)(this.selectList),Object(s.a)(this.selectAllList)))}},defaultCheckedList:{immediate:!0,handler:function(e){e&&"multiple"===this.type&&(this.placeholder="",this.selectVal=this.defaultCheckedList)}}},data:function(){return{scrollPageState:{scrollPage:0,pageSize:100},scrollLock:!1,selectList:[],selectVal:[],searchData:"",seleContainerStatus:!1,animationFlag:!1,selectStyle:[],loading:!0,placeholder:"请选择"}},mounted:function(){this.scrollPageState.pageSize=this.pageSize;for(var e=0;e<=this.num;e++){var t=document.getElementsByClassName("qm-container")[e],n=document.getElementsByClassName("qm-select-container")[e],a=r.a.offset(t);document.documentElement.clientWidth-a.left<500?n.style.right=0:n.style.left=0}if("async"===this.async&&this.$emit("findSelectList",this.scrollPageState.scrollPage,this.searchData),"multiple"===this.type){var s="w-"+2.5*+this.size[0].replace(/^\D+/g,"");this.selectStyle=[s]}else this.selectStyle=[this.size[0]]},methods:{open_select_container:function(){this.seleContainerStatus=!0,this.selectStyle.push("animation"),0!==this.selectAllList.length&&this.listen_select_scroll(),"multiple"===this.type&&(document.addEventListener("mousedown",this.mouse_event),this.set_input_left())},mouse_event:function(e){(e.target.offsetParent.className.includes("qm-select-container")||e.target.offsetParent.className.includes("multiple-item")||e.target.offsetParent.className.includes("selected-item"))&&e.preventDefault()},close_select_container:function(){(this.seleContainerStatus=!1,this.selectStyle.splice(1,1),this.reset_select_list(),"default"===this.type)?0!==this.selectAllList.length&&document.getElementsByClassName("default-select")[this.num].removeEventListener("scroll",this.listen_scroll):(document.removeEventListener("mousedown",this.mouse_event),0!==this.selectAllList.length&&document.getElementsByClassName("multiple-all")[this.num].removeEventListener("scroll",this.listen_scroll))},chooseItem:function(e){return"multiple"===this.type?this.selectVal.find((function(t){return t===e})):this.selectVal===e},listen_mouse:function(){var e=this,t=document.getElementsByClassName("qm-select-container")[this.num],n=function(){e.seleContainerStatus=!1,e.selectStyle.splice(1,1),e.reset_select_list(),a()},a=function(){t.removeEventListener("mouseleave",n)};t.addEventListener("mouseleave",n)},listen_select_scroll:function(){"default"===this.type?document.getElementsByClassName("default-select")[this.num].addEventListener("scroll",this.listen_scroll):document.getElementsByClassName("multiple-all")[this.num].addEventListener("scroll",this.listen_scroll)},add_selected_list:function(e){if("multiple"===this.type){this.searchData="";var t=this.selectVal.indexOf(e);-1!==t?this.selectVal.splice(t,1):this.selectVal.push(e),this.set_input_left()}else this.selectVal=e,this.searchData=e.label},set_input_left:function(){var e,t=document.getElementsByClassName("select-input")[this.num];this.selectVal.length>1?(this.placeholder="",e=2.3):1===this.selectVal.length?(this.placeholder="",e=1.3):0===this.selectVal.length&&(this.placeholder="请选择",e=.1),t.style.paddingLeft=55*e+"px"},get_select:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.searchData=e.target.value,t._selectList=t.selectAllList,t.scrollPageState.scrollPage=0,0!==e.target.value.length?(t._selectList=t._selectList.filter((function(t){return-1!==String(t.label).indexOf(e.target.value)})),t.selectList=t._selectList.slice(0,t.scrollPageState.pageSize)):t.selectList=t.selectAllList.slice(0,t.scrollPageState.pageSize);case 4:case"end":return n.stop()}}),n)})))()},reset_select_list:function(){var e=this;this.$nextTick((function(){if("default"===e.type)e.$emit("selectData",e.searchData);else{var t=e.selectVal.map((function(e){return e.value}));e.$emit("selectData",t)}e.scrollPageState.scrollPage=0,e.searchData="","sync"===e.async?(e._selectList=e.selectAllList,e.selectList=e.selectAllList.slice(0,e.scrollPageState.pageSize)):e.selectList=e._selectList}))},listen_scroll:function(e){var t=this;if(!0!==this.scrollLock){this.scrollLock=!0;var n=e.target;window.requestAnimationFrame((function(){t.scrollLock=!1,t.change_scroll(n)}))}},change_scroll:function(e){e.clientHeight>e.scrollHeight-e.scrollTop-20&&(this.scrollPageState.scrollPage+=1,"sync"===this.async?this.selectList=[].concat(Object(s.a)(this.selectList),Object(s.a)(this._selectList.slice(this.scrollPageState.scrollPage*this.scrollPageState.pageSize,(this.scrollPageState.scrollPage+1)*this.scrollPageState.pageSize))):this.$emit("findSelectList",this.scrollPageState.scrollPage,this.searchData))},cancel_check:function(e){for(var t=this.selectVal.length-1;t>=0;t--)this.selectVal[t]===e&&this.selectVal.splice(t,1);this.set_input_left()},clear_all:function(){this.selectVal=[],this.searchData="","default"===this.type?this.$emit("selectData",this.searchData):this.$emit("selectData",this.selectVal)}}},l=(n("386b"),n("2877")),c=Object(l.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"qm-container"},[n("div",{staticClass:"qm-select-header"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchData,expression:"searchData"}],staticClass:"select-input",class:e.size,attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.searchData},on:{input:[function(t){t.target.composing||(e.searchData=t.target.value)},e.get_select],focus:e.open_select_container,blur:e.close_select_container}}),"multiple"===e.type?n("div",{staticClass:"select-tag"},[e.selectVal.length>=1?n("span",[e._v(e._s(e.selectVal[0].label))]):e._e(),e.selectVal.length>1?n("span",[e._v("+"+e._s(e.selectVal.length-1))]):e._e()]):e._e(),0!=e.selectVal.length||""!=e.searchData?n("div",{staticClass:"clear-all",on:{click:e.clear_all}}):e._e(),2!==e.selectStyle.length&&0===e.selectVal.length?n("div",{staticClass:"arrow-bottom"}):e._e()]),n("div",{staticClass:"qm-select-container",class:e.selectStyle},["default"===e.type?n("div",[0===e.selectAllList.length&&e.loading?n("div",{staticClass:"loading"},e._l(5,(function(e){return n("span",{key:e})})),0):n("div",{staticClass:"default-select"},e._l(e.selectList,(function(t,a){return n("div",{key:a,staticClass:"default-item",class:{choose:e.chooseItem(t)},on:{mousedown:function(n){return e.add_selected_list(t)}}},[n("span",[e._v(e._s(t.label))])])})),0)]):n("div",[0===e.selectAllList.length&&e.loading?n("div",{staticClass:"loading"},e._l(5,(function(e){return n("span",{key:e})})),0):n("div",[e._m(0),n("div",{staticClass:"select-multiple"},[n("div",{staticClass:"multiple-all"},e._l(e.selectList,(function(t,a){return n("div",{key:a,staticClass:"multiple-item",class:{choose:e.chooseItem(t)},on:{click:function(n){return e.add_selected_list(t)}}},[n("span",[e._v(e._s(t.label))]),e.chooseItem(t)?n("span",{staticClass:"icon"},[e._v("✓")]):e._e()])})),0),n("div",{staticClass:"multiple-middle"},[e._v(" ⇄ ")]),n("div",{staticClass:"multiple-selected"},e._l(e.selectVal,(function(t,a){return n("div",{key:a,staticClass:"selected-item",on:{click:function(n){return e.cancel_check(t)}}},[n("span",[e._v(e._s(t.label))]),n("span",{staticClass:"icon"},[e._v("✓")])])})),0)])])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"multiple-title"},[t("span",[this._v("全部选项列表")]),t("span"),t("span",[this._v("已选择选项列表")])])}],!1,null,"7a20bf88",null);t.default=c.exports},"386b":function(e,t,n){"use strict";n("da6c")},"3e90":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"nav-left"},[t("img",{attrs:{src:n("9d64"),alt:""}})])}],r=n("8e1e"),i={data:function(){return{}},mounted:function(){var e=document.getElementsByClassName("qm-watermark")[0],t={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,style:{position:"absolute",zIndex:"999",left:"0",pointerEvents:"none"}};r.a.htmlTocanvas(e,t)}},l=(n("7acb"),n("2877")),c={components:{waterMark:Object(l.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"qm-watermark"},e._l(16,(function(t){return n("h1",{key:"line"+t},e._l(60,(function(t){return n("span",{key:"name"+t},[e._v(e._s(e.$store.state.username))])})),0)})),0)}),[],!1,null,"dd12b546",null).exports}},o=(n("5c0b"),Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("water-mark"),n("div",{staticClass:"nav-container"},[e._m(0),n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("下拉框")]),e._v(" | "),n("router-link",{attrs:{to:"/waterMark"}},[e._v("水印图")]),e._v(" | "),n("router-link",{attrs:{to:"/darg-to-recycle"}},[e._v("拖拽致回收站")]),e._v(" | "),n("router-link",{attrs:{to:"/image-zoom"}},[e._v("图片放大器")]),e._v(" | "),n("router-link",{attrs:{to:"/skeleton"}},[e._v("骨架屏")]),e._v(" | "),n("router-link",{attrs:{to:"/qm-swiper"}},[e._v("轮播图")]),e._v(" | "),n("router-link",{attrs:{to:"/qm-swiper-app"}},[e._v("移动端")])],1)]),n("router-view")],1)}),s,!1,null,null,null).exports),u=n("9483");Object(u.a)("".concat("","service-worker.js"),{ready:function(){},registered:function(){},cached:function(){},updatefound:function(){},updated:function(){},offline:function(){},error:function(e){}});n("d3b7"),n("3ca3"),n("ddb0");var f=n("8c4f"),d=n("1da1"),h=(n("96cf"),n("cb29"),n("d81d"),n("fb6a"),{name:"Home",components:{bigSelect:n("1ef8").default},data:function(){return{list:[],show:"",defaultCheckedList:[]}},mounted:function(){var e=this;return Object(d.a)(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=new Array(1e4).fill(1),a=n.map((function(){var t=e.getRandom(10);return{value:t,label:t}})),setTimeout((function(){e.list=a,e.defaultCheckedList=e.list.slice(0,166)}),5e3);case 3:case"end":return t.stop()}}),t)})))()},methods:{getRandom:function(e){return Math.floor((Math.random()+Math.floor(9*Math.random()+1))*Math.pow(10,e-1))}}}),m=(n("803f"),Object(l.a)(h,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"home"},[t("big-select",{attrs:{selectAllList:this.list,type:"multiple",defaultCheckedList:this.defaultCheckedList,num:0}})],1)}),[],!1,null,"b0b59b68",null).exports),p=n("2f62");a.a.use(p.a);var g=new p.a.Store({state:{username:"王三二",watermarkFlag:!1},mutations:{SET_WATERMARK_FLAG:function(e,t){e.watermarkFlag=t}},actions:{},modules:{}});a.a.use(f.a);var v=[{path:"/",name:"Home",component:m},{path:"/waterMark",name:"WaterMark",component:function(){return n.e("about").then(n.bind(null,"622d"))}},{path:"/big-select",name:"BigSelect",component:function(){return n.e("about").then(n.bind(null,"1ef8"))}},{path:"/darg-to-recycle",name:"DargToRecycle",component:function(){return n.e("about").then(n.bind(null,"b0a3"))}},{path:"/image-zoom",name:"ImageZoom",component:function(){return n.e("about").then(n.bind(null,"9688"))}},{path:"/skeleton",name:"Skeleton",component:function(){return n.e("about").then(n.bind(null,"5361"))}},{path:"/qm-swiper",name:"QmSwiper",component:function(){return n.e("about").then(n.bind(null,"411f"))}},{path:"/qm-swiper-app",name:"QmSwiperApp",component:function(){return n.e("about").then(n.bind(null,"1b3f"))}}],b=new f.a({routes:v});b.beforeEach((function(e,t,n){document.title="测试",g.commit("SET_WATERMARK_FLAG",!1),n()})),b.afterEach((function(){setTimeout((function(){g.commit("SET_WATERMARK_FLAG",!0)}),100)}));var y=b,_=n("5efb"),w=n("0020"),k=n("b558"),L=n("9839"),x=n("a79d8"),S=n("0c63"),C=n("bb76"),E=n("8592"),O=n("f64c");n("202f");a.a.use(_.a),a.a.use(w.a),a.a.use(k.a),a.a.use(L.b),a.a.use(x.a),a.a.use(S.a),a.a.use(C.a),a.a.use(E.a),a.a.prototype.$message=O.a,a.a.config.productionTip=!1,new a.a({router:y,store:g,render:function(e){return e(o)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"7acb":function(e,t,n){"use strict";n("fa05")},"803f":function(e,t,n){"use strict";n("3e90")},"8e1e":function(e,t,n){"use strict";var a,s=n("ade3"),r=n("b85c"),i=n("1da1"),l=(n("96cf"),n("1276"),n("ac1f"),n("5319"),n("fb6a"),n("a434"),n("99af"),n("d3b7"),n("a630"),n("3ca3"),n("b0c0"),n("159b"),n("2b3d"),n("ddb0"),{});l.throttle_event=function(e,t){if(clearTimeout(e.__timebar),!0!==t){var n={time:(t=t||{}).time||200,context:t.context||null,args:t.args};e.__timebar=setTimeout((function(){e.apply(n.context,n.args)}),n.time)}},l.throttle=function(e,t,n,a){e.__lock||(e.__lock=!0,e.apply(n,a),setTimeout((function(){e.__lock=!1}),t||1e3))},l.offset=function(e){for(var t={left:e.offsetLeft,top:e.offsetTop};e!==document.body;)e=e.offsetParent,t.left+=e.offsetLeft+e.clientLeft,t.top+=e.offsetTop+e.clientTop;return t},l.css=function(e,t,n){if("string"==typeof t)e.style[t]=n;else for(var a in t)l.css(e,a,t[a])},l.imageZoom=function(e,t,n,a){var s=document.createElement("div"),r=document.createElement("div");function i(e){var t=e.pageX-c.left,i=e.pageY-c.top;(t-=n/8)<0?t=0:t>3*n/4&&(t=3*n/4),(i-=a/8)<0?i=0:i>3*a/4&&(i=3*a/4),l.throttle((function(){!function(e,t){l.css(s,{left:e+"px",top:t+"px"})}(t,i)})),function(e,t){l.css(r,{backgroundPositionX:-4*e+"px",backgroundPositionY:-4*t+"px"})}(t,i)}e.appendChild(s),e.appendChild(r),l.css(e,{width:n+"px",height:a+"px",position:"relative",backgroundImage:"url("+t+")",backgroundSize:"cover",border:"1px solid #ccc"}),l.css(s,{width:n/4+"px",height:a/4+"px",position:"absolute",top:0,left:0,backgroundColor:"yellow",opacity:.5,cursor:"move",display:"none"}),l.css(r,{width:n+"px",height:a+"px",position:"absolute",top:0,left:"100%",background:"url("+t+") no-repeat",backgroundSize:"400%",border:"1px solid #ccc",display:"none"});var c=l.offset(e);e.addEventListener("mouseenter",(function(){l.css(s,"display","block"),l.css(r,"display","block"),document.addEventListener("mousemove",i)})),e.addEventListener("mouseleave",(function(){l.css(s,"display","none"),l.css(r,"display","none"),document.removeEventListener("mousemove",i)}))},l.bindEvent=function(e,t,n){if("mousewheel"===t&&/firefox/i.test(navigator.userAgent)&&(t="DOMMouseScroll"),e.addEventListener)e.addEventListener(t,n);else if(e.attachEvent)e.attachEvent("on"+t,(function(t){t.target=t.srcElement,t.currentTarget=this,n.call(e,t)}));else{var a=e["on"+t];e["on"+t]=function(e){a&&a(e||window.event),n(e||window.event)}}},l.removeEvent=function(e,t,n){"mousewheel"===t&&/firefox/i.test(navigator.userAgent)&&(t="DOMMouseScroll"),e.removeEventListener?e.removeEventListener(t,n):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null},l.formatTime=function(e,t){t=t?new Date(t):new Date;var n={},a=e.split(/[ymd]+/g),s=e.indexOf("y"),r=e.indexOf("m"),i=e.indexOf("d"),l="";switch(!0){case-1!==s:/yyyy/i.test(e)?n.year=t.getFullYear():n.year=t.getFullYear().substr(2,2);break;case-1!==r:if(-1!==e.indexOf("mm")){var c=t.getMonth()+1;n.month=n.month<=9?"0":""+c}else n.month=t.getMonth().substr(1,1)+1;break;case-1!==i:if(-1!==e.indexOf("dd")){var o=t.getDate();n.date=n.date<=9?"0":""+o}else n.date=t.getDate().substr(1,1)}return s>=0&&r>=0&&i>=0?s<r&&r<i?l=a[0]+" "+n.year+" "+a[1]+" "+n.month+" "+a[2]+" "+n.date+" "+a[3]:i<r&&r<s?l=a[0]+" "+n.date+" "+a[1]+" "+n.month+" "+a[2]+" "+n.year+" "+a[3]:r<i&&i<s&&(l=a[0]+" "+n.month+" "+a[1]+" "+n.date+" "+a[2]+" "+n.year+" "+a[3]):l=s>r?a[0]+" "+n.month+" "+a[1]+" "+n.year+" "+a[2]:a[0]+" "+n.year+" "+a[1]+" "+n.month+" "+a[2],l},l.formatTime2=function(e,t){var n=t?new Date(t):new Date;return e.replace(/(y{1,4})/g,(function(e,t){var a=n.getFullYear();return String(a).slice(4-t.length)})).replace(/(m{1,2})/g,(function(e,t){var a=n.getMonth()+1;return 2===t.length&&1===a.length?"0"+a:a})).replace(/(d{1,2})/g,(function(e,t){var a=String(n.getDate());return 2===t.length&&1===a.length?"0"+a:a}))},l.countdown=function(e,t){var n=new Date(t).getTime();function a(){var t=Date.now(),a=(n-t)/1e3/60,s=a/60,r=s/24;e.innerHTML=Math.floor(r)+"天:"+Math.floor(r%24)+"时："+Math.floor(a%60)+"分："+Math.floor(s%60)+"秒"}a(),setInterval((function(){a()}),800)},l.Observer=(a={},{on:function(e,t){a[e]?a[e].push(t):a[e]=[t]},trigger:function(e){if(a[e])for(var t=Array.prototype.slice.call(arguments,1),n=0;n<a[e].length;n++)a[e][n].apply(null,t)},off:function(e,t){if(void 0!==e)if(t){for(var n=a[e].length-1;n>=0;n--)if(a[e][n]===t)return void a[e].splice(n,1)}else a[e]=[];else a={}},once:function(e,t){var n=this;this.on(e,(function a(){n.off(e,a),t.apply(null,arguments)}))}}),l.inherit=function(e,t){function n(){this.constructor=e}for(var a in n.prototype=t.prototype,e.prototype=new n,t)t.hasOwnProperty(a)&&(e[a]=t[a]);return e},l.ajax=function(e){if("string"!=typeof(e=Object.assign({url:"",method:"GET",data:"",headers:{},async:!0},e)).data){var t="";for(var n in e.data)t+="&".concat(n,"=").concat(e.data[n]);e.data=t.slice(1)}return"GET"===e.method.toUpperCase()&&(e.url+="?"+e.data),new Promise((function(t,n){var a;if(window.XMLHttpRequest)a=new XMLHttpRequest;else{if(!window.ActiveXObject)return alert("您的浏览器不支持"),n("您的浏览器不支持");a=new ActiveXObject}if(a.onreadystatechange=function(){4===a.readyState&&(200===a.status||304===a.status?t(JSON.parse(a.responseText)):n("请求失败"))},a.open(e.method,e.url,e.async),e.headers)for(var s in e.headers)a.setRequestHeader(s,e.headers[s]);a.send(e.data)}))},l.serialize=function(e){var t="";return Array.from(e.elements,(function(e){e.name&&("checkbox"===e.type||"radio"===e.type?e.checked&&(t+="&".concat(e.name,"=").concat(e.value)):t+="&".concat(e.name,"=").concat(e.value))})),t.slice(1)},l.htmlTocanvas=function(e,t){t=Object.assign({width:100,height:100,style:{}},t);var n=document.createElement("canvas");if(n.id="canvas",n.width=t.width,n.height=t.height,"{}"!==JSON.stringify(t.style))for(var a in t.style)l.css(n,"".concat(a),"".concat(t.style[a]));var s=n.getContext("2d");function c(){return(c=Object(i.a)(regeneratorRuntime.mark((function t(){var a,r,i,l,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o(e);case 2:a=t.sent,r=window.URL||window.webkitURL||window,i=new Image,l=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),c=r.createObjectURL(l),n.setAttribute("crossorigin","Anonymous"),i.src=c,i.onload=function(){s.drawImage(i,0,0);var t=e.parentNode;t.insertBefore(n,e),r.revokeObjectURL(c),t.removeChild(e)};case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function o(e){return u.apply(this,arguments)}function u(){return(u=Object(i.a)(regeneratorRuntime.mark((function e(n){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(n,!0);case 2:return a=e.sent,e.abrupt("return",'\n                <svg xmlns="http://www.w3.org/2000/svg" width = "'.concat(t.width,'" height = "').concat(t.height,'">\n                    <foreignObject width="100%" height="100%">\n                         ').concat(a,"\n                    </foreignObject>\n\n                </svg>\n            "));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e,t){return d.apply(this,arguments)}function d(){return(d=Object(i.a)(regeneratorRuntime.mark((function e(t,n){var a,s,i,l,c,o,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.tagName.toLowerCase(),s="<".concat(a," "),i=!0,n&&(s+='xmlns="http://www.w3.org/1999/xhtml" '),"<img "!==s){e.next=17;break}if(i=!1,l="",!(t.src.length>3e4)){e.next=11;break}l=t.src,e.next=14;break;case 11:return e.next=13,m(t.src);case 13:l=e.sent;case 14:s+='src="'.concat(l,'" style="').concat(h(t),'" />\n'),e.next=18;break;case 17:s+='style="'.concat(h(t),'">\n');case 18:if(!t.children.length){e.next=40;break}c=Object(r.a)(t.children),e.prev=20,c.s();case 22:if((o=c.n()).done){e.next=30;break}return u=o.value,e.t0=s,e.next=27,f(u);case 27:s=e.t0+=e.sent;case 28:e.next=22;break;case 30:e.next=35;break;case 32:e.prev=32,e.t1=e.catch(20),c.e(e.t1);case 35:return e.prev=35,c.f(),e.finish(35);case 38:e.next=41;break;case 40:s+=t.innerHTML;case 41:return i&&(s+="</".concat(a,">\n")),e.abrupt("return",s);case 43:case"end":return e.stop()}}),e,null,[[20,32,35,38]])})))).apply(this,arguments)}function h(e){var t,n=window.getComputedStyle(e),a="",s=Object(r.a)(n);try{for(s.s();!(t=s.n()).done;){var i=t.value;a+="".concat(i,":").concat(n[i],";")}}catch(l){s.e(l)}finally{s.f()}return a}function m(e){var t=new Image;return t.src=e,new Promise((function(e){t.onload=function(){var n=document.createElement("canvas");n.id="image",n.width=t.width,n.height=t.height,n.getContext("2d").drawImage(t,0,0,t.width,t.height);var a=t.src.substring(t.src.lastIndexOf(".")+1).toLowerCase(),s=n.toDataURL("image/"+a);e(s)}}))}new MutationObserver((function(e){e.forEach((function(e){"attributes"==e.type&&(n.style.display="block",n.style.opacity="1",n.style.visibility="visible")}))})).observe(n,{attributes:!0,attributeFilter:["style"]}),function(){c.apply(this,arguments)}()},l.skeleton=function(e,t,n){var a=[];function c(){return(c=Object(i.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o(e),n.next=3,t();case 3:n.sent&&u(e);case 5:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function o(e){if(e.children.length){var t,n=Object(r.a)(e.children);try{for(n.s();!(t=n.n()).done;){o(t.value)}}catch(c){n.e(c)}finally{n.f()}}else{a.push(Object(s.a)({},e.tagName+function(e){for(var t="",n=0;n<e;n++)t+=Math.floor(10*Math.random())+"";return t}(4),window.getComputedStyle(e)["background-color"]));var i=window.getComputedStyle(e);0===e.clientHeight&&l.css(e,{display:"block",height:parseInt(i["font-size"])+parseInt(i["padding-top"])+parseInt(i["padding-bottom"])+"px"}),0===e.clientWidth&&l.css(e,{display:"block",width:"200px",borderRadius:"20px"}),l.css(e,{backgroundColor:"rgba(240, 240, 240, 0.9)",color:"rgba(240, 240, 240, 0.9)",borderRadius:"10px"})}}function u(e){if(e.children.length){var t,n=Object(r.a)(e.children);try{for(n.s();!(t=n.n()).done;){u(t.value)}}catch(a){n.e(a)}finally{n.f()}}else""!==e.style.width?l.css(e,{backgroundColor:"#fff",color:"black",width:"auto",height:"auto"}):l.css(e,{backgroundColor:"#fff",color:"black",height:"auto"})}!function(){c.apply(this,arguments)}()},t.a=l},"9c0c":function(e,t,n){},"9d64":function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},da6c:function(e,t,n){},fa05:function(e,t,n){}});
//# sourceMappingURL=app.8602f8ab.js.map