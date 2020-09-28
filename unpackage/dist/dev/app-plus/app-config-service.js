
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/video/video","pages/music/music","pages/listDetails/listDetails","pages/playPage/playPage","pages/search/search","pages/searchResult/searchResult"],"window":{"enablePullDownRefresh":true,"scrollIndicator":"none"},"tabBar":{"color":"#8a8a8a","selectedColor":"#C20C0C","borderStyle":"white","backgroundColor":"#fafafa","list":[{"pagePath":"pages/index/index","text":"发现","iconPath":"/static/imgs/wyyLogo.png","selectedIconPath":"/static/imgs/wyyLogo2.png"},{"pagePath":"pages/video/video","text":"视频","iconPath":"/static/imgs/play2.png","selectedIconPath":"/static/imgs/play.png"},{"pagePath":"pages/music/music","text":"我的","iconPath":"/static/imgs/music.png","selectedIconPath":"/static/imgs/music2.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"MyFristPro","compilerVersion":"2.8.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","navigationBarTitleText":"搜索结果","titleNView":{"searchInput":{"backgroundColor":"#fafafa","borderRadius":"18px","placeholder":"请输入搜索内容","disabled":"true"}}}},{"path":"/pages/video/video","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","navigationBarTitleText":"搜索结果","titleNView":{"searchInput":{"backgroundColor":"#fafafa","borderRadius":"18px","placeholder":"请输入搜索内容"}}}},{"path":"/pages/music/music","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"navigationBarTextStyle":"black","titleNView":false}},{"path":"/pages/listDetails/listDetails","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","navigationBarTitleText":"歌单","titleNView":{}}},{"path":"/pages/playPage/playPage","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTextStyle":"black","navigationBarTitleText":"歌名","navigationBarBackgroundColor":"black","disableScroll":true,"titleNView":{}}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","navigationBarTitleText":"搜索结果","titleNView":{"searchInput":{"backgroundColor":"#fafafa","borderRadius":"18px","placeholder":"请输入搜索内容"},"buttons":[{"text":"取消","fontSize":"16px","float":"right"}]}}},{"path":"/pages/searchResult/searchResult","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","titleNView":{"searchInput":{"backgroundColor":"#fafafa","borderRadius":"18px","placeholder":"请输入搜索内容"}}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});