<template>
	<view class="listDetails">
		<view class="header">
			<view class="bgStyle">
				<helang-blur :params="params">
				</helang-blur>
			</view>
			<uni-drawer ref="drawer">
			    <view style="padding:30rpx;">
			        <view class="drawerHeader">
						<image :src="myDetail.avatarUrl" mode=""></image>
						<view class="text">{{myDetail.nickname}}</view>
					</view>
					<view class="action">
						<image src="../../static/imgs/letter.png"></image>
						<image src="../../static/imgs/friend.png"></image>
						<image src="../../static/imgs/home.png"></image>
						<image src="../../static/imgs/cloth.png"></image>
					</view>
					<view class="">
						<uni-list>
						    <uni-list-item title="演出" rightText="纯粹乐队" link ></uni-list-item>
						    <uni-list-item title="商城" rightText="游戏tws5折秒杀" link ></uni-list-item>
							<uni-list-item title="口袋彩铃" link ></uni-list-item>
							<uni-list-item title="在线听歌免流量" link ></uni-list-item>
							<uni-list-item title="设置" link ></uni-list-item>
							<uni-list-item title="夜间模式" :show-switch="true"></uni-list-item>
							<uni-list-item title="定时关闭" link ></uni-list-item>
							<uni-list-item title="音乐黑名单" link ></uni-list-item>
							<uni-list-item title="鲸鱼音效" link rightText="孤独星球"></uni-list-item>
							<!-- <uni-list-item title="添加Siri捷径" link ></uni-list-item>
							<uni-list-item title="音乐闹钟" link ></uni-list-item>
							<uni-list-item title="青少年模式" link ></uni-list-item>
							<uni-list-item title="我的订单" link ></uni-list-item>
							<uni-list-item title="优惠券" link ></uni-list-item>
							<uni-list-item title="分享网易云音乐" link ></uni-list-item>
							<uni-list-item title="关于" link ></uni-list-item> -->
						</uni-list>
					</view>
			    </view>
			</uni-drawer>
		<!-- 	<uni-drawer ref="Music">
			    <view style="padding:30rpx;">
					<button @click="getMore">得到更多</button>
			       	<uni-list>
			       	    <uni-list-item v-for="(item,index) in tracks.slice(trackstart,tracksNum)" :key="index" :title="item.id"></uni-list-item>
			       	</uni-list>
			    </view>
			</uni-drawer> -->
			<view class="message">
				<view class="Img">
					<image :src="myDetail.avatarUrl" mode="" @click="openDraw"></image>
				</view>
				<view class="text">
					<view class="">
						<!-- {{this.listMsg.name}} -->
					</view>
					<view class="">
						<!-- <image :src="this.listMsg.creator.avatarUrl" style="width: 50rpx;height: 50rpx;border-radius: 18px;" mode=""></image> -->
						<!-- {{myDetail.nickname}} -->
					</view>
					<view class="description">
						<!-- {{this.listMsg.description}} -->
					</view>
				</view>
				<view class="status" style="display: flex;">
					<button>本地音乐</button>
					<button>我的电台</button>
					<button>我的收藏</button>
					<button>关注新歌</button>
				</view>
			</view>
		</view>
		<view>
			<view class="toHeader" v-show="isFixed == true">
				<text class="top-bar-text">我创建的歌单</text>
			</view>
			<view class="rheader" ref="head">
				<text class="top-bar-text" v-show="isFixed == false">我的音乐</text>
			</view>
			<view class="content" v-for="(item, index) in SongData" @click="onClick(index,item.id)">
				<view class="box">
					<view class="note">
						<image :src="item.coverImgUrl" mode=""></image>
					</view>
					<view class="songName">
						<view class="Name">
							{{item.name}}
						</view>
						<view class="num">
							{{item.trackCount}}首
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <uni-list  border="false">
		    <uni-list-item  :index="index+1" :title="item.name"
			:note="item.ar[0].name +' - '+ item.al.name" clickable  @click="onClick(item.id)"
			v-for="(item, index) in SongData">
		    </uni-list-item>
		  </uni-list> -->
	</view>
</template>

