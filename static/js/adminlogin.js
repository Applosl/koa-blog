
function login(e) {
  var form = e.target.form;
  var formData = new FormData(form)
  $.ajax({
    type: "POST",
    url: "/admin/login",
    data: formData,
    dateType: 'json',
    contentType: false, // 注意这里应设为false
    processData: false,
    success: function(data) {

    },
    error: function(xhr, textStatus, errorThrown) {

    },
    complete: function(xhr, textStatus) {

    }
  });
}
