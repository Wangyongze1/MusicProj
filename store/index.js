import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		index: 0,
		songCover: '',
		playList: [],
		flag: false,
		currentTime: 0,
		duration: 0,
		audio: '',
		innerAudio: '',
		isFixed: false,
		id: 0,
		
		//history
		historyList: [],
		songList: []
	},
    mutations: {
		changePlay(state,data) {
			state.playList = data.list
			state.index = data.index
			state.flag = true
			state.audio = data.audio
			state.id = data.id
		},
		changeCuttent(state,data) {
			state.currentTime= data.currentTime
			state.duration = data.duration
		},
		changeAudio(state,audio) {
			state.innerAudio = audio
		},
		changeStatus(state,bool) {
			state.isFixed = bool
		},
		changeHistory(state,data) {
			if (state.historyList.indexOf(data) > -1) {
				
			} else {
				state.historyList.push(data)
			}
		},
		changeSongList(state,data) {
			let x = false
			state.songList.forEach(r=> {
				if(r.id == data.id) {
					x = true
				} 
			})
			if(!x) {
				state.songList.push(data)
			}
		}
			
	},
    actions: {}
})
export default store