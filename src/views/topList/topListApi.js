import HttpApi from '../../http/http';
const TopListApi = {
  getTopList: (param) => {
		return HttpApi.get('/top/all', {data:param})
		.then((resp) => {
      return resp;
		})
	},
	getCommentList: (param) => {
		return HttpApi.get('/top/comment', param)
		.then(resp => {
			return resp;
		})
	},
	getParise: (param) => {
		return HttpApi.get('/top/praise', param)
		.then(resp => {
			return resp;
		})
	}
}

export default TopListApi;