$(document).ready(function(){
    var cushionremind = false;
    var doorbellremind = false;
    var TOPIC;
    var client = false;
    
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
        window.location.href="posture.html";

    });
    
    //cushion edit
    $('#save-cushion').click(function(){
       
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
            if(value == '8787'){
                
                $('.postrue-title').text('攤背坐姿');
                $('.posture-img').attr('src', 'images/posture/3.jpeg');
                if(cushionremind == true){
                    $('.ui.cushion.modal')
                        .modal('show')
                    ;
                }
            }else if(value == '20090'){
                  $('.postrue-title').text('駝背坐姿');
                $('.posture-img').attr('src', 'images/posture/1.jpg');
                if(cushionremind == true){
                    $('.ui.cushion.modal')
                        .modal('show')
                    ;
                }
                
                
            }
             
        };
        
    });
     
    //doorbell edit
    $('#save-doorbell').click(function(){
       
        var deviceId = $('input[name="doorbell-deviceId"]').val();
        var sensorId = $('input[name="doorbell-sensorId"]').val();
        var key = $('input[name="doorbell-key"]').val();
        var url = $('input[name="doorbell-url"]').val();
        var doorbellremind = $('#doorbell-check').prop("checked");
        alert(deviceId +'\n' + sensorId + '\n' +key + '\n' + url + '\n' + doorbellremind );
        
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
            console.log(value);
            if(value == 1){
                $('#washingmachine-img').attr('src', 'images/svg/finished.svg');
                $('#doorbell-title').text('FINISHED');
                if(doorbellremind == true){
                    $('.ui.doorbell.modal')
                            .modal('show')
                        ;
                }
            }else{
                $('#washingmachine-img').attr('src', 'images/svg/notfinished.svg');
                $('#doorbell-title').text('NOT FINISHED');
            }
                
        };
        
    });
    



    
    
    
    
    
    
    
    
    $('#lightbulb-img').click(function(){
        name = $(this).attr('src')
        if(name == 'images/lightbulb/close.jpg'){
            $(this).attr('src', 'images/lightbulb/light.jpg');
            $(this).attr('height', '300');
            $('#lightbulb-title').text('ON');
 
            $.ajax({
                url:'/lightbulb',
                method: 'GET',
                cache: false, 
                data:{
                    'power':'1',
                }
                }).done(function (res) {
                    console.log("/ajax OFF success!")
                    alert('off');
                }).fail(function(){
                    console.log("/ajax OFF fail!")
                })

        }
        else if(name == 'images/lightbulb/light.jpg'){
            $(this).attr('src', 'images/lightbulb/close.jpg');
            $(this).attr('height', '300');
            $('#lightbulb-title').text('OFF');
        
            $.ajax({
                url:'/lightbulb',
                method: 'GET',
                cache: false, 
                data:{
                    'power':'0',
                }
                }).done(function (res) {
                    console.log("/ajax OFF success!")
                    alert('off');
                }).fail(function(){
                    console.log("/ajax OFF fail!")
                })
        }

    });
    
});