import axios from "axios";

export default () => {
  alert(process.env.VUE_APP_API_LEP_ENDPOINT);
  return axios.create({
    baseURL: `http://api.pearson.com/v2/dictionaries`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
