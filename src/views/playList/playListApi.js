const HttpAPI = require('../../http/http').default;
let PlayListApi = {
	play: (mid, param) => {
		return HttpAPI.get(`/song/play/${mid}`, param)
		.then((resp) => {
			return resp;
		})
	},
	getSongVkey: (param) => {
		return HttpAPI.get(`/song/vkey`, param)
		.then((resp) => {
      return resp;
		})
	}
}

export default PlayListApi;