/**
 * Created by User on 12/29/2015.
 */
function welcome() {
    $('.bottomButton').hide();
    $('#board').hide();
    $('#sidebar').hide();


    var $startButton = $('<div></div>');
    $startButton.text("Play MineCraft");
    $startButton.addClass('startButton');
    $startButton.fadeIn(2000);

    var $continueButton = $('<div></div>');
    $continueButton.text("Continue Saved Game");
    $continueButton.addClass('continueButton');
    $continueButton.fadeIn(2000);

    $continueButton.on('click', function () {
        loadOnStart = true;
        $startButton.click();
    });

    /*    var timer;*/
    $startButton.on('click', function () {
        $('#board').show();
        $('#sidebar').show();
        gameInit();
        $('.container').addClass('main-game-container');
        /*css({'background-image': url('../images/back'), 'padding':'0px'});*/
        $('.inner-container').css({'padding-top': '0.4%', 'padding-bottom': '0.4%'});
        $startButton.hide();
        $continueButton.hide();
        $('.bottomButton').show();
        /*    clearTimeout(timer);*/
    });
    $('.inner-container').append($startButton);

    if (localStorage.length) {
        $('.inner-container').append($continueButton);
    }
    /* timer = setTimeout(function () {
     $startButton.click();
     }, 1000);*/
}