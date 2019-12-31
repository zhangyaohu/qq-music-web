import Http from 'src/http/http.js'
const DetailApi = {
	querySongDetail: (param) => {
		return Http.get('song/detail', param)
		.then((resp) => {
			return resp;
		})
	},
	querySongCollect: (param) => {
		return Http.get('song/collect', param)
		.then((resp) => {
			return resp;
		})
	},
	querySongComment: (param) => {
		return Http.get('/top/comment', param)
		.then(resp => {
			return resp;
		})
	},
	queryLyricDetail: (param) => {
		return Http.get('/song/lyric', param)
		.then(resp => {
			return resp;
		})
	},
	querySongInfo: (param) => {
		return Http.get('/song/info', param)
		.then( resp => {
			return resp;
		})
	}
}

export default DetailApi;