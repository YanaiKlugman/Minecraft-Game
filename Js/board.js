$board = [];
tileClasses = ['sky', 'cloud', 'grass', 'earth', 'stone', 'wood', 'leaves'];

function createBoard(sx, sy) {
    for (var i=0; i<sx; i++) {
        $board.push([]);
        var $row = $('<div></div>');
        $row.addClass('row');
        for (var j=0; j<sy; j++) {
            var $tile = $('<div></div>');
            $tile.addClass('tile');
            $tile.on('click', clickTile.bind(event, i, j));
            $tile.on('mouseover', tileHover.bind(event, i, j));
            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }
}

// called when mouse hovers over a tile
function tileHover(x, y, e) {
    // trigger click if mouse button is down
    if (e) {
        if (e.buttons == 1)
        {
            clickTile(x, y);
        }
    }

    var isGood;
    getTool().worksOn.forEach(function (data) {
        if ($board[x][y].hasClass(data)) {
            isGood = true;
        }
    });
    if (isGood) {
        $board[x][y].addClass('interact');
    } else {
        $board[x][y].removeClass('interact');
    }

}

// called when a tile is clicked or mouseover when mouse button is down
function clickTile(x, y) {
    var tool = getTool();
    if (tool.name == 'inventory') {
        if (inventory.length) {
            $board[x][y].removeClass();
            $board[x][y].addClass('tile');
            $board[x][y].addClass(inventory[inventory.length - 1]);
            inventory.pop();
            $('#inventory').removeClass();
            $('#inventory').addClass('tools');
            if (inventory.length) {
                $('#inventory').addClass(inventory[inventory.length - 1]);
            }
        }
    } else {
        var shouldWork = false;
        var classThatWorks;
        getTool().worksOn.forEach(function (data) {
            if ($board[x][y].hasClass(data)) {
                shouldWork = true;
                classThatWorks = data;
            }
        })
        if (shouldWork){
            $board[x][y].removeClass(classThatWorks);
            $board[x][y].addClass('sky');
            inventory.push(classThatWorks);
            $('#inventory').removeClass();
            $('#inventory').addClass('tools');
            $('#inventory').addClass(classThatWorks);

        }
    }
}
