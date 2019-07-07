$(document).on('turbolinks:load', function() { 
  var search_list = $("#user-search-result");
  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
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
  $(document).on("click", ".chat-group-user__btn--add", function () {
    var name =$(this).attr('data-user-name');
    var id =$(this).attr('data-user-id');
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`;
    $(".chat-group-users").append(html);
  });
  $(document).on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });
});