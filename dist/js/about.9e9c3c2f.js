(window.webpackJsonp=window.webpackJsonp||[]).push([["about"],{"0a18":function(t,e,i){},"1b3f":function(t,e,i){"use strict";i.r(e);i("a9e3"),i("5319"),i("ac1f");var n={props:{width:{type:String||Number,default:"800"},lunboTime:{type:Number,default:3e3},imgList:{type:Array}},data:function(){return{index:0,timebar:"",boxs:"",startX:0,endX:0,containerWidth:"",containerHeight:""}},watch:{imgList:{immediate:!0,handler:function(t){var e=this;0!==t.length&&this.$nextTick((function(){e.container=document.querySelector(".container"),e.boxs=document.querySelector(".lunbo"),null!==e.lunboTime&&e.start_time()}))}},width:{immediate:!0,handler:function(t){var e=this;this.$nextTick((function(){var i=new Image;if(i.src=e.imgList[0].url,-1!==t.indexOf("%")){var n=t.replace("%","");e.containerWidth="w-p-"+n,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*(t.path[0].height/2)/(t.path[0].width/2)+"rem"}}}else e.containerWidth="w-"+t,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width/2+"rem"}}}))}}},methods:{time_set:function(){this.index++,this.index>=this.imgList.length&&(this.index=0),this.animate_img()},start_time:function(){null!==this.lunboTime&&(this.timebar=setInterval(this.time_set,this.lunboTime))},clear_interval:function(){null!==this.lunboTime&&clearInterval(this.timebar)},touch_down:function(t){var e=this;this.clear_interval(),setTimeout((function(){e.boxs.style.transition="none",e.startX=t.changedTouches[0].clientX,e.boxs.addEventListener("touchmove",e.touch_move),document.addEventListener("touchend",e.touch_up)}),100)},touch_up:function(t){var e=this.container.clientWidth;this.endX=t.changedTouches[0].clientX,this.boxs.style.transition="all .5s",this.endX-this.startX<=-e/2?(this.index++,this.index>=this.imgList.length&&(this.index=this.imgList.length-1),this.animate_img(this.start_time)):this.endX-this.startX>=e/2?(this.index--,this.index<0&&(this.index=0),this.animate_img(this.start_time)):this.animate_img(this.start_time),this.boxs.removeEventListener("touchmove",this.touch_move),document.removeEventListener("touchend",this.touch_up)},touch_move:function(t){var e=this.container.clientWidth;this.boxs.style.left=-this.index*e+t.changedTouches[0].clientX-this.startX+"rem"},animate_img:function(t){var e=this.container.clientWidth;this.boxs.style.left=-this.index*e+"rem",t&&t()}}},s=(i("e692"),i("2877")),r=Object(s.a)(n,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",class:t.containerWidth,style:t.containerHeight},[i("div",{staticClass:"lunbo",on:{touchstart:t.touch_down}},t._l(t.imgList,(function(e){return i("img",{key:e.key,style:t.containerHeight,attrs:{src:e.url,alt:""},on:{mousedown:function(t){return t.preventDefault()}}})})),0),i("div",{staticClass:"desc"},[i("span",[t._v(t._s(t.index+1+"/"+t.imgList.length))])])])}),[],!1,null,"198f93f2",null).exports,a={props:{width:{type:String||Number,default:"800"},lunboTime:{type:Number,default:3e3},imgList:{type:Array}},data:function(){return{index:0,timebar:"",boxs:"",smallBtn:"",startY:0,endY:0,containerWidth:"",containerHeight:""}},watch:{imgList:{immediate:!0,handler:function(t){var e=this;0!==t.length&&this.$nextTick((function(){e.container=document.querySelector(".container"),e.boxs=document.querySelector(".lunbo"),e.smallBtn=document.querySelectorAll(".smallBtn span"),e.smallBtn[0].setAttribute("class","choose"),null!==e.lunboTime&&e.start_time()}))}},width:{immediate:!0,handler:function(t){var e=this;this.$nextTick((function(){var i=new Image;if(i.src=e.imgList[0].url,-1!==t.indexOf("%")){var n=t.replace("%","");e.containerWidth="w-p-"+n,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width+"rem"}}}else e.containerWidth="w-"+t,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width+"rem"}}}))}}},methods:{time_set:function(){this.index++,this.index>=this.imgList.length&&(this.index=0),this.animate_img()},start_time:function(){null!==this.lunboTime&&(this.timebar=setInterval(this.time_set,this.lunboTime))},clear_interval:function(){null!==this.lunboTime&&clearInterval(this.timebar)},touch_down:function(t){this.clear_interval(),this.boxs.style.transition="none",this.startY=t.changedTouches[0].clientY,this.boxs.addEventListener("touchmove",this.touch_move),document.addEventListener("touchend",this.touch_up)},touch_up:function(t){var e=this.container.clientHeight;this.endY=t.changedTouches[0].clientY,this.boxs.style.transition="all .5s",this.endY-this.startY<=-e/2?(this.index++,this.index>=this.imgList.length&&(this.index=this.imgList.length-1),this.animate_img(this.start_time)):this.endY-this.startY>=e/2?(this.index--,this.index<0&&(this.index=0),this.animate_img(this.start_time)):this.animate_img(this.start_time),this.boxs.removeEventListener("touchmove",this.touch_move),document.removeEventListener("touchup",this.touch_up)},touch_move:function(t){var e=this.container.clientHeight;this.boxs.style.top=-this.index*e+t.changedTouches[0].clientY-this.startY+"rem"},left:function(){this.clear_interval(),this.index--,this.index<0&&(this.index=this.imgList.length-1),this.animate_img(this.start_time)},right:function(){this.clear_interval(),this.index++,this.index>=this.imgList.length&&(this.index=0),this.animate_img(this.start_time)},animate_img:function(t){var e=this.container.clientHeight;this.boxs.style.top=-this.index*e+"rem";for(var i=0;i<this.smallBtn.length;i++)i===+this.index?this.smallBtn[i].setAttribute("class","choose"):this.smallBtn[i].setAttribute("class","");t&&t()},change_img:function(t){""!==t.target.id&&(this.clear_interval(),this.index=t.target.id,this.animate_img(this.start_time))}}},o=(i("2d99"),{components:{QmSwiperX:r,QmSwiperY:Object(s.a)(a,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",class:t.containerWidth,style:t.containerHeight},[i("div",{staticClass:"lunbo",on:{touchstart:t.touch_down}},t._l(t.imgList,(function(e){return i("img",{key:e.key,style:t.containerHeight,attrs:{src:e.url,alt:""},on:{mousedown:function(t){return t.preventDefault()}}})})),0),i("div",{staticClass:"smallBtn",on:{click:t.change_img}},t._l(t.imgList,(function(t){return i("span",{key:t.key,attrs:{id:t.key}})})),0)])}),[],!1,null,"2e9fea96",null).exports},props:{swiperStyle:{type:String,default:"x"},width:{type:String||Number,default:"800"},lunboTime:{type:Number,default:3e3},imgList:{type:Array}}}),l={components:{QmSwiper:Object(s.a)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["x"===t.swiperStyle?[i("qm-Swiper-x",{attrs:{imgList:t.imgList,lunboTime:t.lunboTime,width:t.width}})]:"y"===t.swiperStyle?[i("qm-Swiper-y",{attrs:{imgList:t.imgList,lunboTime:t.lunboTime,width:t.width}})]:t._e()],2)}),[],!1,null,"2b8789ae",null).exports},data:function(){return{imgList:[{key:0,url:i("3ef4")},{key:1,url:i("f158")},{key:2,url:i("fdc1")}]}}},c=Object(s.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("qm-swiper",{attrs:{swiperStyle:"y",imgList:this.imgList,lunboTime:null,width:"100%"}})}),[],!1,null,null,null);e.default=c.exports},"22b1":function(t,e,i){},"25f0":function(t,e,i){"use strict";var n=i("6eeb"),s=i("825a"),r=i("d039"),a=i("ad6d"),o=RegExp.prototype,l=o.toString,c=r((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),h="toString"!=l.name;(c||h)&&n(RegExp.prototype,"toString",(function(){var t=s(this),e=String(t.source),i=t.flags;return"/"+e+"/"+String(void 0===i&&t instanceof RegExp&&!("flags"in o)?a.call(t):i)}),{unsafe:!0})},"2a2d":function(t,e,i){},"2d99":function(t,e,i){"use strict";i("d4f9")},"2dc7":function(t,e,i){"use strict";i("6150")},"3ef4":function(t,e,i){t.exports=i.p+"img/1.efb8a547.jpeg"},"411f":function(t,e,i){"use strict";i.r(e);i("a9e3"),i("5319"),i("ac1f"),i("159b");var n=i("2877"),s=Object(n.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"icon",attrs:{t:"1619146160212",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3574",width:"200",height:"200"}},[e("path",{attrs:{d:"M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z","p-id":"3575",fill:"#1296db"}})])}),[],!1,null,null,null).exports,r=Object(n.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"icon",attrs:{t:"1619145074367",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2944",width:"200",height:"200"}},[e("path",{attrs:{d:"M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z","p-id":"2945",fill:"#1296db"}})])}),[],!1,null,null,null).exports,a=i("8e1e"),o={components:{iconLeftArrow:s,iconRightArrow:r},props:{width:{type:String||Number},lunboTime:{type:Number},imgList:{type:Array},lunboType:{type:String}},data:function(){return{index:0,timebar:"",boxs:"",smallBtn:"",startX:0,endX:0,containerWidth:"",containerHeight:"",zIndex:2}},watch:{imgList:{immediate:!0,handler:function(t){var e=this;0!==t.length&&this.$nextTick((function(){if(e.container=document.querySelector(".container"),e.boxs=document.querySelector(".lunbo"),e.smallBtn=document.querySelectorAll(".smallBtn span"),e.smallBtn[0].setAttribute("class","choose"),null!==e.lunboTime&&e.start_time(),"moive"===e.lunboType){var t=document.querySelector(".movie-container");a.a.css(t,{width:"100%",overflow:"hidden"}),a.a.css(e.container,{backgroundColor:"transparent",overflow:"visible"})}}))}},width:{immediate:!0,handler:function(t){var e=this;this.$nextTick((function(){var i=new Image;i.src=e.imgList[0].url;var n=0;if(-1!==t.indexOf("%")){var s=t.replace("%","");e.containerWidth="w-p-"+s,n=e.container.clientWidth*s/100}else e.containerWidth="w-"+t,n=t;e.imgList.forEach((function(t,i){0!==i&&a.a.css(e.boxs.children[i],{transform:"translateX(".concat(n,"px) translateZ(-1000px)")})})),a.a.css(e.boxs.children[e.imgList.length-1],{transform:"translateX(".concat(-n,"px) translateZ(-1000px)")}),i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width+"px"}}}))}}},methods:{time_set:function(){this.animate_img(null,"right")},mouse_wheel:function(t){t.wheelDelta>0?this.right():t.wheelDelta<0&&this.left()},start_time:function(){null!==this.lunboTime&&(this.timebar=setInterval(this.time_set,this.lunboTime))},clear_interval:function(){null!==this.lunboTime&&clearInterval(this.timebar)},mouse_down:function(t){this.clear_interval(),a.a.css(this.boxs,{transition:"none"}),this.startX=t.clientX,document.addEventListener("mouseup",this.mouse_up)},mouse_up:function(t){var e=this.container.clientWidth;this.endX=t.clientX,a.a.css(this.boxs,{transition:"all .5s"}),this.endX-this.startX<=-e/2?this.animate_img(this.start_time,"left"):this.endX-this.startX>=e/2&&this.animate_img(this.start_time,"right"),document.removeEventListener("mouseup",this.mouse_up)},left:function(){this.clear_interval(),this.animate_img(this.start_time,"left")},right:function(){this.clear_interval(),this.animate_img(this.start_time,"right")},animate_img:function(t,e){var i=this.container.clientWidth,n=0;"left"===e?(i=-i,a.a.css(this.boxs.children[this.index],{zIndex:this.zIndex-1+"",transform:"translateX(".concat(-i,"px)")}),this.index--,this.index<0&&(this.index=this.imgList.length-1),n=0===this.index?this.imgList.length-1:this.index-1):"right"===e&&(a.a.css(this.boxs.children[this.index],{zIndex:this.zIndex-1+"",transform:"translateX(".concat(-i,"px)")}),this.index++,this.index>this.imgList.length-1&&(this.index=0),n=this.index+1===this.imgList.length?0:this.index+1),a.a.css(this.boxs.children[n],{zIndex:this.zIndex-1+"",transform:"translateX(".concat(i,"px)")}),a.a.css(this.boxs.children[this.index],{zIndex:this.zIndex+++"",transform:"translateX(0px)"});for(var s=0;s<this.smallBtn.length;s++)s===+this.index?("moive"===this.lunboType&&a.a.css(this.boxs.children[s],{transform:"translateZ(0px)"}),this.smallBtn[s].setAttribute("class","choose")):("moive"===this.lunboType&&a.a.css(this.boxs.children[s],{transform:this.boxs.children[s].style.transform+"translateZ(-1000px)"}),this.smallBtn[s].setAttribute("class",""));t&&t()},change_img:function(t){""!==t.target.id&&(this.clear_interval(),this.index<t.target.id?(this.index=0===t.target.id?1:+t.target.id-1,this.animate_img(this.start_time,"right")):this.index>t.target.id&&(this.index=t.target.id===this.imgList.length-1?this.imgList.length-2:+t.target.id+1,this.animate_img(this.start_time,"left")))}}},l=(i("d01e"),Object(n.a)(o,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"movie-container"},[i("div",{staticClass:"container",class:t.containerWidth,style:t.containerHeight},[i("div",{staticClass:"lunbo",class:t.containerWidth,style:t.containerHeight,on:{mousedown:t.mouse_down,mousewheel:t.mouse_wheel}},t._l(t.imgList,(function(e){return i("img",{key:e.key,style:t.containerHeight,attrs:{src:e.url,alt:""},on:{mousedown:function(t){return t.preventDefault()}}})})),0),i("span",{staticClass:"left",on:{click:t.left}},[i("iconLeftArrow")],1),i("span",{staticClass:"right",on:{click:t.right}},[i("iconRightArrow")],1),i("div",{staticClass:"smallBtn",on:{click:t.change_img}},t._l(t.imgList,(function(t){return i("span",{key:t.key,attrs:{id:t.key}})})),0)])])}),[],!1,null,"6811f428",null).exports),c={props:{width:{type:String||Number,default:"800"},lunboTime:{type:Number,default:3e3},imgList:{type:Array}},data:function(){return{index:0,timebar:"",boxs:"",smallBtn:"",startY:0,endY:0,containerWidth:"",containerHeight:""}},watch:{imgList:{immediate:!0,handler:function(t){var e=this;0!==t.length&&this.$nextTick((function(){e.container=document.querySelector(".container"),e.boxs=document.querySelector(".lunbo"),e.smallBtn=document.querySelectorAll(".smallBtn span"),e.smallBtn[0].setAttribute("class","choose"),null!==e.lunboTime&&e.start_time()}))}},width:{immediate:!0,handler:function(t){var e=this;this.$nextTick((function(){var i=new Image;if(i.src=e.imgList[0].url,-1!==t.indexOf("%")){var n=t.replace("%","");e.containerWidth="w-p-"+n,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width+"px"}}}else e.containerWidth="w-"+t,i.onload=function(t){e.containerHeight={height:e.container.clientWidth*t.path[0].height/t.path[0].width+"px"}}}))}}},methods:{time_set:function(){this.index++,this.index>=this.imgList.length&&(this.index=0),this.animate_img()},mouse_wheel:function(t){t.wheelDelta>0?this.right():t.wheelDelta<0&&this.left()},start_time:function(){null!==this.lunboTime&&(this.timebar=setInterval(this.time_set,this.lunboTime))},clear_interval:function(){null!==this.lunboTime&&clearInterval(this.timebar)},mouse_down:function(t){this.clear_interval(),this.boxs.style.transition="none",this.startY=t.clientY,this.boxs.addEventListener("mousemove",this.mouse_move),document.addEventListener("mouseup",this.mouse_up)},mouse_up:function(t){var e=this.container.clientHeight;this.endY=t.clientY,this.boxs.style.transition="all .5s",this.endY-this.startY<=-e/2?(this.index++,this.index>=this.imgList.length&&(this.index=this.imgList.length-1),this.animate_img(this.start_time)):this.endY-this.startY>=e/2?(this.index--,this.index<0&&(this.index=0),this.animate_img(this.start_time)):this.animate_img(this.start_time),this.boxs.removeEventListener("mousemove",this.mouse_move),document.removeEventListener("mouseup",this.mouse_up)},mouse_move:function(t){var e=this.container.clientHeight;a.a.css(this.boxs,{transform:"translateY(".concat(-this.index*e+t.clientY-this.startY,"px)")})},left:function(){this.clear_interval(),this.index--,this.index<0&&(this.index=this.imgList.length-1),this.animate_img(this.start_time)},right:function(){this.clear_interval(),this.index++,this.index>=this.imgList.length&&(this.index=0),this.animate_img(this.start_time)},animate_img:function(t){var e=this.container.clientHeight;a.a.css(this.boxs,{transform:"translateY(".concat(-this.index*e,"px)")});for(var i=0;i<this.smallBtn.length;i++)i===+this.index?this.smallBtn[i].setAttribute("class","choose"):this.smallBtn[i].setAttribute("class","");t&&t()},change_img:function(t){""!==t.target.id&&(this.clear_interval(),this.index=t.target.id,this.animate_img(this.start_time))}}},h=(i("a157"),{components:{QmSwiperX:l,QmSwiperY:Object(n.a)(c,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",class:t.containerWidth,style:t.containerHeight},[i("div",{staticClass:"lunbo",on:{mousedown:t.mouse_down,mousewheel:t.mouse_wheel}},t._l(t.imgList,(function(e){return i("img",{key:e.key,style:t.containerHeight,attrs:{src:e.url,alt:""},on:{mousedown:function(t){return t.preventDefault()}}})})),0),i("div",{staticClass:"smallBtn",on:{click:t.change_img}},t._l(t.imgList,(function(t){return i("span",{key:t.key,attrs:{id:t.key}})})),0)])}),[],!1,null,"5e23cae0",null).exports},props:{swiperStyle:{type:String,default:"x"},width:{type:String||Number,default:"800"},lunboTime:{type:Number,default:3e3},imgList:{type:Array},lunboType:{type:String,default:"default"}}}),u={components:{QmSwiper:Object(n.a)(h,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["x"===t.swiperStyle?[i("qm-Swiper-x",{attrs:{imgList:t.imgList,lunboTime:t.lunboTime,width:t.width,lunboType:t.lunboType}})]:"y"===t.swiperStyle?[i("qm-Swiper-y",{attrs:{imgList:t.imgList,lunboTime:t.lunboTime,width:t.width}})]:t._e()],2)}),[],!1,null,"6aa95aec",null).exports},data:function(){return{imgList:[{key:0,url:i("9429")},{key:1,url:i("7510")},{key:2,url:i("dbd8")},{key:3,url:i("ff69")},{key:4,url:i("8108")}]}}},m=Object(n.a)(u,(function(){var t=this.$createElement;return(this._self._c||t)("qm-swiper",{attrs:{swiperStyle:"x",imgList:this.imgList,lunboType:"moive",width:"800"}})}),[],!1,null,null,null);e.default=m.exports},"448f":function(t,e,i){},"47b6":function(t,e,i){"use strict";i("2a2d")},5361:function(t,e,i){"use strict";i.r(e);i("d3b7");var n=i("8e1e"),s={data:function(){return{imgPhoto:"",imgheader:"",text:{title:"",littleTitle:"",des:""}}},mounted:function(){var t=document.getElementsByClassName("abs")[0],e=document.getElementsByClassName("bbs")[0];n.a.skeleton(t,this.init_data),n.a.skeleton(e,this.init_data)},methods:{init_data:function(){var t=this;return new Promise((function(e){setTimeout((function(){t.imgPhoto=t.imgheader="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2060961797,1848438389&fm=26&gp=0.jpg",t.text={title:"我的中国梦",littleTitle:"I want become a luck and rich man",des:"在此相遇，我的幸运, we are so happy meet you in the company"},e(!0)}),3e3)}))}}},r=(i("47b6"),i("2877")),a=Object(r.a)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"abs"},[i("div",{staticClass:"left"},[i("div",{staticClass:"left-header"},[i("div",{staticClass:"header-left"},[i("img",{attrs:{src:t.imgPhoto,alt:""}})]),i("div",{staticClass:"header-right"},[i("h1",[t._v(t._s(t.text.title))]),i("p",[t._v(t._s(t.text.littleTitle))])])]),i("div",{staticClass:"left-bottom"},[i("span",[t._v(t._s(t.text.des))])])]),i("div",{staticClass:"right"},[i("img",{attrs:{src:t.imgheader,alt:""}})])]),i("div",{staticClass:"bbs"},[i("div",{staticClass:"top"},[i("img",{attrs:{src:t.imgheader,alt:""}})]),i("div",{staticClass:"middle"},[i("div",{staticClass:"middle-left"},[i("img",{attrs:{src:t.imgPhoto,alt:""}})]),i("div",{staticClass:"middle-right"},[i("h1",[t._v(t._s(t.text.title))]),i("p",[t._v(t._s(t.text.littleTitle))])])]),i("div",{staticClass:"bottom"},[i("span",[t._v(t._s(t.text.des))])])])])}),[],!1,null,"41d1a71c",null);e.default=a.exports},"593c":function(t,e,i){t.exports=i.p+"img/2.4ac1f8b0.jpg"},6150:function(t,e,i){},"622d":function(t,e,i){"use strict";i.r(e);i("1276"),i("ac1f"),i("159b"),i("5319"),i("99af");var n={methods:{click_handle:function(t){this.$emit("mousedown",t)}}},s=i("2877"),r=Object(s.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"icon",attrs:{t:"1622525994288",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"6054",width:"11",height:"11"},on:{mousedown:this.click_handle}},[e("path",{attrs:{d:"M930.909091 344.436364c-41.890909-111.709091-130.327273-209.454545-242.036364-256-102.4-51.2-232.727273-51.2-349.090909-9.309091-74.472727 27.927273-134.981818 69.818182-186.181818 121.018182l-9.309091 13.963636V93.090909c0-23.272727-13.963636-41.890909-41.890909-41.890909-27.927273 0-41.890909 18.618182-41.890909 41.890909v251.345455c0 23.272727 13.963636 41.890909 41.890909 41.890909h251.345455c23.272727 0 41.890909-13.963636 41.890909-41.890909 0-23.272727-13.963636-41.890909-41.890909-41.890909H186.181818l9.309091-9.309091c41.890909-60.509091 97.745455-107.054545 167.563636-134.981819 88.436364-37.236364 195.490909-32.581818 288.581819 9.309091 88.436364 41.890909 158.254545 111.709091 195.490909 204.8 37.236364 93.090909 37.236364 200.145455-4.654546 293.236364-41.890909 88.436364-111.709091 158.254545-204.8 195.490909-88.436364 37.236364-195.490909 32.581818-288.581818-9.309091-88.436364-41.890909-158.254545-111.709091-195.490909-204.8-4.654545-13.963636-23.272727-27.927273-37.236364-27.927273-4.654545 0-9.309091 0-18.618181 4.654546s-18.618182 13.963636-23.272728 23.272727c-4.654545 9.309091-4.654545 23.272727 0 32.581818 41.890909 111.709091 130.327273 209.454545 242.036364 256 60.509091 27.927273 125.672727 41.890909 190.836364 41.890909 55.854545 0 116.363636-9.309091 162.90909-27.927272 111.709091-41.890909 209.454545-130.327273 256-242.036364 41.890909-125.672727 46.545455-251.345455 4.654546-363.054545z","p-id":"6055",fill:"#d81e06"}})])}),[],!1,null,null,null).exports,a=i("8e1e"),o=(i("d3b7"),i("25f0"),{props:{defaultColor:{type:String,default:"#FFFFFF"},targetElem:null},data:function(){return{isShowPicker:!1,wheel:this.$refs["ref-wheel"],color:this.defaultColor,containerId:"color-picker-container",dom:{hMarker:null,slMarker:null,color:null,targetElem:null,container:null},radius:84,square:100,width:194,hsl:[]}},mounted:function(){this.dom.container=this.$refs["ref-color-picker-container"],this.dom.hMarker=this.$refs["ref-h-marker"],this.dom.slMarker=this.$refs["ref-sl-marker"],this.dom.color=this.$refs["ref-color"],this.dom.targetElem=document.querySelector(this.targetElem)},methods:{init:function(){this.posInit(),this.eventBind(),this.setColor(this.color)},openPicker:function(){this.init();this.isShowPicker=!0,this.wheel=this.$refs["ref-wheel"],document.addEventListener("click",this.documentClick)},closePicker:function(){this.isShowPicker=!1,document.removeEventListener("click",this.documentClick)},eventBind:function(){this.dom.container.addEventListener("mousedown",this.mousedown)},documentClick:function(t){var e=this.getParents(t,this.dom.container,!0),i=this.getParents(t,this.dom.targetElem,!0);0===e.length&&0===i.length&&this.closePicker()},posInit:function(){var t=this.dom.targetElem,e=this.getElementViewTop(t),i=this.getElementViewLeft(t);this.dom.container.style.position="fixed",this.dom.container.style.top=e+"px",this.dom.container.style.left=i+this.dom.targetElem.offsetWidth+"px"},getElementViewLeft:function(t){for(var e=t.offsetLeft,i=t.offsetParent;null!==i;)e+=i.offsetLeft,i=i.offsetParent;if("BackCompat"==document.compatMode)var n=document.body.scrollLeft;else n=document.documentElement.scrollLeft;return e-n},getElementViewTop:function(t){for(var e=t.offsetTop,i=t.offsetParent;null!==i;)e+=i.offsetTop,i=i.offsetParent;if("BackCompat"==document.compatMode)var n=document.body.scrollTop;else n=document.documentElement.scrollTop;return e-n},getParents:function(t,e,i){for(var n=t.target,s=(e="string"==typeof e?document.querySelector(e):e,n),r=void 0===i?[s]:[];;){if(void 0!==e&&s==e||void 0===e&&9===s.nodeType){r.push(s);break}if(s&&r.push(s),!s.parentNode)break;s=s.parentNode}return e?r.indexOf(e)>-1?r:[]:r},getParent:function(t){return 9!==t.target.nodeType&&t.target.parentNode},updateValue:function(t){var e=t.target;e.value&&e.value!=this.color&&this.setColor(e.value)},setColor:function(t){var e=this.unpack(t);this.color!=t&&e&&(this.color=t,this.rgb=e,this.hsl=this.RGBToHSL(this.rgb),this.updateDisplay())},setHSL:function(t){this.hsl=t,this.rgb=this.HSLToRGB(t),this.color=this.pack(this.rgb),this.updateDisplay()},widgetCoords:function(t){var e,i,n=t.target||t.srcElement,s=this.wheel;if(void 0!==t.offsetX){for(var r={x:t.offsetX,y:t.offsetY},a=n;a;)a.mouseX=r.x,a.mouseY=r.y,r.x+=a.offsetLeft,r.y+=a.offsetTop,a=a.offsetParent;a=s;for(var o={x:0,y:0};a;){if(void 0!==a.mouseX){e=a.mouseX-o.x,i=a.mouseY-o.y;break}o.x+=a.offsetLeft,o.y+=a.offsetTop,a=a.offsetParent}for(a=n;a;)a.mouseX=void 0,a.mouseY=void 0,a=a.offsetParent}else{r=this.absolutePosition(s);e=(t.pageX||0*(t.clientX+document.documentElement.scrollLeft))-r.x,i=(t.pageY||0*(t.clientY+document.documentElement.scrollTop))-r.y}return{x:e-this.width/2,y:i-this.width/2}},mousedown:function(t){document.dragging||(document.documentElement.addEventListener("mousemove",this.mousemove),document.documentElement.addEventListener("mouseup",this.mouseup),document.dragging=!0);var e=this.widgetCoords(t);return this.circleDrag=2*Math.max(Math.abs(e.x),Math.abs(e.y))>this.square,this.mousemove(t),!1},mousemove:function(t){var e=this.widgetCoords(t);if(this.circleDrag){var i=Math.atan2(e.x,-e.y)/6.28;i<0&&(i+=1),this.setHSL([i,this.hsl[1],this.hsl[2]])}else{var n=Math.max(0,Math.min(1,-e.x/this.square+.5)),s=Math.max(0,Math.min(1,-e.y/this.square+.5));this.setHSL([this.hsl[0],n,s])}return!1},mouseup:function(){document.documentElement.removeEventListener("mousemove",this.mousemove),document.documentElement.removeEventListener("mouseup",this.mouseup),document.dragging=!1},updateDisplay:function(){var t=6.28*this.hsl[0];this.dom.hMarker.style.left=Math.round(Math.sin(t)*this.radius+this.width/2)+"px",this.dom.hMarker.style.top=Math.round(-Math.cos(t)*this.radius+this.width/2)+"px",this.dom.slMarker.style.left=Math.round(this.square*(.5-this.hsl[1])+this.width/2)+"px",this.dom.slMarker.style.top=Math.round(this.square*(.5-this.hsl[2])+this.width/2)+"px",this.dom.color.style.backgroundColor=this.pack(this.HSLToRGB([this.hsl[0],1,.5])),this.$emit("onChange",this.color)},absolutePosition:function(t){var e={x:t.offsetLeft,y:t.offsetTop};if(t.offsetParent){var i=this.absolutePosition(t.offsetParent);e.x+=i.x,e.y+=i.y}return e},pack:function(t){var e=Math.round(255*t[0]),i=Math.round(255*t[1]),n=Math.round(255*t[2]);return"#"+(e<16?"0":"")+e.toString(16)+(i<16?"0":"")+i.toString(16)+(n<16?"0":"")+n.toString(16)},unpack:function(t){return 7==t.length?[parseInt("0x"+t.substring(1,3))/255,parseInt("0x"+t.substring(3,5))/255,parseInt("0x"+t.substring(5,7))/255]:4==t.length?[parseInt("0x"+t.substring(1,2))/15,parseInt("0x"+t.substring(2,3))/15,parseInt("0x"+t.substring(3,4))/15]:void 0},HSLToRGB:function(t){var e,i,n=t[0],s=t[1],r=t[2];return e=2*r-(i=r<=.5?r*(s+1):r+s-r*s),[this.hueToRGB(e,i,n+.33333),this.hueToRGB(e,i,n),this.hueToRGB(e,i,n-.33333)]},hueToRGB:function(t,e,i){return 6*(i=i<0?i+1:i>1?i-1:i)<1?t+(e-t)*i*6:2*i<1?e:3*i<2?t+(e-t)*(.66666-i)*6:t},RGBToHSL:function(t){var e,i,n,s,r,a,o=t[0],l=t[1],c=t[2];return e=Math.min(o,Math.min(l,c)),n=(i=Math.max(o,Math.max(l,c)))-e,r=0,(a=(e+i)/2)>0&&a<1&&(r=n/(a<.5?2*a:2-2*a)),s=0,n>0&&(i==o&&i!=l&&(s+=(l-c)/n),i==l&&i!=c&&(s+=2+(c-o)/n),i==c&&i!=o&&(s+=4+(o-l)/n),s/=6),[s,r,a]}}}),l=(i("ea2b"),{data:function(){return{imgUrl:"",form:{layout:"1"},keyIndex:0,markList:[{index:0,username:"",color:"#000000",size:14}],url:"",exportDisabled:!0,key:0}},components:{iconRotate:r,colorPicker:Object(s.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{ref:"ref-color-picker-container",staticClass:"color-picker-container",class:{active:this.isShowPicker},attrs:{id:this.containerId}},[e("div",{ref:"ref-color",staticClass:"color"}),e("div",{ref:"ref-wheel",staticClass:"wheel"}),e("div",{ref:"ref-overlay",staticClass:"overlay"}),e("div",{ref:"ref-h-marker",staticClass:"h-marker marker"}),e("div",{ref:"ref-sl-marker",staticClass:"sl-marker marker"})])])}),[],!1,null,"383022b7",null).exports},mounted:function(){},methods:{add_water_mark:function(){this.keyIndex++,this.markList.push({index:this.keyIndex,username:"",color:"#000000",size:14})},del_water_mark:function(){this.keyIndex--,this.markList.pop()},get_layout:function(t){this.form.layout=t.target.value},get_file_data:function(t){var e=this,i=new FileReader,n=this.$refs["ref-result-container"],s=this.$refs["ref-img-container"];i.onload=function(t){e.imgUrl=t.target.result;var i=new Image;i.src=e.imgUrl,i.onload=function(t){t.path[0].width>document.body.clientWidth?(n.style.width=document.body.clientWidth+"px",s.style.width=document.body.clientWidth-40+"px"):(n.style.width=t.path[0].width+"px",s.style.width=t.path[0].width-40+"px")}},i.readAsDataURL(t.target.files[0]),i.onerror=function(){new Error("blobToBase64 error")}},open_picker:function(t,e){this.$refs["ref-colorPicker"][t.index].openPicker(),this.$refs["ref-colorPicker"][t.index].updateValue(e)},change_color:function(t,e){var i=e.target.value;("1"===this.form.layout?this.$refs["ref-img-container"]:this.$refs["ref-name"][t.index]).style.color=i,this.$refs["ref-colorPicker"][t.index].updateValue(e)},set_form_color:function(t,e){e.color=t,("1"===this.form.layout?this.$refs["ref-img-container"]:this.$refs["ref-name"][e.index]).style.color=t},set_form_size:function(t){("1"===this.form.layout?this.$refs["ref-img-container"]:this.$refs["ref-name"][t.index]).style.fontSize=t.size+"px"},get_img:function(){var t=this,e=document.getElementsByClassName("img-container")[0],i={width:e.clientWidth,height:e.clientHeight,style:{margin:"0 auto"}};a.a.htmlTocanvas(e,i).then((function(e){t.url=e,t.exportDisabled=!1}))},drag_handle:function(t){for(var e=this,i=function(i){var n=e.$refs["ref-name"][i],s=e.get_origin_transform(n),r=t.clientX,a=t.clientY;n.ondrag=function(t){t.preventDefault();var i={moveX:t.clientX-r+parseInt(s.translateX||0),moveY:t.clientY-a+parseInt(s.translateY||0),deg:s.rotate||0};e.set_transform(n,i)},n.ondragover=function(t){t.preventDefault()}},n=0;n<this.markList.length;n++)i(n)},get_origin_transform:function(t){var e=t.style.transform,i={};return e&&(e=e.split(" ")).forEach((function(t){i[t.replace(/\((.*)\)/,"")]=t.replace(/[^0-9-]/g,"")})),i},set_transform:function(t,e){a.a.css(t,{transform:"rotate(".concat(e.deg,"deg) translateX(").concat(e.moveX,"px) translateY(").concat(e.moveY,"px)")})},rotate_name:function(t){var e=this;this._parentNode="svg"===t.target.tagName.toLowerCase()?t.target.parentNode:t.target.parentNode.parentNode,this._grentParentNode="svg"===t.target.tagName.toLowerCase()?t.target.parentNode.parentNode:t.target.parentNode.parentNode.parentNode,document.addEventListener("mousemove",this.get_rotate_deg),document.addEventListener("mouseup",(function(){document.removeEventListener("mousemove",e.get_rotate_deg)}))},get_rotate_deg:function(t){var e=this._parentNode,i=this._grentParentNode,n=this.get_origin_transform(i),s=a.a.offset(e).left+e.clientWidth/2,r=a.a.offset(e).top+e.clientHeight/2,o=t.clientX,l=t.clientY;o-=+s+parseInt(n.translateX||0),l=+r+parseInt(n.translateY||0)-l;var c={moveX:0,moveY:0,deg:-(Math.atan2(l,o)/Math.PI*180)||0};this.set_transform(e,c)},reload_page:function(){this.key++,this.form={layout:"1"},this.keyIndex=0,this.markList=[{index:0,username:"",color:"#000000",size:14}],this.imgUrl="",this.exportDisabled=!0}}}),c=(i("2dc7"),Object(s.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{key:t.key},[i("div",{staticClass:"form"},[i("ul",[i("li",[i("div",[i("span",[t._v("文件：")]),i("input",{attrs:{type:"file",accept:"image/*"},on:{change:t.get_file_data}})])]),i("li",[i("div",{on:{change:t.get_layout}},[i("span",[t._v("样式：")]),i("input",{attrs:{checked:"",type:"radio",name:"layout",value:"1"}}),t._v(" 斜切平铺 "),i("input",{attrs:{type:"radio",name:"layout",value:"2"}}),t._v(" 自定义 ")])]),t._l(t.markList,(function(e){return i("div",{key:e.index},[i("li",[i("div",[i("span",[t._v("姓名：")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"item.username"}],attrs:{type:"text"},domProps:{value:e.username},on:{input:function(i){i.target.composing||t.$set(e,"username",i.target.value)}}})]),i("div",[i("span",[t._v("字体颜色：")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.color,expression:"item.color"}],attrs:{type:"text",id:"color-input"+e.index,"auto-complete":"off"},domProps:{value:e.color},on:{focus:function(i){return t.open_picker(e,i)},input:[function(i){i.target.composing||t.$set(e,"color",i.target.value)},function(i){return t.change_color(e,i)}]}}),i("color-picker",{ref:"ref-colorPicker",refInFor:!0,attrs:{color:e.color,targetElem:"#color-input"+e.index},on:{onChange:function(i){t.set_form_color(i,e)}}})],1)]),i("li",[i("div",[i("span",[t._v("字体大小：")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.size,expression:"item.size"}],attrs:{type:"text"},domProps:{value:e.size},on:{input:[function(i){i.target.composing||t.$set(e,"size",i.target.value)},function(i){return t.set_form_size(e)}]}})]),e.index===t.markList.length-1&&0!==e.index?i("button",{class:{disabled:"2"!==t.form.layout},attrs:{disabled:"2"!==t.form.layout},on:{click:t.del_water_mark}},[t._v("删除水印")]):t._e(),"2"==t.form.layout&&e.index===t.markList.length-1?i("button",{class:{disabled:"2"!==t.form.layout},on:{click:t.add_water_mark}},[t._v("添加水印")]):t._e()])])})),i("li",{staticClass:"button-group"},[i("button",{on:{click:t.get_img}},[t._v("生成图片")]),i("a",{class:{disabled:t.exportDisabled},attrs:{disabled:t.exportDisabled,href:t.url,download:t.markList[0].username+".png"}},[t._v("导出")]),i("button",{on:{click:t.reload_page}},[t._v("重置")])])],2)]),i("div",{ref:"ref-result-container",staticClass:"result-container"},[i("div",{ref:"ref-img-container",staticClass:"img-container"},[i("img",{attrs:{src:t.imgUrl,alt:""}}),"2"==t.form.layout?[t._l(t.markList,(function(e){return[i("div",{key:e.index,ref:"ref-name",refInFor:!0,staticClass:"name-box"},[i("div",{ref:"ref-name-rotate",refInFor:!0,staticClass:"name-rotate"},[i("span",{attrs:{draggable:"true"},on:{dragstart:t.drag_handle}},[t._v(t._s(e.username))]),i("icon-rotate",{staticClass:"icon rotate",on:{mousedown:function(e){return e.preventDefault(),t.rotate_name(e)}}})],1)])]}))]:i("div",{staticClass:"qm-watermark"},t._l(16,(function(e){return i("p",{key:"line"+e},t._l(60,(function(e){return i("span",{key:"name"+e},[t._v(t._s(t.markList[0].username))])})),0)})),0)],2)])])])}),[],!1,null,"5a9e5eee",null));e.default=c.exports},6800:function(t,e,i){t.exports=i.p+"img/3.37d51830.jpg"},7510:function(t,e,i){t.exports=i.p+"img/2.2b6d3481.jpeg"},"80ff":function(t,e,i){},8108:function(t,e,i){t.exports=i.p+"img/5.13a299da.jpeg"},9429:function(t,e,i){t.exports=i.p+"img/1.da372200.jpg"},9688:function(t,e,i){"use strict";i.r(e);var n=i("8e1e"),s={mounted:function(){this.init_image()},methods:{init_image:function(){var t=document.getElementById("image");n.a.imageZoom(t,"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1936934555,1071348084&fm=26&gp=0.jpg",200,200)}}},r=(i("cb08"),i("2877")),a=Object(r.a)(s,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-container"},[e("div",{attrs:{id:"image"}})])}],!1,null,"07e8f69c",null);e.default=a.exports},"98a8":function(t,e,i){t.exports=i.p+"img/1.2fde0579.jpg"},a157:function(t,e,i){"use strict";i("22b1")},abb6:function(t,e,i){"use strict";i("e715")},b0a3:function(t,e,i){"use strict";i.r(e);var n=i("2909"),s={data:function(){return{a1:!0,a2:!0,a3:!0}},mounted:function(){this.init_dom()},methods:{init_dom:function(){for(var t=this,e=Object(n.a)(document.getElementsByTagName("img")),i=e.pop(),s=function(t){e[t].ondragstart=function(e){e.dataTransfer.setData("domId",t)}},r=0;r<e.length;r++)s(r);i.ondrop=function(e){var i="a"+e.dataTransfer.getData("domId");t[i]=!1},i.ondragover=function(t){t.preventDefault()}}}},r=(i("abb6"),i("2877")),a=Object(r.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.a1?e("img",{attrs:{src:i("98a8"),alt:""}}):this._e(),this.a2?e("img",{attrs:{src:i("593c"),alt:""}}):this._e(),this.a3?e("img",{attrs:{src:i("6800"),alt:""}}):this._e(),e("img",{attrs:{src:i("eece"),alt:"拖拽到此处以删除",title:"拖拽到此处以删除"}})])}),[],!1,null,"0fe086a0",null);e.default=a.exports},b762:function(t,e,i){},cb08:function(t,e,i){"use strict";i("80ff")},d01e:function(t,e,i){"use strict";i("b762")},d4f9:function(t,e,i){},dbd8:function(t,e,i){t.exports=i.p+"img/3.8f02e75f.jpeg"},e692:function(t,e,i){"use strict";i("448f")},e715:function(t,e,i){},ea2b:function(t,e,i){"use strict";i("0a18")},eece:function(t,e,i){t.exports=i.p+"img/trash.029ed7d2.jpg"},f158:function(t,e,i){t.exports=i.p+"img/2.4f5e8480.jpeg"},fdc1:function(t,e,i){t.exports=i.p+"img/3.eaa2339b.jpeg"},ff69:function(t,e,i){t.exports=i.p+"img/4.dfe07046.jpg"}}]);
//# sourceMappingURL=about.9e9c3c2f.js.map