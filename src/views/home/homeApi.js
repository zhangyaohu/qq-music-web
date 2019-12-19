import Http from 'src/http/http';

const homeApi = {
	queryHotSuggest: (param) => {
		return Http.get('/song/suggest', param)
		.then((resp) => {
			return resp.recomPlaylist.data;
		})
	}
}

export default homeApi;