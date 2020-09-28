<template>
	<view class="SearchResult">
		<view class="searchContent" v-show="!this.searchWords">
			<view class="history" v-show="this.$store.state.historyList.length > 0">
				<view class="text">历史</view>
				<view class="scrollX">
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
						<view id="demo1" class="scrollitem" v-for="(item,index) in this.$store.state.historyList" :key="index">
							<button @click="toResult(item)">{{item}}</button>
						</view>
					</scroll-view>
				</view>
				<view class="delete">清空</view>
			</view>
			
			<view class="ContentBox">
				<view class="header">
					<view class="text">热搜榜</view>
					<!-- <button>播放全部</button> -->
				</view>
				<view class="hotBox">
					<view class="hotItem" v-for="(item,index) in hotList" :key="index" @click="toResult(item.searchWord)">
						<view class="index" :class="{hot: index < 3}">{{index+1}}</view>
						<view class="name" :class="{hot: index < 3}">
							{{item.searchWord}}
						</view>
						<image :src="item.iconUrl"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="searchedContent" v-show="this.searchWords">
			<view class="words">
				搜索 "{{this.searchWords}}"
			</view>
			<view class="list" v-for="(item,index) in songList.slice(0,10)" @click="toResult(item.name)">
				<uni-icons type="search" size="20" class="icon" color="gray"></uni-icons>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
		<mini-player v-if="$store.state.flag == true "></mini-player>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		onLoad(option) {
			this.getHotList()
			// this.search(option.name)
		},
		onNavigationBarButtonTap(e) {//点击事件
			uni.navigateBack()
		},
		onNavigationBarSearchInputConfirmed (e) {
			this.$store.commit('changeHistory',e.text)
			this.toResult(e.text)
		},
		onNavigationBarSearchInputChanged (e) {
			this.searchWords = e.text
			this.timeStamp = Math.round(new Date())
			let oldTimeStamp = Math.round(new Date())
			let that = this
			setTimeout(function(){
				if(that.timeStamp==oldTimeStamp){
					if (that.searchWords) {
						that.search(that.searchWords)
					}
				}
			},400)
		},
		data() {
			return {
				searchWords: '',
				timeStamp: 0,
				songList: [],
				hotList: []
			};
		},
		methods: {
			scroll: function(e) {
			            this.scrollTop = e.detail.scrollTop
			},
			search(text) {
				let that = this
				this.$axios.get( '/search?keywords=' + text)
				        .then(res => {
						  that.songList = res.data.result.songs
						  console.log(that.songList)
						 
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			getHotList() {
				let that = this
				this.$axios.get( '/search/hot/detail')
				        .then(res => {
						  that.hotList = res.data.data
						  console.log(that.hotList)
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			toResult(item) {
				uni.navigateTo({
				                url: '/pages/searchResult/searchResult?searchWords='+item,
				            });
			}
			// play(id) {
			// 	uni.navigateTo({
			// 	                url: '/pages/listDetails/listDetails?item='+ encodeURIComponent(JSON.stringify(this.ListData[index]))+ '&id=' + id,
			// 	            });
			// }
		}
	}
</script>

<style lang="less">
.SearchResult{
	.searchContent {
			font-size: 14px;
			line-height: 24px;
			.history {
				height: 50rpx;
				flex-direction: row;
				flex-wrap: wrap;
				display: -webkit-inline-flex;
				justify-content: flex-start;
				margin-bottom: 40rpx;
				.text {
					padding: 0rpx 20rpx;
					width: 60rpx;
					height: 30rpx;
					font-weight: bold;
				}
				.delete {
					// text-align: right;
					// width: 70rpx;
				}
				.scrollX {
					width: 550rpx;
					height: 50rpx;
					.scroll-view_H {
						white-space: nowrap;
						width: 100%;
					}
					.scrollitem {
						display: inline-block;
						text-align: center;
						font-size: 24rpx;
						height: 50rpx;
						padding: 0 10rpx;
						button {
							font-size: 24rpx;
							height: 50rpx;
							margin: 0;
							padding: 0 20rpx;
							line-height: 50rpx;
							border-radius: 18px;
							&::after {
								border:none;
							}
						}
					}
				}
			}
			.ContentBox{
				padding: 10rpx 20rpx;
				.header {
					width: 100%;
					height: 70rpx;
					border-bottom: 1px solid #F5F5F5;
					flex-direction: row;
					flex-wrap: wrap;
					display: -webkit-inline-flex;
					justify-content: flex-start;
					.text{
						font-weight: bold;
					}
					button {
						position: absolute;
						right: 10rpx;
						width: 140rpx;
						height: 50rpx;
						font-size: 12rpx;
						// &::after {
						// 	// border: none;
						// }
					}
				}
				.hotBox {
					width: 95%;
					flex-direction: row;
					flex-wrap: wrap;
					display: -webkit-inline-flex;
					justify-content: flex-start;
					.hotItem {
						font-size: 24rpx;
						width: 43%;
						height: 70rpx;
						margin: 10rpx;
						padding: 0 10rpx;
						line-height: 70rpx;
						flex-direction: row;
						flex-wrap: wrap;
						display: -webkit-inline-flex;
						justify-content: flex-start;
						.index {
							color: gray;
							font-weight: bold;
							margin-right: 20rpx;
							&.hot {
								color: red;
							}
							
						}
						.name {
							max-width: 200rpx;
							overflow:hidden; //超出一行文字自动隐藏
							text-overflow:ellipsis;//文字隐藏后添加省略号
							white-space:nowrap;
							&.hot {
								font-weight: bold;
							}
						}
						image {
							margin: 9px 5px;
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	.searchedContent {
		.words {
			color: #0099ff;
			margin: 10rpx 20rpx;
			font-size: 26rpx;
			height: 50rpx;
			border-bottom: 1px solid #F5F5F5;
		}
		.list {
			padding: 10rpx 20rpx 20rpx 20rpx;
			.text {
				font-size: 26rpx;
				flex-direction: row;
				flex-wrap: wrap;
				display: -webkit-inline-flex;
				justify-content: flex-start;
				width: 600rpx;
				border-bottom: 1px solid #F5F5F5;
			}
		}
	}	
}

</style>
