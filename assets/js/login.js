$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 layui 中获取对象
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //自定义了一个叫 pwd 校验规则
    pwd: [/^[\S]{6,18}$/, "密码必须6~18位，不能出现空格"],

    rePwd: function (value) {
      //自定义lay-verify的昵称，value：表单的值
      var pwd = $(".reg-box [name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致";
      }
    },
  });

  $("#form-reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      // "http://ajax.frontend.itheima.net/api/reguser",
      "/api/reguser",
      {
        username: $("#form-reg [name=username]").val(),
        password: $("#form-reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");
      }
    );
  });
  // 监听登录表单的提交事件
  $("#form-login").submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        }
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
  // $("#form-login").submit(function (e) {
  //   e.preventDefault();
  //   console.log("1");
  //   $.ajax({
  //     url: " /api/login",
  //     method: "POST",

  //     data: $(this).serialize(), //快速获取表单中的数据
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("登陆失败");
  //       }

  //       layer.msg("登陆成功");
  //       localStorage.setItem("token", res.token);
  //       location.href = "/index.html";
  //     },
  //   });
  // });
});
