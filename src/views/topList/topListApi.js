import HttpApi from '../../http/http';
const TopListApi = {
  getTopList: (param) => {
		return HttpApi.get('/top/all', {data:param})
		.then((resp) => {
      return resp;
		})
	}
}

export default TopListApi;