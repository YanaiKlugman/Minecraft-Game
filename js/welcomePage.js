/**
 * Created by User on 12/29/2015.
 */
function welcome(){
    $('.saveload').hide();
    var $startButton = $('<input>');
    $startButton.attr('type', 'button');
    $startButton.attr('value', "Ready to Play MineCraft?");
    $startButton.addClass('startButton');
    $startButton.on('click', function () {
        $('.inner-container').fadeIn(1000);
        gameInit();
        $('.inner-container').css({'background':'none', 'padding':'0px'});
        $startButton.hide();
        $('.saveload').show();
    });
    $('.inner-container').append($startButton);
    setTimeout(function () {
        $startButton.click();
    }, 1000);
}