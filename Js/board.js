/**
 * Created by User on 12/28/2015.
 */

$board = [];

(function createBoard(sx, sy) {
    for (var i=0; i<sx; i++) {
        $board.push([]);
        var $row = $('<div></div>');
        $row.addClass('row');
        console.log($row);
        for (var j=0; j<sy; j++) {
            var $tile = $('<div></div>');
            $tile.addClass('tile');
            if (j%2) {
                $tile.addClass('sky');
            } else {
                $tile.addClass('cloud');
            }
            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }
    $board[1][1].css('background-color','black');
}(27,35));
