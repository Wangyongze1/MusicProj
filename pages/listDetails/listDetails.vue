<template>
	<view class="listDetails">
		<view class="header">
			<view class="bgStyle">
				<helang-blur :params="params">
				</helang-blur>
			</view>
			<view class="message">
				<view class="Img">
					<image :src="this.listMsg.coverImgUrl" mode=""></image>
				</view>
				<view class="text">
					<view class="">
						{{this.listMsg.name}}
					</view>
					<view class="" style="margin: 20rpx 0;font-size: 25rpx;">
						<image :src="this.listMsg.creator.avatarUrl" style="width: 50rpx;height: 50rpx;border-radius: 18px;" mode=""></image>
						{{this.listMsg.creator.nickname}}
					</view>
					<view class="description">
						{{this.listMsg.description}}
					</view>
				</view>
				<view class="status" style="display: flex;">
					<view class="imgBox" v-for="(item,index) in buttonIMG" :key="index">
						<view class="img">
							<image :src="item.img" :style="item.style"></image>
							<view class="text2">
								{{item.text}}
							</view>
						</view>
						
					</view>
					<!-- <image src="../../static/imgs/share.png"></image>
					<image src="../../static/imgs/download.png"></image>
					<image src="../../static/imgs/select.png" style="width: 70rpx;height: 70rpx;"></image> -->
				</view>
			</view>
		</view>
		<view class="bigBox">
			<view class="toHeader" v-show="isFixed == true">
				<text class="top-bar-text" @click="playSong(0)">播放全部(共{{num}}首)</text>
			</view>
			<view class="rheader" ref="head">
				<text class="top-bar-text" @click="onClick(0)">播放全部(共{{num}}首)</text>
			</view>
			<view class="content" v-for="(item, index) in SongData" >
				<view class="index" v-if="item.id == $store.state.id"@click="onClick(index)">
					<image src="../../static/imgs/volume.png" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view class="index" v-else @click="onClick(index)">
					{{index+1}}
				</view>
				<view class="box" @click="onClick(index)">
					<view class="note" :style="{color: (item.id == $store.state.id)? '#ed672d' : ''}">{{item.name}}</view>
					<view class="songName">{{item.id}}: {{item.ar[0].name}} - {{item.al.name}}</view>
				</view>
				<view class="action">
					<image src="../../static/imgs/dolt2.png" @click="showSong()"></image>
				</view>
			</view>
			<view class="more"  v-if="$store.state.flag == true "></view>
		</view>
		<mini-player v-if="$store.state.flag == true "></mini-player>
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
	import listData from '../../data/listDetalis.js'
	export default {
		components: {
		        helangBlur
		 },
		onPullDownRefresh() {
		      this.refreshData()
			  this.loadData()
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.listMsg = item
			this.params.image = item.coverImgUrl
			this.ID = option.id
			if (!item.commentCount) {
				this.buttonIMG[0].text = '评论'
				this.buttonIMG[1].text = '分享'
			} else {
				this.buttonIMG[0].text = item.commentCount
				this.buttonIMG[1].text = item.shareCount
			}
			let that = this
			this.getSongList(option.id)
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
		computed: {
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
				Data: [],
				numList: [],
				scrollTop: 0,
				buttonIMG: [
					{
						'img': '../../static/imgs/comment.png',
						text: '',
						style: 'padding: 8px;'
					},{
						'img': '../../static/imgs/share.png',
						text: '',
						style: 'padding: 8px;'
					},{
						'img': '../../static/imgs/download.png',
						text: '下载',
						style: 'width: 75rpx;height: 75rpx;padding: 2px'
					},{
						'img': '../../static/imgs/select.png',
						text: '多选',
						style: 'padding: 8px;'
					}],
				params: {
					width:'100%',
					height:'50vh',
					image:"",
					blur:"xl"
				}
			}
		},
		methods: {
			loadData() {
				this.getSongList(this.ID)
			},
			refreshData() {
				this.msg = '这刷新了呀'
				uni.stopPullDownRefresh();
			},
			getSongList(id) {
				// let that = this
				// let x = 0
				// // console.log(listData)
				// listData.listData.forEach(r=> {
				// 	if (r.id == id) {
				// 		that.SongData = r.tracks
				// 		that.buttonIMG[0].text = listData.listData[x].commentCount
				// 		that.buttonIMG[1].text = listData.listData[x].shareCount
				// 		that.num = that.SongData.length
				// 	}
				// 	x++;
				// })
				let that = this
				this.$axios.get( '/playlist/detail?id=' + id)
					.then(res => {
						that.SongData = res.data.playlist.tracks
						that.num = that.SongData.length
						that.Data.push(res.data.playlist)
					})
					.catch(err => {
					  console.log(err)
					})
				
			},
			onClick(index) {
				console.log('dianji wo')
				uni.navigateTo({
				                url: '/pages/playPage/playPage?item='+ encodeURIComponent(JSON.stringify(this.SongData)) + '&index=' + index,
				            });
			},
			scroll: function(e) {
			            this.scrollTop = e.detail.scrollTop
			        },
			showSong() {
				uni.showActionSheet({
					itemList:['暂时无此功能'],
				})
			}
		}
	}