<script>
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniListChat from '@/components/uni-list-chat/uni-list-chat.vue'
	export default {
		components: {
		        helangBlur,
				uniDrawer,
				uniList,
				uniListItem,
				uniListChat
		 },
		onPullDownRefresh() {
		      this.refreshData()
			  this.loadData()
		},
		onLoad(option) {
			this.getSongList()
			// this.getTracks()
		},
		onReady() {
			uni.createSelectorQuery().select(".rheader").boundingClientRect((res)=>{
				this.nameTop = res.top
			}).exec()
			uni.setNavigationBarColor({
				backgroundImage: this.params.image
			})
		},
		onPageScroll(e){
			this.rect = e.scrollTop;
			if (this.rect > this.nameTop) {
				this.isFixed = true
				uni.setNavigationBarTitle({
					title: this.listMsg.name
				})
			}else {
				this.isFixed = false
				uni.setNavigationBarTitle({
					title: '歌单'
				})
			}
		},
		data() {
			return {
				msg: '',
				ID: '',
				num: 0,
				rect: 0,
				nameTop: 0,
				isFixed: false,
				SongData: [],
				listMsg: [],
				scrollTop: 0,
				params: {
					width:'100%',
					height:'50vh',
					image:"",
					blur:"s"
				},
				myDetail: [],
				tracks: [],
				trackstart: 0,
				tracksNum: 10
			}
		},
		methods: {
			openDraw() {
				this.$refs.drawer.open();
			},
			loadData() {
				this.getSongList(this.ID)
			},
			refreshData() {
				this.msg = '这刷新了呀'
				uni.stopPullDownRefresh();
			},
			// showTrackIDs() {
			// 	this.$refs.Music.open();
			// },
			// getMore() {
			// 	this.tracksNum+=10
			// 	this.trackstart+=10
			// 	if (this.trackstart > this.tracksLength) {
			// 		this.tracksNum = 10
			// 		this.trackstart = 0
			// 	}
			// },
			// getTracks () {
			// 	this.$axios.get( '/playlist/detail?id=439064411')
			// 	        .then(res => {
			// 				this.tracks = res.data.playlist.trackIds
			// 				this.tracksLength= this.tracks.length
			// 	        })
			// 	        .catch(err => {
			// 	          console.log(err)
			// 	        })
			// },
			getSongList(id) {
				let that = this
				this.$axios.get( '/user/playlist?uid=314717273')
				        .then(res => {
							this.SongData = res.data.playlist
							this.myDetail = this.SongData[0].creator
							this.params.image = this.myDetail.backgroundUrl
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			onClick(index,id) {
				console.log(this.SongData[index])
				uni.navigateTo({
				                url: '/pages/listDetails/listDetails?item='+ encodeURIComponent(JSON.stringify(this.SongData[index]))+ '&id=' + id,
				            });
			},
			scroll: function(e) {
			            this.scrollTop = e.detail.scrollTop
			        },
		}
	}
</script>

<style lang="less">
.listDetails {
	.header {
		position: relative;
		height: 45vh;
		.drawerHeader {
			margin-top: 20rpx;
			width: 100%;
			background-color: #ffffff;
			image {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
			}
		}
		.action {
			margin-top: 20rpx;
			background-color: #ffffff;
			border-top: 10rpx solid red;
			border-bottom: 10rpx solid red;
			image {
				margin: 20rpx 40rpx 20rpx 0;
				border-radius: 50%;
				width: 50rpx;
				height: 50rpx;
			}
		}
		.bgStyle {
			position: relative;
			top: 100;
			z-index: -5;
		}
		.message {
			.Img {
				position: absolute;
				z-index: 10;
				left: 20px;
				top: 30px;
				image {
					border-radius: 50%;
					width: 140px;
					height: 140px;
				}
			}
			.text {
				position: absolute;
				z-index: 10;
				left: 180px;
				width: 180px;
				height: 135px;
				font-size: 14px;
				color: #FFFFFF;
				top: 30px;
				.description {
					position: absolute;
					bottom: 0;
					font-size: 10px;
					width: 145px;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.status {
				position: absolute;
				z-index: 10;
				left: 20px;
				height: 80px;
				top: 200px;
				button {
					width: 50px;
					margin: 15px;
					font-size: 11px;
				}
			}
		}
	}
	.content {
		font-size: 18px;
		padding: 5px 0;
		flex-direction: row;
		flex-wrap: nowrap;
		display: -webkit-inline-flex;
		justify-content: flex-start;
		.box {
			flex-direction: row;
			flex-wrap: nowrap;
			display: -webkit-inline-flex;
			justify-content: flex-start;
			height: 160rpx;
			line-height: 160rpx;
			width: 340rpx;
			margin-left: 30rpx;
			.songName {
				width: 160rpx;
				font-size: 12px;
				margin-left: 20rpx;
				height: 160rpx;
				line-height: 160rpx;
				color: gray;
				overflow:hidden; //超出一行文字自动隐藏
				text-overflow:ellipsis;//文字隐藏后添加省略号
				white-space:nowrap;
				.Name {
					width: 180rpx;
					font-size: 24rpx;
					height: 80rpx;
					line-height: 120rpx;
					color: black;
					overflow:hidden; //超出一行文字自动隐藏
					text-overflow:ellipsis;//文字隐藏后添加省略号
					white-space:nowrap;
				}
				.num {
					width: 180rpx;
					font-size: 12px;
					height: 80rpx;
					line-height: 40rpx;
					color: gray;
					overflow:hidden; //超出一行文字自动隐藏
					text-overflow:ellipsis;//文字隐藏后添加省略号
					white-space:nowrap;
				}
			}
			.note {
				overflow:hidden; //超出一行文字自动隐藏
				text-overflow:ellipsis;//文字隐藏后添加省略号
				white-space:nowrap;
				font-size: 16px;
				line-height: 160rpx;
				width: 160rpx;
				height: 160rpx;
				image {
					border-radius: 10px;
					width: 160rpx;
					height: 160rpx;
				}
			}
		}
	}
}
.scroll-Y {
		height: 400rpx;
	}
.scroll-view-item {
	padding: 0rpx 20rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
}
.toHeader {
	position: fixed;
	z-index: 1000;
	width: 100%;
	background-color: #FFFFFF;
	top: var(--window-top);
	border-radius: 18px 18px 0 0;
	line-height: 85px;
	padding-left: 15px;
	height: 65px;
}
.rheader {
	border-radius: 18px 18px 0 0;
	background-color: #FFFFFF;
	line-height: 40px;
	padding-left: 15px;
	height: 40px;
}
</style>
