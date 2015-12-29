$board = [];
var tileClasses = ['sky', 'cloud', 'grass', 'earth', 'stone', 'trunk', 'leaves'];

(function createBoard(sx, sy) {
    for (var i=0; i<sx; i++) {
        $board.push([]);
        var $row = $('<div></div>');
        $row.addClass('row');
        for (var j=0; j<sy; j++) {
            var $tile = $('<div></div>');
            $tile.addClass('tile');
            $tile.addClass(tileClasses[map[i][j]]);
            $tile.on('click', clickTile.bind(this, i, j));
           /* $tile.on('mouseover', tileHover.bind(event, i, j));*/
            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }


}(20,32));

/*Tile Events*/
function tileHover(x, y, e) {
    console.log('e' + e + ' x' + x + ' y' + y);
    if (e) {
        if (e.buttons != 1)
            $board[x][y].css('border', '1px solid white');
        else
            $board[x][y].css('border', '1px solid red');
    } else {
        console.log('no e :(');
    }
}

function clickTile(x, y) {
    var tool = getTool();
    if (tool.name == 'inventory') {
        $board[x][y].removeClass();
        $board[x][y].addClass('tile');
        $board[x][y].addClass('wood');

    } else {
        /*if ($board[x][y].hasClass(tool.worksOn)) {
            $board[x][y].remove(tools.worksOn);
            $board[x][y].addClass('sky');
        }*/
        if (!$board[x][y].hasClass('sky')) {
            $board[x][y].removeClass();
            $board[x][y].addClass('tile');
            $board[x][y].addClass('sky');
        }
    }
}

/*WorkSpace - Yanai*/
function checkTile(x, y) {
    var tile = $board[x][y];
}