</script>

<style lang="less">
.listDetails {
	.header {
		position: relative;
		height: 45vh;
		.bgStyle {
			position: relative;
			top: 100;
			z-index: -5;
		}
		.message {
			.Img {
				position: absolute;
				left: 20px;
				top: 30px;
				image {
					border-radius: 10px;
					width: 140px;
					height: 140px;
				}
			}
			.text {
				position: absolute;
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
				left: 40rpx;
				height: 160rpx;
				top: 400rpx;
				.imgBox {
					width: 167rpx;
					.img{
						flex-direction: row;
						flex-wrap: wrap;
						display: -webkit-inline-flex;
						justify-content: flex-start;
						width: 167rpx;
						height: 160rpx;
						image {
							width: 50rpx;
							height: 50rpx;
							margin: 0 40rpx;
							font-size: 11px;
							
						}
						.text2 {
							text-align: center;
							color: #FFFFFF;
							font-size: 24rpx;
							width: 167rpx;
							height: 60rpx;
						}
					}
					
				}
				
			}
		}
	}
	.bigBox {
		.more {
			height: 100rpx;
		}
		.content {
			font-size: 18px;
			padding: 5px 0;
			flex-direction: row;
			flex-wrap: wrap;
			display: -webkit-inline-flex;
			justify-content: flex-start;
			.index {
				width: 40px;
				height: 38px;
				line-height: 38px;
				text-align: center;
				color: gray;
			}
			.box {
				height: 38px;
				width: 250px;
				.songName {
					width: 260px;
					font-size: 12px;
					height: 18px;
					line-height: 18px;
					color: gray;
					overflow:hidden; //超出一行文字自动隐藏
					text-overflow:ellipsis;//文字隐藏后添加省略号
					white-space:nowrap;
				}
				.note {
					overflow:hidden; //超出一行文字自动隐藏
					text-overflow:ellipsis;//文字隐藏后添加省略号
					white-space:nowrap;
					font-size: 16px;
					line-height: 20px;
					width: 260px;
					height: 20px;
				}
			}
			.action {
				height: 38px;
				width: 50px;
				line-height: 38px;
				text-align: center;
				margin-left: 20px;
				image {
					width: 15px;
					height: 15px;
				}
			}
			// overflow-x: hidden;
			// .content_header {
			// 	width: 100%;
			// 	height: 30px;
			// 	border-top: 1px solid red;
			// 	background-color: red;
			// 	border-radius: 18px 18px 0 0;
			// }
			// &.fixed {
			// 	position: fixed;
			// 	top: 45px;
			// 	left: 0;
			// 	right: 0;
			// }
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
	line-height: 40px;
	padding-left: 15px;
	height: 40px;
}
.rheader {
	border-radius: 18px 18px 0 0;
	background-color: #FFFFFF;
	line-height: 40px;
	padding-left: 15px;
	height: 40px;
}
</style>
