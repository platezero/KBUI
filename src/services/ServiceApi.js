import axios from "axios";
axios.defaults.withCredentials = true;

var BASE_URL = process.env.VUE_APP_API_KBS_ENDPOINT;

export default {
  saveArticle(article) {
    var url = BASE_URL + "/api/v1/article";
    var requestBody = {
      article_plain: JSON.stringify(article.plain),
      article_jodit: JSON.stringify(article.jodit)
    };
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    var querystring = require("querystring");
    return axios.post(url, querystring.stringify(requestBody), config);
  },
  listArticleByEmpId(empid) {
    var url = BASE_URL + "/api/v1/article/listby?empid=" + empid;
    return axios.get(url);
  },
  listArticleByNote(note) {
    var url = BASE_URL + "/api/v1/article/listby/note/" + note;
    return axios.get(url);
  },
  listArticleByQuery(query) {
    var url = BASE_URL + "/api/v1/article/listby/query/?q=" + query;
    return axios.get(url);
  },
  listArticleLasted(top) {
    var url = BASE_URL + "/api/v1/article/listby/lasted/top/" + top;
    return axios.get(url);
  },
  listArticlePin(top) {
    var url = BASE_URL + "/api/v1/article/listby/pin/top/" + top;
    return axios.get(url);
  },
  listArticleTrend(top) {
    var url = BASE_URL + "/api/v1/article/listby/trend/top/" + top;
    return axios.get(url);
  },
  getArticleByNote(note) {
    var url = BASE_URL + "/api/v1/article/" + note;
    return axios.get(url);
  },
  deleteArticleByNote(note) {
    var url = BASE_URL + "/api/v1/article/?note=" + note;
    return axios.delete(url);
  },
  addArticleViews(note) {
    var url = BASE_URL + "/api/v1/article/feedback/views/" + note;
    return axios.put(url);
  },
  getArticleFeedback(note) {
    var url = BASE_URL + "/api/v1/article/feedback/?note=" + note;
    return axios.get(url);
  },
  addArticleFeedback(note, type, comment) {
    var url = BASE_URL + "/api/v1/article/feedback";
    var requestBody = {
      note: note,
      type: type,
      comment: comment
    };
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    var querystring = require("querystring");
    return axios.post(url, querystring.stringify(requestBody), config);
  }
};
