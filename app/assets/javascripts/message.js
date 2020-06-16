$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list--box">
          <div class="chat-main__message-list--box__info">
            <div class="chat-main__message-list--box__info--talker">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list--box__info--date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list--box__text">
            <p class="chat-main__message-list--box__text--meen">
              ${message.content}
            </p>
            <img class="image_tag message" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list--box">
        <div class="chat-main__message-list--box__info">
          <div class="chat-main__message-list--box__info--talker ">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list--box__info--date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list--box__text">
          <p class="chat-main__message-list--box__text--meen">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
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
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight})     
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
});