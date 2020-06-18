$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list--box data-message-id=${message.id}>
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
      `<div class="chat-main__message-list--box" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message-list--box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
       } 
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages,7000);
});