/**
 * Created by User on 12/28/2015.
 */

$board = [];

(function createBoard(sx, sy) {
    for (var i=0; i<sx; i++) {
        $board.push([]);
        var $row = $('<div></div>');
        $row.addClass('row');
        for (var j=0; j<sy; j++) {
            var $tile = $('<div></div>');
            $tile.addClass('tile');
            if (j%2) {
                $tile.addClass('sky');
            } else {
                $tile.addClass('cloud');
            }
            $tile.on('mouseover',tileHover(event));
            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }

}(20,32));

/*Tile Events*/
function tileHover(event){
    console.log(event);
/*    if (!event.buttons) {*/
        $(this).css('background-color', 'red');
  /*  }*/
}
