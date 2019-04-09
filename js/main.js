var pubnub = PUBNUB.init({
               publish_key: 'pub-c-bd0276ed-f876-49cc-b73d-aa05b31efe63',
               subscribe_key: 'sub-c-76d94746-b211-11e4-b35d-02ee2ddab7fe'
            });

pubnub.subscribe({
     channel: 'gpio-raspberry-control',
     message: function(m) {

          console.log(m)

          if('resp' in m) {
               if('on' ==  m['resp']){
                    $('#led').removeClass('dim');
                    $('#led').addClass('glow');
               } else {
                    $('#led').removeClass('glow');
                    $('#led').addClass('dim');
               }
          }
     }
});

document.getElementById('toggle').click(function(e){
     $('#led').addClass('glow');

     pubmsg = { "req" : "toggle" };
     pubnub.publish({
          channel : 'gpio-raspberry-control' ,
          message :  pubmsg
     });
});
