$(document).ready(function(){
    var now = 0;
    var cushionremind = false;
    
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
        $('#exereise-img').attr('src', 'images/posture/1.jpg');
        $('#title').text('請用力駝背');
        $('#title').css('display','block');
        delay(3000).then(() => {
            $('#exereise-img').attr('src', 'images/posture/2.jpeg');
            $('#title').text('靠近一點');
            $('#title').css('display','block');
            delay(3000).then(() => {
                $('#exereise-img').attr('src', 'images/posture/3.jpeg');
                $('#title').text('往後躺阿');
                $('#title').css('display','block');
                delay(3000).then(() => {
                    $('#exereise-img').attr('src', 'images/posture/4.jpeg');
                    $('#title').text('只能做1/3');
                    $('#title').css('display','block');
                    delay(3000).then(() => {
                        $('#exereise-img').css('display','none');
                        $('#title').css('display','none');
                        getScore();
                     });
                });
            });
        });
        
    }
    function getScore(){
        //計算
        $('#score').text('87');
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