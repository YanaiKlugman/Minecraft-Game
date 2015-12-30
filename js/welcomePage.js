/**
 * Created by User on 12/29/2015.
 */
function welcome(){
    $('.bottomButton').hide();
    $('#board').hide();


    var $startButton = $('<div></div>');
    $startButton.text("Ready to Play MineCraft?");
    $startButton.addClass('startButton');
    $startButton.fadeIn(2000);


    var timer;
    $startButton.on('click', function () {
        $('#board').show();
        $('#sidebar').fadeIn(2000);
        gameInit();
        $('.inner-container').css({'background':'none', 'padding':'0px'});
        $startButton.hide();
        $('.bottomButton').show();
        clearTimeout(timer);
    });
    $('.inner-container').append($startButton);
   /* timer = setTimeout(function () {
        $startButton.click();
    }, 1000);*/
}
/*

 var $inputName = $('<div></div>');
 $inputName.text("What's your name, solider?");
 $inputName.addClass('inputName');
 $inputName.fadeIn(2000);
 $inputName.on('click', function(){
 var $typeName = $('<input>');
 $typeName.attr('type', 'text');
 $('.inner-container').append($typeName);
 });
 */
