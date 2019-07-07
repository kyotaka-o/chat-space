$(document).on('turbolinks:load', function() { 
  function buildHTML(message, now){
    var html = `<div class="messages__message">
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
      var now = new Date(data.created_at);
      now = orderDate(now, 'YYYY/MM/DD HH:TT');
　    var messages = $('.messages');
      var html = buildHTML(data, now);
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
})