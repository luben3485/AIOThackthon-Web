$(document).ready(function(){
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
            $('#securemethodfield').css('display','block');
            //console.log('onChecked called<br>');
            
        },
        onUnchecked: function() {
            $('#securemethodfield').css('display','none');
            //console.log('onUnchecked called<br>');
        }
      })
    ;
    
    $("#form").submit(function(e){
        e.preventDefault();
        window.location.reload();
    });
    $('#exercise').click(function(){
        alert('fuck');

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