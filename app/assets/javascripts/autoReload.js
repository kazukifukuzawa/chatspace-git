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
      `<div class="chat-main__message-list--box" date-message-id=${message.id}>
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
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