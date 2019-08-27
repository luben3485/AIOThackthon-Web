$(document).ready(function(){
    var stage = 0;
    var now = 0;

    var cushionremind = false;
    var url = 'ws://iot.cht.com.tw:80/iot/ws/rawdata';
    var key = 'PKKP7XVFSLCDV1JBV7';
    var deviceId = '18341781264';
    var sensorId = ['sensor_1','sensor_2','sensor_3','sensor_4','sensor_5','sensor_6','sensor_7'];
    var s0,s1,s2,s3,s4,s5,s6;
    var flag = [0,0,0,0,0];
    
    var timer = setInterval(function(){ 
        if(stage == 1){
            if(s1 > 2000 && s2 > 2000 && s5 > 2000 && s6 > 2000)
                flag[0] = 1;
            
        }else if(stage == 2){
            if(s1 > 2000 && s2 > 2000 && s5 > 2000 && s6 > 2000)
                flag[1] = 1;
            
        }else if(stage == 3){
            if(s1 > 2000 && s2 > 2000 && s5 > 2000 && s6 > 2000)
                flag[2] = 1;
            
        }else if(stage == 4){
            if(s1 > 2000 && s2 > 2000 && s5 > 2000 && s6 < 1000)
                flag[3] = 1;
            
        }else if(stage == 5){
            if(s1 < 1000 && s2 > 2000 && s5 > 2000 && s6 > 2000)
                flag[4] = 1;
            
        }
                          
                          
                          
    }, 500);
    
    var ws = new WebSocket(url);
    console.log(ws);
    ws.onopen = function() {
        let obj = {};
        for(var i=0;i<7;i++){
            obj.ck = key;
            obj.resources = [ "/v1/device/"+ deviceId +"/sensor/"+ sensorId[i] +"/rawdata" ] 
            ws.send(JSON.stringify(obj));
            console.log("send data...");
        }
     
    };
        
    ws.onmessage = function(evt) {
        var received_msg = evt.data;
        //console.log("receive data..." + received_msg);
        if(JSON.parse(received_msg).id == 'sensor_1'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s0 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_2'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s1 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_3'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s2 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_4'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s3 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_5'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s4 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_6'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s5 = value;
        }else if(JSON.parse(received_msg).id == 'sensor_7'){
            var value = JSON.parse(received_msg).value;
            console.log(value);
            s6 = value;
        }

        
        
    }
    
    
    
    
    
    
    
    
    
    $('#list').click(function(){
        $('.ui.sidebar')
        .sidebar('setting', { transition: 'overlay' })

          .sidebar('show')
          
        
    });
    
    
    $('#start').click(function(){
        
        //跟websocket連線
        
        $(this).css('display','none');
        $("#main").css('background', 0);
        $('#main').css('background-color','white');
        counter();
       
    });
    
    $('#rebtn').click(function(){
        
        //跟websocket連線
        
        $(this).css('display','none');
        $("#main").css('background', 0);
        $('#main').css('background-color','white');
        $('#score').css('display','none');
        $('#msg').css('display','none');
        counter();
       
    });
    
    function delay(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function counter(){
        for(var i=0;i<5;i++){
            flag[i] = 0;
        }
        $('#counter').text('3');
        $('#counter').css('display','block');
        delay(1000).then(() => {
            $('#counter').text('2');
            $('#counter').css('display','block');
            delay(1000).then(() => {
                $('#counter').text('1');
                $('#counter').css('display','block');
                delay(1000).then(() => {
                    $('#counter').css('display','none');
                    showimg();
                });
                
            });
            
        });
    }
    function showimg(){
        $('#exereise-img').css('display','block');
        $('#exereise-img').attr('src', 'images/exercise/1.jpg');
        $('#title').text('手往前撐直');
        $('#title').css('display','block');
        stage = 1;
        delay(5000).then(() => {
            $('#exereise-img').attr('src', 'images/exercise/2.jpg');
            $('#title').text('手向上抬舉');
            $('#title').css('display','block');
            stage = 2;
            delay(5000).then(() => {
                $('#exereise-img').attr('src', 'images/exercise/3.jpg');
                $('#title').text('手撐腰部');
                $('#title').css('display','block');
                stage = 3;
                delay(5000).then(() => {
                    $('#exereise-img').attr('src', 'images/exercise/4.jpg');
                    $('#title').text('大腿拉筋看左');
                    $('#title').css('display','block');
                    stage = 4;
                    delay(5000).then(() => {
                        $('#exereise-img').attr('src', 'images/exercise/5.jpg');
                        $('#title').text('大腿拉筋看右');
                        $('#title').css('display','block');
                        stage = 5;
                        delay(5000).then(() => {
                            stage =0 ;
                            $('#exereise-img').css('display','none');
                            $('#title').css('display','none');
                            getScore();
                        
                        });
                        
                     });
                });
            });
        });
        
    }
    
    function usefloor(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    
    function getScore(){
        //計算
        var score;
        var count = 0;
        for(var i=0;i<5;i++){
            if(flag[i] == 1)
                count ++;
            
        }
        if(count == 0){
            score =0;
        }else if(count == 1)
            score = usefloor(1,20)
        else if(count == 2)
            score = usefloor(21,40)
        else if(count == 3)
            score = usefloor(41,60)
        else if(count == 4)
            score = usefloor(61,80)
        else if(count == 5)
            score = usefloor(81,100)
        
        $('#score').text(score);
        $('#score').css('display','block');
        $('#msg').css('display','block');
        $('#rebtn').css('display','block'); 
        
        
    }
    
    
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