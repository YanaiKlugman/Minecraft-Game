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

            $tile.on('click', clickTile.bind(this, tempI, tempJ));

            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }


}(20,32));

/*Tile Events*/
function tileHover(event) {
    console.log(event);
    /*    if (!event.buttons) {*/
    $(this).css('background-color', 'red');

    function clickTile(x, y) {
        var tool = getTool();
        if (tool.name === 'inventory') {

        } else {
            if ($board[x][y].hasClass(tool.worksOn)) {
                $board[x][y].remove(tools.worksOn);
                $board[x][y].addClass('sky');
            }
        }
    }

    /*WorkSpace - Yanai*/
    function checkTile(x, y) {
        var tile = $board[x][y];
    }
}
