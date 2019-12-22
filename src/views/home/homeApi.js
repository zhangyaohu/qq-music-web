import Http from 'src/http/http';

const homeApi = {
	queryAll: (param) => {
		return Http.get('/song/suggest', param)
		.then((resp) => {
			return resp;
		})
	},

	getMv: (param) => {
		return Http.get('/mv/all', param)
		.then((resp) => {
			return resp;
		})
	}
}

export default homeApi;