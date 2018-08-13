$(function() {
  //筛选
  $('#uid').on('keypress', function(e) {
    if (e.keyCode === 13) {
      var uid = mdui
        .JQ('#uid')
        .val()
        .trim();
      if (uid) {
        $('tbody>tr').each(function(index, item) {
          var $item = $(item);
          if (
            ~$item
              .data('id')
              .toString()
              .indexOf(uid)
          ) {
            $item.removeClass('mdui-hidden');
          } else {
            $item.addClass('mdui-hidden');
          }
        });
      } else {
        $('tr').removeClass('mdui-hidden');
      }
    }
  });

  //新增订阅
  $('#addSubscribe').on('click', function() {
    mdui.prompt(
      '请输入想要订阅微博uid：',
      function(value) {
        if (value) {
          $.ajax({
            url: '/api/subscribe',
            method: 'POST',
            data: { uid: value }
          })
            .then(function(msg) {
              if (msg.code === 200) {
                mdui.alert(msg.message, function() {
                  setTimeout(function() {
                    location.reload();
                  }, 1000);
                });
              } else {
                mdui.alert(msg.message);
              }
            })
            .fail(function() {
              mdui.alert('网络错误,请稍后重试');
            });
        }
      },
      function(value) {}
    );
  });

  //取消订阅
  $('.del').on('click', function() {
    var uid = mdui
      .JQ(this)
      .parent()
      .parent()
      .data('id');

    if (uid) {
      mdui.confirm('确认取消订阅吗', function() {
        $.ajax({
          url: '/api/subscribe',
          method: 'DELETE',
          data: {
            uid: uid
          }
        })
          .then(function(msg) {
            if (msg.code === 200) {
              mdui.alert(msg.message, function() {
                setTimeout(function() {
                  location.reload();
                }, 1000);
              });
            } else {
              mdui.alert(msg.message);
            }
          })
          .fail(function() {
            mdui.alert('网络错误,请稍后重试');
          });
      });
    }
  });
});
