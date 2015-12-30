/**
 * Created by User on 12/30/2015.
 */
function createSaveButton(){
    var $save = $('<div></div>');
    $save.addClass('bottomButton');
    $save.text('SAVE');
    $save.on('click', function() {saveMap()});
    $('#bottom').append($save);
}
function createLoadButton(){
    var $load = $('<div></div>');
    $load.text('LOAD');
    $load.addClass('bottomButton');
    $load.on('click', function() {loadMap()});
    $('#bottom').append($load);
}
function createNewGameButton(){
    var $newGame = $('<div></div>');
    $newGame.text('NEW GAME');
    $newGame.addClass('bottomButton');
    $newGame.on('click', function(){newGame()});
    $('#bottom').append($newGame);

}

