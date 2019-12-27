import Vue from 'vue';
import * as types from 'src/views/store/mutation-type.js';

const state = {
	songList: [],
	mvList: [],
	newSongList: [],
	newAlbumList:[],
	topList: [],
	newAlbumTagList: [],
	focusList: [],
	categoryList: [],
	lanList: [],
	searchSongList: [],
	searchMvList: [],
	searchSingerList: [],
	searchAlbumList: [],
	singerList: [],
	singerTagsObj: {},
	topListObj: {}
}

const actions = {
  updateDataList: ({state, commit}, payload) => {
    commit(types.UPDATE_DATA_LIST, payload);
	},
	updateDataObject: ({state, commit}, payload) => {
    commit(types.UPDATE_DATA_OBJ, payload);
	},
}

const mutations = {
  [types.UPDATE_DATA_LIST]: (state, {dataName, data}) => {
		Vue.set(state, dataName, ...[data])
		console.log(state);
	},
	[types.UPDATE_DATA_OBJ]: (state, {name, data}) => {
		Vue.set(state, name, data)
		console.log(state);
	}
}

const getters = {

}

export default {
	state,
	getters,
	actions,
	mutations
}