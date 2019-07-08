$(document).on('turbolinks:load', function() { 
  function buildHTML(message, now){
    var html = `<div class="messages__message" data-id="${message.id}">
                  <div class="messages__message__info">
                    <p class="messages__message__info__user-name">
                    ${message.name}
                    </p>
                    <p class="messages__message__info__date">
                    ${now}
                    </p>
                  </div>`;

    if(message.body !== ""){
      html = html + `<p class="messages__message__text">
                    ${message.body}
                    </p>`;
    }
    if(message.image.url !== null){
      html = html + `<img src="${message.image.url}">`;
    }
    html = html + `</div>`;

    return html;
  }
  function orderDate(date, format) {
 
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, ("0"+(date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/,  ("0"+date.getDate()).slice(-2));
    format = format.replace(/HH/, date.getHours());
    format = format.replace(/TT/, date.getMinutes()); 
    return format;
  }
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".messages .messages__message:last").attr('data-id')
    group_id = $(".current-group").attr('data-group-id')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: `/groups/${group_id}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function( message ) {
        var now = new Date(message.created_at);
        now = orderDate(now, 'YYYY/MM/DD HH:TT');
  　    var messages = $('.messages');
        //メッセージが入ったHTMLを取得
        insertHTML = buildHTML(message, now);
        //メッセージを追加
        messages.append(insertHTML);
        messages.animate({scrollTop:messages[0].scrollHeight}, 300, 'swing');
      });
      console.log('a');
    })
    .fail(function() {
      console.log('error');
    });
  };  

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var now = new Date(message.created_at);
      now = orderDate(now, 'YYYY/MM/DD HH:TT');
　    var messages = $('.messages');
      var html = buildHTML(message, now);
      messages.append(html);
      messages.animate({scrollTop:messages[0].scrollHeight}, 300, 'swing');
      $('.form__box__input__text').val('')
      $('.form__box__input__img').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".form__box__submit").removeAttr("disabled");
    });
  })
  setInterval(reloadMessages, 5000);
})