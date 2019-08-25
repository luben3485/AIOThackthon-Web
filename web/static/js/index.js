$(document).ready(function(){
    var cushionremind = false;
    
    $('#list').click(function(){
        $('.ui.sidebar')
        .sidebar('setting', { transition: 'overlay' })

          .sidebar('show')
          
        
    });
    
        /*checkbox*/
    $('.checkbox')
      .checkbox()
      .first().checkbox({
        onChecked: function() {
          
        },
        onUnchecked: function() {

        }
      })
    ;
    
    $('#exercise').click(function(){
        alert('fuck');

    });
    $('#save').click(function(){
       
        var deviceId = $('input[name="cushion-deviceId"]').val();
        var sensorId = $('input[name="cushion-sensorId"]').val();
        var key = $('input[name="cushion-key"]').val();
        var url = $('input[name="cushion-url"]').val();
        var cushionremind = $('#check').prop("checked");
        
        //alert(deviceId +'\n' + sensorId + '\n' +key + '\n' + url + '\n' + check );
        var ws = new WebSocket(url);
        console.log(ws);
        ws.onopen = function() {
            let obj = {};
            obj.ck = key;
            obj.resources = [ "/v1/device/"+ deviceId +"/sensor/"+ sensorId +"/rawdata" ] 
            ws.send(JSON.stringify(obj));
            console.log("send data...");
        };
        
         ws.onmessage = function(evt) {
            var received_msg = evt.data;
            //console.log("receive data..." + received_msg);
            var value = JSON.parse(received_msg).value[0]
            console.log(value)
            if(value == '20090'){
                
                //這裡要修改show 的圖案與文字
                
                if(cushionremind == true){
                    //這邊要改modal的圖案文字
                    $('.ui.cushion.modal')
                        .modal('show')
                    ;
                }
            }   
             
        };
        
    });
     
    
    
    $('#lightbulb-img').click(function(){
        name = $(this).attr('src')
        if(name == 'images/lightbulb/close.jpg'){
            $(this).attr('src', 'images/lightbulb/light.jpg');
            $(this).attr('height', '300');
            $('#lightbulb-title').text('ON');
        }
        else if(name == 'images/lightbulb/light.jpg'){
            $(this).attr('src', 'images/lightbulb/close.jpg');
            $(this).attr('height', '300');
            $('#lightbulb-title').text('OFF');
        }

    });
    
});