$(function() {
  $('#uid').on('keypress', function(e) {
    if (e.keyCode === 13) {
      var uid = $('#uid').val().trim();
      if(uid){
        $('tbody>tr').each(function(index,item){
          var $item = $(item);
          if(~$item.data('id').toString().indexOf(uid)){
            $item.removeClass('mdui-hidden');
          }else{
            $item.addClass('mdui-hidden');
          }
        });
      }else{
        $('tr').removeClass('mdui-hidden');
      }
      //   .val()
      //   .trim();
      // location.href = './?uid=' + uid;
    }
  });
  $('#addSubscribe').on('click', function() {
    var uid = prompt('请输入想要订阅微博uid?');
    if (uid) {
      $.post('/add', { uid: uid })
        .then(function(msg) {
          if (msg.code === 200) {
            alert(msg.message);
            location.reload();
          } else {
            alert(msg.message);
          }
        })
        .fail(function(msg) {
          alert(msg.message);
        });
    } else {
      alert('请输入正确的微博uid!');
    }
  });
});
