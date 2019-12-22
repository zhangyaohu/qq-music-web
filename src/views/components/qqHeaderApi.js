import Http from 'src/http/http';

const qqHeaderApi = {
  searchAll: (param) => {
    return Http.get(`/song/search/gethotkey.fcg`, param)
    .then((resp) => {
      return  resp;
    });
  },

  getSearchRes: (param) => {
    return Http.get(`/song/search/smartbox_new.fcg`, param)
    .then((resp) => {
      return  resp;
    });
  },
}

export default qqHeaderApi;