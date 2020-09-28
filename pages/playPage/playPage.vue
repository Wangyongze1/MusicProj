<template>
	<page-meta>
	    <navigation-bar
	      :title="nbTitle"
	      :subtitleText="subtitleText"
	      :subtitle-color="nbFrontColor"
	      :loading="nbLoading"
	      :front-color="nbFrontColor"
	      :background-color="nbBackgroundColor"
	      :color-animation-duration="2000"
	      color-animation-timing-func="easeIn"
	    />
	  </page-meta>
	<view class="Box">
		<view class="bgStyle">
			<image :src="this.params.image" style="width: 100%;height: 100vh;"></image>
			<!-- <helang-blur :params="params">
			</helang-blur> -->
		</view>
		<view class="PlayContent">
			<view class="">
			</view>
			<view class="lyric" @click="showLyric()" v-show="!this.lyricFlag">
				<bing-lyric :lyrics="lyric" :centerStyle="centerStyle" :curTime="curTime2" :areaStyle="cuAreaStyle" :lyricStyle="lyricStyle"
						 @centerBtnClick="centerBtnClick" @copyLyrics="copy"></bing-lyric>
			</view>
			<view class="songImg" @click="showLyric()" v-show="this.lyricFlag">
				<view class="anima" :animation="animationData"></view>
				<view class="anima" :animation="animationData2"></view>
				<image :class="{fengmian: this.pauseflag==false}" :src="this.coverImg" mode="" ></image>
			</view>
			<view class="status" style="display: flex;">
				<uni-icons type="heart" size="28" class="icon" color="#ffffff"></uni-icons>
				<uni-icons type="download" size="28" class="icon" color="#ffffff"></uni-icons>
				<uni-icons type="gear" size="28" class="icon" color="#ffffff"></uni-icons>
				<uni-icons type="chat" size="28" class="icon" color="#ffffff"></uni-icons>
				<uni-badge text="1" class="badge" size="small"></uni-badge>
				<uni-icons type="list" size="28" class="icon" color="#ffffff"></uni-icons>
			</view>
		</view>
		<view class="Footer">
			<view class="progress">
				{{curTime}}
				<movable-area>
					<movable-view :x="x" direction="horizontal" @change="onChange"></movable-view>
				</movable-area>
				{{date}}
			</view>
			<view class="buttonAnniu">
				<uni-icons type="loop" size="28" class="icon" color="#ffffff" @click="playType()" v-show="this.currentType == 0"></uni-icons>
				<uni-icons type="settings" size="28" class="icon" color="#ffffff" @click="playType()" v-show="this.currentType == 1"></uni-icons>
				<uni-icons type="map-pin-ellipse" size="28" class="icon" color="#ffffff" @click="playType()" v-show="this.currentType == 2"></uni-icons>
				<uni-icons type="undo" size="28" class="icon" color="#ffffff" @click="playPre()"></uni-icons>
				<uni-icons type="circle" size="35" class="icon" color="#ffffff" @click="playSong()" v-show="this.pauseflag == true"></uni-icons>
				<uni-icons type="circle-filled" size="35" class="icon" color="#ffffff" @click="pauseSong()" v-show="this.pauseflag == false"></uni-icons>
				<uni-icons type="redo" size="28" class="icon" color="#ffffff" @click="playNext()"></uni-icons>
				<uni-icons type="list" size="28" class="icon" color="#ffffff" @click="kuaijin()"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import bingLyric from '../../components/bing-lyric/bing-lyric.vue'
	import textData from '../../data/lyric.js'
	// const audio = uni.createInnerAudioContext()
	export default {
		components: {
		        helangBlur,
				uniIcons,
				uniBadge,
				bingLyric
		},
		onUnload() {
		},
		onLoad(option) {
			uni.createSelectorQuery().select(".fengmian").boundingClientRect((res)=>{
			}).exec()
			if (option.pageflag == 3) {
				// const data = JSON.parse(decodeURIComponent(option.data));
				// this.songList = data
				let songindex = this.$store.state.songList.length - 1
				this.songList = this.$store.state.songList
				console.log(this.songList)
				this.index = this.songList.length - 1
				this.listLenght = this.songList.length
			} else {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.songList = item
				this.index = option.index
				this.listLenght = this.songList.length
			}
			let pageflag = option.pageflag
			let src = 'https://music.163.com/song/media/outer/url?id=' + this.songList[this.index].id + '.mp3';
			if(src == this.$store.state.innerAudio.src) {
				pageflag = 1 
			}
			// this.params.image = '../../static/imgs/bg1.jpg'
			// this.coverImg = this.songList[this.index].al.picUrl
			// this.nbTitle = this.songList[this.index].name
			// this.subtitleText = this.songList[this.index].ar[0].name
			if(pageflag == 1) {
				this.innerAudioContext = this.$store.state.innerAudio
				
			} else {
				if(this.$store.state.innerAudio != '') {
					this.innerAudioContext = this.$store.state.innerAudio
				}else {
					this.innerAudioContext = uni.createInnerAudioContext()
				}
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=' + this.songList[this.index].id + '.mp3';
				this.$store.commit('changeAudio',this.innerAudioContext)
				this.innerAudioContext.startTime = 0
			}
			this.createAudio()
			this.useMore()
			
		},	
		onBackPress() {
			// this.$store.commit("changeCuttent",this.curTime2)
		},
		// onReady() {
		// },
		beforeUpdate(){
			if (this.innerAudioContext.duration > 0) {
				let x = parseInt(this.innerAudioContext.duration / 60)
				let y = parseInt(this.innerAudioContext.duration % 60)
				this.date = x + ':' + y
			}
		},
		data () {
			return {
				innerAudioContext: '',
				audio: '',
				currentTime: 0,
				index: 0,
				listLenght: 0,
				x: 0,
				songList: [],
				volume: 0,
				nbTitle: '标题',
				subtitleText: 'subtitleText',
				nbLoading: false,
				nbFrontColor: '#000000',
				nbBackgroundColor: '#ffffff',
				params: {
					width:'100%',
					height:'100vh',
					image:"",
					blur:"s"
				},
				image: '',
				animationData: {},
				num: 0,
				lyricFlag: false,
				title: 'Hello',
				centerStyle: {
					btnImg: '../../static/btn.png',
				},
				lyricStyle: {
					color: 'gray',
					fontSize: '14px'
					
				},
				cuAreaStyle: {
					width: '100vw',
					height: '60vh',
					background: 'transparent'
				},
				lyric: [],
				curTime: 0,
				curTime2: 0, 
				date: '0:0',
				pauseflag: false,
				coverImg: '',
				playTypeList: ['循环歌单','随机播放','单曲循环'],
				currentType: 0,
				typeName: '',
				texData: []
			}
		},
		onShow: function(){
			this.playAnima()
			setInterval(this.playAnima,4000)
		  },
		methods: {
			createAudio () {
				let that = this
				// this.innerAudioContext = audio
				this.innerAudioContext.onTimeUpdate(function(res){
					  let time = that.innerAudioContext.currentTime
					  let x = parseInt(time / 60)
					  let y = parseInt(time % 60)
					  that.x = time / that.innerAudioContext.duration * 235
					  that.curTime2 = time
					  let data = {
						  currentTime: that.curTime2,
						  duration: that.innerAudioContext.duration
					  }
					  that.$store.commit("changeCuttent",data)
					  that.curTime = x + ':' + y
					  // that.setData({ 
					  //   msg: innerAudioContext.duration,
					  //   msg2: innerAudioContext.currentTime  * 1000
					  // });
				    })
				this.innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				this.innerAudioContext.onError((res) => {
					uni.showToast({
					    title: '该歌曲为VIP内容' + '自动播放下一首',
					    duration: 2000
					});
					that.playNext()
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.innerAudioContext.onEnded(function(){
					that.lyric = ''
				})
				this.innerAudioContext.onEnded(()=>{
					if (that.currentType == 2) {
						
					} else if (that.currentType == 1) {
						that.playRandom()
					} else if(that.currentType == 0){
						that.playNext()
					}
				})
			},
			getLyric() {
				// let data = textData.textData
				// let that = this
				// data.forEach(r=> {
				// 	if(r.id == that.songList[that.index].id) {
				// 		that.lyric = r.lyric
				// 		var lines = that.lyric.split('\n')
				// 		var pattern = /(\[\d\d\:\d\d\.[0-9]*\])/g
				// 		var result = []
				// 		while (!pattern.test(lines[0])) {
				// 		  lines = lines.slice(1)
				// 		};
				// 		that.lyric = lines
				// 	}
				// })
				let that = this
				this.$axios.get( '/lyric?id=' + this.songList[this.index].id)
				        .then(res => {
							if (res.data.lrc.lyric) {
								that.lyric = res.data.lrc.lyric
								var lines = that.lyric.split('\n')
								var pattern = /(\[\d\d\:\d\d\.[0-9]*\])/g
								var result = []
								while (!pattern.test(lines[0])) {
								  lines = lines.slice(1)
								};
								that.lyric = lines
								that.texData.push(that.lyric)
							}
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			playAnima () {
				var animation = uni.createAnimation({
					duration: 2000,
				    timingFunction: 'ease-in-out',
				})
				this.animation = animation
				let that = this
				let x = Math.random()/100
				let y = x + 1.4
				let m = x + 1.1
				animation.scale(y,y).step()
				animation.scale(1,1).step()
				that.animationData = animation.export()
				animation.scale(m,m).step()
				animation.scale(1,1).step()
				that.animationData2 = animation.export()
			},
			playType() {
				if (this.currentType < 2) {
					this.currentType++;
				} else {
					this.currentType = 0
				}
				this.typeName = this.playTypeList[this.currentType]
				uni.showToast({
				    title: this.typeName,
				    duration: 2000
				});
				let that = this
				if (that.currentType == 2) {
					that.innerAudioContext.loop = true
				} else if (that.currentType == 1) {
					that.innerAudioContext.loop = false
				} else if(that.currentType == 0){
					that.innerAudioContext.loop = false
				}
			},
			playRandom () {
				this.innerAudioContext.loop = false
				this.index = parseInt(Math.random()*10)
				if (this.index >= 0 && this.listLenght > 1) {
					if (this.index == 0 ){
						this.index = this.listLenght - 1 
					} else {
						this.index--;
					}
					this.innerAudioContext.startTime = 0
					this.lyric = ''
					this.useMore ()
					this.innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=' + this.songList[this.index].id + '.mp3';
					// this.nbTitle = this.songList[this.index].name
					// this.subtitleText = this.songList[this.index].ar[0].name
					// this.coverImg = this.songList[this.index].al.picUrl
					// this.params.image = '../../static/imgs/bg1.jpg'
					// this.getLyric()
				} 
			},
			playPre () {
				if (this.index >= 0 && this.listLenght > 1) {
					if (this.index ==0 ){
						this.index = this.listLenght - 1 
					} else {
						this.index--;
					}
					this.innerAudioContext.startTime = 0
					this.useMore ()
					this.lyric = ''
					this.innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=' + this.songList[this.index].id + '.mp3';
					// this.nbTitle = this.songList[this.index].name
					// this.subtitleText = this.songList[this.index].ar[0].name
					// this.coverImg = this.songList[this.index].al.picUrl
					// this.params.image = '../../static/imgs/bg1.jpg'
					// this.getLyric()
				} 
			},
			playSong () {
				this.pauseflag = false
				this.$store.commit('changeStatus',this.pauseflag)
				this.innerAudioContext.play();
			},
			pauseSong () {
				this.pauseflag = true
				this.$store.commit('changeStatus',this.pauseflag)
				this.innerAudioContext.pause();
				
			},
			playNext () {
				if (this.index <= this.listLenght - 1) {
					if (this.index == this.listLenght - 1) {
						this.index = 0
					} else {
						this.index++;
					}
					this.innerAudioContext.startTime = 0
					this.useMore ()
					this.innerAudioContext.src = 'https://music.163.com/song/media/outer/url?id=' + this.songList[this.index].id + '.mp3';
					// this.nbTitle = this.songList[this.index].name
					// this.params.image = '../../static/imgs/bg1.jpg'
					// this.subtitleText = this.songList[this.index].ar[0].name
					// this.coverImg = this.songList[this.index].al.picUrl
					// this.getLyric()
				} 
			},
			kuaijin () {
				if (this.innerAudioContext.currentTime < this.innerAudioContext.duration - 5){
					this.innerAudioContext.currentTime += 5
					uni.showToast({
					    title: '快进>>+5s',
					    duration: 1000
					});
				}
			},
			onChange(e) {
				if(this.pauseflag == true) {
					this.x = e.detail.x
					this.innerAudioContext.currentTime = this.x / 235 * this.innerAudioContext.duration
				}
				
			},
			useMore () {
				let id = this.songList[this.index].id
				let x = id % 3 + 1
				this.params.image = '../../static/imgs/bg' + x + '.jpg'
				this.coverImg = this.songList[this.index].al.picUrl
				this.nbTitle = this.songList[this.index].name
				this.subtitleText = this.songList[this.index].ar[0].name
				let data = {
					list: this.songList,
					index: this.index,
					audio: this.innerAudioContext,
					id: id
				}
				this.$store.commit("changePlay",data)
				this.getLyric()
			},
			showLyric () {
				this.lyricFlag = !this.lyricFlag
			},
			copy(e){
				uni.showModal({
					content: JSON.stringify(e.lyric)
				})
			},
			centerBtnClick(e){
				this.curTime = e.centerTime
			},
			out(t){
				this.curTime += t
			}
		}
	}
</script>

<style lang="less">
	.Box {
		.bgStyle {
			height: 100vh;
			image {
				position: absolute;
				z-index: -5;
			}
		}
		.PlayContent {
			color: #FFFFFF;
			height: 65vh;
			background: transparent;
			.lyric {
				position: absolute;
				text-align: center;
				font-size: 14px;
				width: 100vw;
				top: 8vh;
				height: 350px;
			}
			.songImg {
				position: absolute;
				z-index: 10;
				left: 60px;
				top: 15vh;
				image {
					border-radius: 50%;
					width: 250px;
					height: 250px;
				}
				.fengmian {
					animation: rotate 15s linear infinite;
				}
				.anima {
					position: absolute;
					z-index: 10;
					width: 250px;
					height: 250px;
					border-radius: 50%;
					border: 1px solid #FFFFFF;
					opacity: 0.1;
				}
			}
			.status {
				position: absolute;
				z-index: 10;
				left: 10px;
				height: 80px;
				top: calc(var(--window-top) + 62vh);
				button {
					width: 30px;
					height: 30px;
					margin: 20px;
					font-size: 11px;
				}
				.icon {
					width: 30px;
					height: 30px;
					margin: 20px;
					font-size: 11px;
					color: red;
				}
				.badge {
					position: absolute;
					left: 240px;
					width: 10px;
					top: 12px
				}
			}
		}
		.Footer {
			width: 100%;
			position: absolute;
			text-align: center;
			top: 78vh;
			.progress {
				width: 100%;
				height: 30px;
				font-size: 20rpx;
				color: gray;
			}
			.buttonAnniu {
				height: 60px;
				line-height: 60px;
				.icon {
					width: 30px;
					height: 60px;
					line-height: 60px;
					margin: 20px;
					font-size: 11px;
				}
				
			}
		}
	}
	movable-view {
		height: 20rpx;
		width: 20rpx;
		background-color: #007AFF;
		color: #fff;
	}
	movable-area {
		margin: 0 10px;
		display: -webkit-inline-flex;
		height: 14rpx;
		width: 500rpx;
		background-color: #D8D8D8;
		overflow: hidden;
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
