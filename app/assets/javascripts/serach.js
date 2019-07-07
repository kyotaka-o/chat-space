$(document).on('turbolinks:load', function() { 
  var search_list = $("#user-search-result");
  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }
  $("#serach-input").on("keyup", function() {
    var input = $("#serach-input").val();
    if (input === ""){
      search_list.empty();
      return;
    }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});