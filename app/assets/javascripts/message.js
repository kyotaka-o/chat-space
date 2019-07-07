$(function(){
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
    console.log(this);
    var formData = new FormData(this);
    for (var [key, value] of formData.entries()) { 
      console.log(key, value);
    }
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__box__input__text').val('')
    })
    // .fail(function(){
    //   alert('error');
    // })
  })
})