<template>
	<view class="container">
		<view class="content">
			<view class="page-section-spacing">
				<swiper class="swiper" 
					indicator-dots="true" 
					autoplay="true" 
					interval="5000" 
					duration="400"	>
					<swiper-item v-for="(item , index) in homeSlide" :key="index">
						<image :src="item.pic" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="header">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
						<!-- <view class="image-content">
							<image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="item.mode" :src="src"
								   @error="imageError"></image>
						</view> -->
					<view id="demo1" class="scroll-view-item_H" v-for="(item,index) in array" :key="index">
						<image style="width: 75rpx; height: 75rpx;" :src="item.src"
							   @error="imageError">
						</image>
						<text class="text">{{item.text}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="list">
				<view class="title">
					<text class="title_left">宝藏歌单，等你来听</text>
					<button class="title_right" type="default" size="mini" @click="checkMore">查看更多</button>
				</view>
				<scroll-view class="listContent" scroll-x="true" @scroll="scroll" scroll-left="0" >
					<view id="demo1" class="listItem" v-for="(item,index) in ListData.slice(0 , num)" :key="index" @click="checkDetails(index,item.id)">
						<image style="width: 220rpx; height: 220rpx;" :src="item.coverImgUrl"
							   @error="imageError">
						</image>
						<view class="listText">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
			<mini-player title="不是吧啊sir" v-if="this.$store.state.flag == 1 "></mini-player>
		</view>
	</view>
</template>

<script>
	import listData from '../../data/listDetalis.js'
	export default {
		data() {
			return {
				homeSlide: [],
				msg: '求你捶我啊！',
				triggered: false,
				scrollTop: 0,
				ListData: [],
				salt: '凑数的啊',
				num: 10,
				array: [{
					src: '../../static/imgs/tuijian.png',
					text: '每日推荐'
				},{
					src: '../../static/imgs/hot.png',
					text: '热门歌曲'
				},{
					src: '../../static/imgs/list.png',
					text: '歌单'
				},{
					src: '../../static/imgs/hot1.png',
					text: '排行榜'
				},{
					src: '../../static/imgs/hot1.png',
					text: '排行榜'
				},{
					src: '../../static/imgs/hot1.png',
					text: '排行榜'
				},{
					src: '../../static/imgs/hot1.png',
					text: '排行榜'
				}]
			}
		},
		onNavigationBarButtonTap(e) {//点击事件
		// this.searchFlag = 1
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		page.$holder.titleNView.searchInput.disabled = true
		document.getElementsByClassName('uni-btn-icon')[1].innerText = '';
		},
		onLoad() {
			this.loadData()
		},
		onNavigationBarSearchInputClicked (e) {
			uni.navigateTo({
			                url: '/pages/search/search',
			            });
			// this.searchFlag = 2
			// document.getElementsByClassName('uni-btn-icon')[1].innerText = '取消';
			// let pages = getCurrentPages();
			// let page = pages[pages.length - 1];
			// uni.$holder.titleNView.searchInput.disabled = false
			// console.log(uni)
			// // #ifdef APP-PLUS
			// let currentWebview = page.$getAppWebview();
			//  // #endif
		},
		onNavigationBarSearchInputChanged (e) {
			// if()
			// this.searchFlag = 3
		},
		onNavigationBarSearchInputConfirmed (e) {
			// console.log('触发事件',e)
			// uni.navigateTo({
			//                 url: '/pages/search/search?name=' + e.text,
			//             });
		},
		onPullDownRefresh() {
		      this.refreshData()
			  this.loadData()
		},
		methods: {
			loadData() {
				this.loadBanner()
				this.loadListData()
			},
			checkMore () {
				this.num+=5
			},
			checkDetails (index,id) {
				console.log(index,id)
				uni.navigateTo({
				                url: '/pages/listDetails/listDetails?item='+ encodeURIComponent(JSON.stringify(this.ListData[index]))+ '&id=' + id,
				            });
			},
			loadBanner () {
				let that = this
				this.$axios.get( '/banner?type=2')
				        .then(res => {
							that.homeSlide = res.data.banners
						  console.log(res.data.banners)
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			loadListData () {
				// this.ListData = listData.listData
				let that = this
				this.$axios.get( '/top/playlist/highquality')
				        .then(res => {
						  that.ListData = res.data.playlists
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			refreshData() {
				this.msg = '这刷新了呀'
				this.triggered == !this.triggered
				uni.stopPullDownRefresh();
				this.triggered == !this.triggered
			},
			scroll: function(e) {
			            this.scrollTop = e.detail.scrollTop
			},
			imageError: function(e) {
			            console.error('image发生error事件，携带值为' + e.detail.errMsg)
			}
		}
	}
</script>

<style lang="less">
	.header {
		padding: 20rpx 0;
	}
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	.swiper{
		height: 300upx;
		text-align: center;
		padding: 20rpx 0;
	}
	swiper-item{
		image{
			width: 90%;
			height: 300upx;	
			border-radius: 15rpx;
		}
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 18.1%;
		height: 120rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 0 0 10rpx 0;
		padding-left: 16rpx;
	}
	.listContent {
		white-space: nowrap;
		width: 100%;
		.listItem {
			display: inline-block;
			width: 30%;
			height: 320rpx;
			text-align: center;
			font-size: 24rpx;
			margin: 0 0 10rpx 0;
			padding-left: 20rpx;
			image {
				width: 90%;
				height: 220upx;	
				border-radius: 15rpx;
			}
			.listText {
				width: 220rpx;
				overflow: hidden;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2; /** 显示的行数 **/
			}
		}
		
	}
	.text {
		display: block;
		height: 15px;
		line-height: 15px;
	}
	.title {
		padding: 20rpx 35rpx;
		.title_left {
			font-size: 36rpx;
			font-weight: bold;
		}
		.title_right {
			float: right;
			font-size: 12px;
			text-align: center;
			background-color: #FFFFFF;
		}
	}
</style>
