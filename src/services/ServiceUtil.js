export default {
  getAvatarUrl(empid) {
    var url =
      "http://172.20.1.209/HR/per/employees-picture/" +
      empid.substring(1, 3) +
      "/" +
      empid +
      ".jpg";
    return url;
  }
};
