import axios from "axios";
import router from "../router";

var BASE_URL = process.env.VUE_APP_API_KBS_ENDPOINT;

export default {
  login(empid, password) {
    var url =
      BASE_URL + "/api/v1/sso/login?u_id=" + empid + "&u_pass=" + password;
    return axios.get(url, { withCredentials: true });
  },
  logout() {
    var url = BASE_URL + "/api/v1/sso/logout";
    return axios.get(url, { withCredentials: true });
  },
  checkLoginAndRedirect(callBackUrl) {
    var url = BASE_URL + "/api/v1/sso/check";
    return axios
      .get(url, { withCredentials: true })
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        if (callBackUrl) {
          router.push("/login?callback=" + callBackUrl);
        } else {
          router.push("/login");
        }
      })
      .finally(function() {});
  },
  checkLogin() {
    var url = BASE_URL + "/api/v1/sso/check";
    return axios.get(url, { withCredentials: true });
  }
};
