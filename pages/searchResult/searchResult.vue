<template>
	<view class="searchResult">
		<view class="content" v-show="!this.searchWord || this.flag">
			<view class="list" v-for="(item,index) in songList.slice(0,10)" @click="onClick(index)">
				<view class="text">{{item.name}} - {{item.album.name}}</view>
				<view class="note">{{item.artists[0].name}}</view>
			</view>
		</view>
		<view class="searchedContent" v-show="this.searchWord && !this.flag">
			<view class="words">
				搜索 "{{this.searchWord}}"
			</view>
			<view class="list" v-for="(item,index) in searchList.slice(0,10)" @click="toResult(item.name)">
				<uni-icons type="search" size="20" class="icon" color="gray"></uni-icons>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
		<mini-player v-if="$store.state.flag == true "></mini-player>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.searchWord = option.searchWords
			this.search(this.searchWord)
		},
		// onNavigationBarSearchInputClicked (e) {
		// 	uni.navigateBack()
		// },
		onNavigationBarSearchInputConfirmed (e) {
			this.$store.commit('changeHistory',e.text)
			this.flag = true
			this.search(e.text)
		},
		onNavigationBarSearchInputChanged (e) {
			this.searchWord = e.text
			this.flag = false
			this.timeStamp = Math.round(new Date())
			let oldTimeStamp = Math.round(new Date())
			let that = this
			setTimeout(function(){
				if(that.timeStamp==oldTimeStamp){
					if (that.searchWord) {
						that.search(that.searchWord)
					}
				}
			},400)
		},
		data() {
			return {
				searchWord: '',
				searchList: [],
				songList: [],
				timeStamp: 0,
				flag: true
			}
		},
		methods: {
			search(text) {
				let that = this
				this.$axios.get( '/search?keywords=' + text)
				        .then(res => {
						  that.songList = res.data.result.songs
						  that.searchList = res.data.result.songs
						  //name:'天空',id: 209804, mvid: 186101, artists[0].name:'蔡依林'
						  //album.name: J-Game
				        })
				        .catch(err => {
				          console.log(err)
				        })
			},
			onClick(index) {
				let data = {
					al: {
						picUrl: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
					},
					id: this.songList[index].id,
					name: this.songList[index].name,
					ar:[{
						name: this.songList[index].artists[0].name
					}]
				}
				this.$store.commit('changeSongList',data)
				uni.navigateTo({
				                url: '/pages/playPage/playPage?pageflag=3',
				            });
			},
		}
	}
</script>

<style lang="less">
.searchResult {
	.content {
		width: 100%;
		
		.list {
			padding: 10rpx 20rpx 10rpx 20rpx;
			flex-direction: row;
			flex-wrap: wrap;
			display: -webkit-inline-flex;
			justify-content: flex-start;
			.text {
				font-size: 26rpx;
				overflow:hidden; //超出一行文字自动隐藏
				text-overflow:ellipsis;//文字隐藏后添加省略号
				white-space:nowrap;
				width: 650rpx;
			}
			.note {
				font-size: 20rpx;
				width: 100%;
				border-bottom: 1px solid #F5F5F5;
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
