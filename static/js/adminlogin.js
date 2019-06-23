// "use strict";
function login(e) {
  var form = e.target.form;
  var formData = new FormData(form)
  $(e.target).button('loading');
  $.ajax({
    type: "POST",
    url: "/admin/login",
    data: formData,
    dateType: 'json',
    contentType: false, // 注意这里应设为false
    processData: false,
    success: function(data) {
      if (data.code === 0) {
          location.href = '/admin/index'
      } else {
        alert(data.message);
      }
    },
    error: function(xhr, textStatus, errorThrown) {
      alert("登录失败");
    },
    complete: function(xhr, textStatus) {
      $(e.target).button('reset');
    }
  });
}
