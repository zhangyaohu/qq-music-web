import Http from 'src/http/http';

const homeApi = {
	queryAll: (param) => {
		return Http.get('/song/suggest', param)
		.then((resp) => {
			return resp;
		})
	}
}

export default homeApi;