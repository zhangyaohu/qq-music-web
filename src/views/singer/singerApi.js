import HttpApi from '../../http/http';
const SingerApi = {
  getSingerList: (param) => {
		return HttpApi.get('/singer/list', param)
		.then((resp) => {
      return resp.singerList.data;
		})
	}
}

export default SingerApi;