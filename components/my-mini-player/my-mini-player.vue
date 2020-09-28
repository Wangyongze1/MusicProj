<template>
	<view class="mini-player">
		<view class="img" :class="{'fengmian': $store.state.isFixed == false}">
			<image :src="this.$store.state.playList[this.$store.state.index].al.picUrl" mode="" @click="openPlay"></image>
		</view>
		<view class="text">
			<view class="textUp">
				{{this.$store.state.playList[this.$store.state.index].name}}
			</view>
			<view class="textDown">
				{{this.$store.state.playList[this.$store.state.index].ar[0].name}}

			</view>
		</view>
		<view class="action">
			<cmd-progress type="circle" :percent="this.$store.state.currentTime/this.$store.state.duration*100" :stroke-width="8" :width="40" :showInfo="false" class="progress"></cmd-progress>
			<image src='../../static/imgs/play3.png' style="width: 35px;height: 35px;" @click="clickMe()" v-show="$store.state.isFixed == true"></image>
			<image src='../../static/imgs/pause2.png' style="width: 35px;height: 35px;" @click="clickMe()" v-show="$store.state.isFixed == false"></image>
			<image src='../../static/imgs/list2.png' style="width: 35px;height: 35px;margin-left: 20rpx;" @click="list()" ></image>
		</view>
		<uni-drawer ref="list" class="drawer">
		    <scroll-view scroll-y="true" style="padding:0rpx;margin-top: 160rpx;height: 80vh;">
		       	<uni-list>
		       	    <uni-list-item class="item" v-for="(item,index) in playList2" :key="index" :title="item.name" clickable @click="playSong(index)">
					</uni-list-item>
		       	</uni-list>
		    </scroll-view >
		</uni-drawer>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		name: "mini-player",
		props: {
			title: {
				type: String,
				default: "这是标题"
		   },
		},
		components: {cmdProgress},
		data() {
			return {
				songName: '',
				songId: 0,
				songUrl: '',
				songCoverUrl: '',
				playList2: [],
				playList: this.$store.state.playList,
				pauseflag: this.$store.state.isFixed,
				currentName: '',
				title2: 'progress',
				pgList: [0, 0, 0, 0]
			}
		},
		methods: {
			openPlay() {
				uni.navigateTo({					
					url: '/pages/playPage/playPage?pageflag=1&item='+ encodeURIComponent(JSON.stringify(this.$store.state.playList)) + '&index=' + this.$store.state.index,
				            });
			},
			clickMe() {
				if (this.$store.state.audio.paused == false) {
					this.pauseflag = true
					this.$store.state.audio.pause()
				} else {
					this.pauseflag = false
					this.$store.state.audio.play()
				}
				this.$store.commit('changeStatus',this.pauseflag)
			},
			list() {
				// uni.showActionSheet({
				// 	popover: {
				// 		height: '30px'
				// 	},
				//     itemList: ['A', 'B', 'C','A', 'B', 'C','A', 'B', 'C','A', 'B', 'C'],
				//     success: function (res) {
				//         console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				//     },
				//     fail: function (res) {
				//         console.log(res.errMsg);
				//     }
				// });
				let that = this
				this.playList2 = JSON.parse(JSON.stringify(this.$store.state.playList))
				this.currentName = JSON.parse(JSON.stringify(this.$store.state.playList[this.$store.state.index].name))
				this.playList2.forEach(r=> {
					if(r.id == that.$store.state.playList[that.$store.state.index].id) {
						r.name = that.currentName+'----正在播放'
						console.log(r.name)
					}
				})
				this.$refs.list.open();
			},
			playSong(index){
				console.log()
				this.pauseflag = false
				this.playList2 = JSON.parse(JSON.stringify(this.$store.state.playList))
				let audio = this.$store.state.innerAudio
				let data2 = this.playList2[index]
				console.log(audio)
				audio.src= 'https://music.163.com/song/media/outer/url?id=' + data2.id + '.mp3';
				let data = {
					list: this.playList2,
					index: index,
					audio: audio,
					id: data2.id
				}
				this.$store.commit("changePlay",data)
				this.list()
			}
		}
	}
</script>

<style lang="less">
.mini-player{
	position: fixed;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	border-top: 1px solid #CCCCCC;
	bottom: var(--window-bottom);
	display: -webkit-inline-flex;
	justify-content: flex-start;
	background-color: #FFFFFF;
	.drawer {
		.item {
			/deep/.uni-list-item__container {
				height: 50rpx;
				line-height: 50rpx;
			}
		}
	}
	.img {
		width: 80rpx;
		height: 80rpx;
		margin: 10rpx;
		image {
			border-radius: 50%;
			width: 80rpx;
			height: 80rpx;
		}
	}
	.fengmian {
		animation: rotate 6s linear infinite;
	}
	.text{
		margin-left: 20rpx;
		width: 430rpx;
		height: 100rpx;
		flex-direction: row;
		flex-wrap: wrap;
		display: -webkit-inline-flex;
		justify-content: flex-start;
		.textUp {
			overflow:hidden; //超出一行文字自动隐藏
			text-overflow:ellipsis;//文字隐藏后添加省略号
			white-space:nowrap;
			width: 450rpx;
			height: 50rpx;
			line-height: 55rpx;
			font-size: 35rpx;
		}
		.textDown {
			overflow:hidden; //超出一行文字自动隐藏
			text-overflow:ellipsis;//文字隐藏后添加省略号
			white-space:nowrap;
			width: 450rpx;
			height: 50rpx;
			line-height: 40rpx;
			font-size: 20rpx;
		}
	}
	.action {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		.progress {
			position: absolute;
			z-index: -10;
			left: 545rpx;
			bottom: 4rpx;
		}
		image{
			padding: 15rpx 0;
		}
	}
}
@keyframes rotate{
		0%{
			transform: rotateZ(0deg);/*从0度开始*/
		}
		100%{
			transform: rotateZ(360deg);/*360度结束*/
		}
	}

</style>
