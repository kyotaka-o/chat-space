$(document).on('turbolinks:load', function() { 
  function buildHTML(message){
    var html = `<div class="messages__message">
                  <div class="messages__message__info">
                    <p class="messages__message__info__user-name">
                    ${message.name}
                    </p>
                    <p class="messages__message__info__date">
                    ${message.created_at}
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
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
　    var messages = $('.messages');
      var html = buildHTML(data);
      messages.append(html);
      messages.animate({scrollTop:messages[0].scrollHeight}, 300, 'swing');
      $('.form__box__input__text').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".form__box__submit").removeAttr("disabled");
    });
  })
})