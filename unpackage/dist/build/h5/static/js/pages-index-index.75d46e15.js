(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"065a":function(t,i,e){"use strict";var a,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"page-section-spacing"},[e("v-uni-swiper",{staticClass:"swiper",attrs:{"indicator-dots":"true",autoplay:"true",interval:"5000",duration:"400"}},t._l(t.homeSlide,(function(t,i){return e("v-uni-swiper-item",{key:i},[e("v-uni-image",{attrs:{src:t.pic,mode:"aspectFill"}})],1)})),1)],1),e("v-uni-view",{staticClass:"header"},[e("v-uni-scroll-view",{staticClass:"scroll-view_H",attrs:{"scroll-x":"true","scroll-left":"0"},on:{scroll:function(i){arguments[0]=i=t.$handleEvent(i),t.scroll.apply(void 0,arguments)}}},t._l(t.array,(function(i,a){return e("v-uni-view",{key:a,staticClass:"scroll-view-item_H",attrs:{id:"demo1"}},[e("v-uni-image",{staticStyle:{width:"75rpx",height:"75rpx"},attrs:{src:i.src},on:{error:function(i){arguments[0]=i=t.$handleEvent(i),t.imageError.apply(void 0,arguments)}}}),e("v-uni-text",{staticClass:"text"},[t._v(t._s(i.text))])],1)})),1)],1),e("v-uni-view",{staticClass:"list"},[e("v-uni-view",{staticClass:"title"},[e("v-uni-text",{staticClass:"title_left"},[t._v("宝藏歌单，等你来听")]),e("v-uni-button",{staticClass:"title_right",attrs:{type:"default",size:"mini"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.checkMore.apply(void 0,arguments)}}},[t._v("查看更多")])],1),e("v-uni-scroll-view",{staticClass:"listContent",attrs:{"scroll-x":"true","scroll-left":"0"},on:{scroll:function(i){arguments[0]=i=t.$handleEvent(i),t.scroll.apply(void 0,arguments)}}},t._l(t.ListData.slice(0,t.num),(function(i,a){return e("v-uni-view",{key:a,staticClass:"listItem",attrs:{id:"demo1"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkDetails(a,i.id)}}},[e("v-uni-image",{staticStyle:{width:"220rpx",height:"220rpx"},attrs:{src:i.coverImgUrl},on:{error:function(i){arguments[0]=i=t.$handleEvent(i),t.imageError.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"listText"},[t._v(t._s(i.name))])],1)})),1)],1),1==this.$store.state.flag?e("mini-player",{attrs:{title:"不是吧啊sir"}}):t._e()],1)],1)},s=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return a}))},"4f0a":function(t,i,e){"use strict";var a=e("ee27");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;a(e("ed2b"));var n={data:function(){return{homeSlide:[],msg:"求你捶我啊！",triggered:!1,scrollTop:0,ListData:[],salt:"凑数的啊",num:10,array:[{src:"../../static/imgs/tuijian.png",text:"每日推荐"},{src:"../../static/imgs/hot.png",text:"热门歌曲"},{src:"../../static/imgs/list.png",text:"歌单"},{src:"../../static/imgs/hot1.png",text:"排行榜"},{src:"../../static/imgs/hot1.png",text:"排行榜"},{src:"../../static/imgs/hot1.png",text:"排行榜"},{src:"../../static/imgs/hot1.png",text:"排行榜"}]}},onNavigationBarButtonTap:function(t){var i=getCurrentPages(),e=i[i.length-1];e.$holder.titleNView.searchInput.disabled=!0,document.getElementsByClassName("uni-btn-icon")[1].innerText=""},onLoad:function(){this.loadData()},onNavigationBarSearchInputClicked:function(t){uni.navigateTo({url:"/pages/search/search"})},onNavigationBarSearchInputChanged:function(t){},onNavigationBarSearchInputConfirmed:function(t){},onPullDownRefresh:function(){this.refreshData(),this.loadData()},methods:{loadData:function(){this.loadBanner(),this.loadListData()},checkMore:function(){this.num+=5},checkDetails:function(t,i){console.log(t,i),uni.navigateTo({url:"/pages/listDetails/listDetails?item="+encodeURIComponent(JSON.stringify(this.ListData[t]))+"&id="+i})},loadBanner:function(){var t=this;this.$axios.get("/banner?type=2").then((function(i){t.homeSlide=i.data.banners,console.log(i.data.banners)})).catch((function(t){console.log(t)}))},loadListData:function(){var t=this;this.$axios.get("/top/playlist/highquality").then((function(i){t.ListData=i.data.playlists})).catch((function(t){console.log(t)}))},refreshData:function(){this.msg="这刷新了呀",this.triggered,this.triggered,uni.stopPullDownRefresh(),this.triggered,this.triggered},scroll:function(t){this.scrollTop=t.detail.scrollTop},imageError:function(t){console.error("image发生error事件，携带值为"+t.detail.errMsg)}}};i.default=n},"5ab3":function(t,i,e){"use strict";e.r(i);var a=e("065a"),n=e("ab07");for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);e("f538");var r,o=e("f0c5"),l=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"19743fb0",null,!1,a["a"],r);i["default"]=l.exports},"80f9":function(t,i,e){var a=e("a45d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("5cdf46ba",a,!0,{sourceMap:!1,shadowMode:!1})},a45d:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".header[data-v-19743fb0]{padding:%?20?% 0}.container[data-v-19743fb0]{font-size:14px;line-height:24px}.swiper[data-v-19743fb0]{height:%?300?%;text-align:center;padding:%?20?% 0}uni-swiper-item uni-image[data-v-19743fb0]{width:90%;height:%?300?%;border-radius:%?15?%}.scroll-view_H[data-v-19743fb0]{white-space:nowrap;width:100%}.scroll-view-item_H[data-v-19743fb0]{display:inline-block;width:18.1%;height:%?120?%;text-align:center;font-size:%?24?%;margin:0 0 %?10?% 0;padding-left:%?16?%}.listContent[data-v-19743fb0]{white-space:nowrap;width:100%}.listContent .listItem[data-v-19743fb0]{display:inline-block;width:30%;height:%?320?%;text-align:center;font-size:%?24?%;margin:0 0 %?10?% 0;padding-left:%?20?%}.listContent .listItem uni-image[data-v-19743fb0]{width:90%;height:%?220?%;border-radius:%?15?%}.listContent .listItem .listText[data-v-19743fb0]{width:%?220?%;overflow:hidden;word-break:break-all;\n  /* break-all(允许在单词内换行。) */text-overflow:ellipsis;\n  /* 超出部分省略号 */display:-webkit-box;\n  /** 对象作为伸缩盒子模型显示 **/-webkit-box-orient:vertical;\n  /** 设置或检索伸缩盒对象的子元素的排列方式 **/-webkit-line-clamp:2\n  /** 显示的行数 **/}.text[data-v-19743fb0]{display:block;height:15px;line-height:15px}.title[data-v-19743fb0]{padding:%?20?% %?35?%}.title .title_left[data-v-19743fb0]{font-size:%?36?%;font-weight:700}.title .title_right[data-v-19743fb0]{float:right;font-size:12px;text-align:center;background-color:#fff}",""]),t.exports=i},ab07:function(t,i,e){"use strict";e.r(i);var a=e("4f0a"),n=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);i["default"]=n.a},f538:function(t,i,e){"use strict";var a=e("80f9"),n=e.n(a);n.a}}]);