$.ajaxPrefilter(function (xx) {
  xx.url = "http://127.0.0.1:3070" + xx.url;
});
