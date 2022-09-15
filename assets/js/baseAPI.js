$.ajaxPrefilter(function (xx) {
  xx.url = "http://127.0.0.1:3007" + xx.url;
  if (xx.url.indexOf("/my/") !== -1) {
    xx.headers = {
      Authorization: localStorage.getItem("token") || " ",
    };
  }
  xx.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败"
    ) {
      localStorage.removeItem("token");

      location.href = "/login.html";
    }
  };
});
