import HttpApi from 'src/http/http';
const newAlbumApi = {
  getAlbumAll: (param) => {
		return HttpApi.get('/album/all', {data:param})
		  .then((resp) => {
        return resp;
			})
	}
}

export default newAlbumApi;