$(function () {
  getUserInfo();
  var layer = layui.layer;
  $(".quit").on("click", function () {
    layer.confirm(
      "确定退出登录？",
      { icon: 2, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });
});
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token") || " ",
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      renderAvatar(res.data);
    },
   
  });
}

function renderAvatar(user) {
  var name = user.username || user.nickname;

  $("#welcome").html("欢迎&nbsp&nbsp" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr(src, user_pic).show();
    $(".text-avatara").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatara").html(first).show();
  }
}
