<template>
	<view class="videoPage">
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
		<view class="videoBox"  v-if="current==0">
			<view class="singleBox" v-for="(item,index) in mvList2.slice(0, num)" :key="index">
				<video :src="item.url" controls :poster="item.cover" :id="item.id.toString()" :data-id="item.id.toString()" @play="playing"></video>
				<view>{{item.Sname}} - {{item.Aname}}</view>
			</view>
			<uni-load-more :status="status" @clickLoadMore="checkMore"></uni-load-more>
			<!-- <button type="primary" @click="checkMore">查看更多</button> -->
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mvData from '../../data/mvData.js'
	import mvUrl from '../../data/mvData2.js'
	export default {
		components: {uniLoadMore},
		onLoad() {
			// this.getMv()
			let that = this 
			this.getAllMv().then(r=> {
				that.mvList = r
				that.getMvList()
			})
		},
		onPullDownRefresh() {
		      this.refreshData()
			  this.getMv()
		},
		onPageScroll(e){
			console.log()
			if(e.scrollTop - this.currentTop > 250 || e.scrollTop - this.currentTop< -550) {
				uni.createVideoContext(this.curretnId).pause()
			}else {
				uni.createVideoContext(this.curretnId).play()
			}
			
		},
		onReachBottom(){//uniapp 监听下拉加载生命周期
			let that = this
			this.status = 'loading'
			setTimeout(function(){
				that.checkMore()
				that.status = 'more'
			},1000)
		},
		data () {
			return {
				current: 0,
				currentTop: 0,
				curretnId: '',
				tabs: [
					'推荐',
					'LOOK直播',
					'现场',
					'翻唱',
					'舞蹈',
					'听BGM',
				],
				nameTop: 0,
				list: [],
				mvList: [],
				mvList2: [],
				playMv: [],
				num: 2,
				status: 'more',
				videoContent: ''
			}
		},
		methods: {
			refreshData() {
				uni.stopPullDownRefresh();
			},
			playing(e) {
				// 获取当前视频id
				let currentId = e.currentTarget.dataset.id
				this.curretnId = e.currentTarget.dataset.id
				this.currentTop = e.currentTarget.offsetTop
				// uni.createVideoContext获取视频上下文对象
				this.videoContent = uni.createVideoContext(currentId)
				// 获取json对象并遍历, 停止非当前视频
				let trailer = this.mvList2
				for (let i = 0; i < trailer.length; i++) {
				  let temp = trailer[i].id.toString()
				  if (temp !== currentId) {
					uni.createVideoContext(temp).pause()
				  }
				}
			 },
			// getMv (){
			// 	this.mvList = mvData.mvData.data
			// 	let that = this
			// 	// console.log(this.mvList)
			// 	this.mvList.forEach(r=>{
			// 		// console.log(r)
			// 		that.getMvList(r)
			// 	})
				
			// },
			async getAllMv () {
				return await new Promise((resolve,reject) => {
					var _self = this;
					this.$axios.get( '/top/mv')
						.then(res => {
							resolve(res.data.data) 
						})
						.catch(err => {
						  console.log(err)
						})
				})
			},
			getMvList () {
				// let that = this
				// mvUrl.mvUrl.forEach(r=>{
				// 	if(r.id == data.id){
				// 		let mv = {
				// 			Sname: data.name,
				// 			Aname: data.artistName,
				// 			id: data.id,
				// 			cover: data.cover,
				// 			url: r.url
				// 		}
				// 		that.mvList2.push(mv)
				// 	}
				// })
				// console.log(that.mvList2)
				// let that =this
				// this.mvList.forEach(r=>{
				// 	let mv = {
				// 		Sname: r.name,
				// 		Aname: r.artistName,
				// 		id: r.id,
				// 		cover: r.cover
				// 	}
				// 	this.mvList2.push(mv)
				// })
				// console.log(this.mvList2)
				let mvl = []
				let that = this
				this.$axios.get( '/mv/url?id='+ this.mvList[0].id)
					.then(res => {
						let data2 = {
							Sname: this.mvList[0].name,
							Aname: this.mvList[0].artistName,
							cover: this.mvList[0].cover,
							id: this.mvList[0].id,
							url: res.data.data.url
						}
						that.num = 1
						that.mvList2.push(data2)
					})
					.catch(err => {
					  console.log(err)
					})
			},
			checkMore () {
				// this.num++
				let that = this
				this.$axios.get( '/mv/url?id='+ this.mvList[this.num].id)
					.then(res => {
						let data2 = {
							Sname: this.mvList[this.num].name,
							Aname: this.mvList[this.num].artistName,
							cover: this.mvList[this.num].cover,
							id: this.mvList[this.num].id,
							url: res.data.data.url
						}
						that.mvList2.push(data2)
						that.num++
					})
					.catch(err => {
					  console.log(err)
					})
			},
			changeTab(index) {
			      console.log('当前选中的项：' + index)
			    },
		}
	
	}
</script>
	
<style lang="less">
	.videoPage {
		background-color: #F3F3F3;
		width: 100%;
		text-align: center;
		.videoBox {
			border-top: 1px solid #cccccc;
			.singleBox {
				padding-top: 10rpx;
				background-color: white;
				margin-bottom: 20rpx;
				video {
					border-radius: 30rpx;
					margin-top: 30rpx;
				}
			}
			
		}
		
	}
</style>
