/**
 * Created by User on 12/28/2015.
 */

$board = [];

(function createBoard(sx, sy) {
    var tempJ, tempI;

    for (var i = 0; i < sy; i++) {
        tempI = i;
        $board.push([]);
        var $row = $('<div></div>');
        $row.addClass('row');
        for (var j = 0; j < sx; j++) {
            tempJ = j;
            var $tile = $('<div></div>');
            $tile.addClass('tile');
            if (j % 2) {
                $tile.addClass('sky');
            } else {
                $tile.addClass('cloud');
            }

            /*WorkSpace - Yanai*/
            $tile.on('click', clickTile.bind(this, tempI, tempJ));
            $tile.on('mousedown', checkTile.bind(this, tempI, tempJ));
            //$tile.bind('click mousedown', {
                //click: clickTile(this, tempI, tempJ),
                //mousedown: checkTile(this, tempI, tempJ)
            //});
            /*End WorkSpace - Yanai*/

            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }
    $board[1][1].css('background-color', 'black');
}(32, 20));


/*WorkSpace - Yanai*/
function clickTile(x, y) {
    //console.log($(this).className)
    console.log($board[y][x]);
    $board[y][x].toggle('sky');
    $board[y][x].toggle('cloud');
}

function checkTile(x, y) {
    var tile = $board[x][y];
}
/*End WorkSpace - Yanai*/