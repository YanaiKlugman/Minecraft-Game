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
            $tile.on('mouseout', tileMouseOut.bind(event, i, j));
            $tile.on('mousedown', function() {event.preventDefault()});
            $row.append($tile);
            $board[i].push($tile);
        }
        $('#board').append($row);
    }
}

// called when mouse hovers over a tile
function tileHover(x, y) {

    var isGood;
    getTool().worksOn.forEach(function (data) {
        if ($board[x][y].hasClass(data)) {
            isGood = true;
        }
    });
    if (getTool().name==='inventory') {
        if (inventory.length) isGood = true;
    }
    if (isGood) {
        $board[x][y].addClass('interact');
    } else {
        $board[x][y].removeClass('interact');
    }
}

function tileMouseOut(x, y) {
    $board[x][y].removeClass('interact');
}

// called when a tile is clicked or mouseover when mouse button is down
function clickTile(x, y) {
    var $inventory = $('#inventory');
    var tool = getTool();
    if (tool.name == 'inventory') {
        if (inventory.length) {
            var hasCloud = false;
            if ($board[x][y].hasClass('cloud')) {
                hasCloud = true;
            }
            $board[x][y].removeClass();
            $board[x][y].addClass('tile');
            if (hasCloud) $board[x][y].addClass('cloud');
            //var clsToAd = $board[x][y].attr('class');
            //$board[x][y].attr('class',clsToAd + inventory[inventory.length - 1]);
            $board[x][y].addClass(inventory[inventory.length - 1]);
            if (x > ($board.length-GROUND_HEIGHT)) {
                var growTreeClone = cloneObject(growTree);
                growTreeClone.x = x;
                growTreeClone.y = y;
                growTreeClone.type = inventory[inventory.length - 1];
                console.log(inventory[inventory.length - 1]);
                createEvent(growTreeClone);
            }
            inventory.pop();
            $inventory.removeClass();
            $inventory.addClass('tools');
            if (inventory.length) {
                $('#inventory').addClass(inventory[inventory.length - 1]);
            }
        }
    } else if (tool.name === 'hand') {

        // if using 'hand', see if we are clicking on an interactable object,
        //   and trigger an event if we are
        classList = $board[x][y].attr('class').split(/\s+/);
        var count = classList.length;
        $.each(classList, function (index, item) {
            if (item==='tile' || item==='interact') {
                classList.slice(index, 1);
                count--;
            }
        });

        // clicking on leaves causes items to fall out
        if ($board[x][y].hasClass('leaves')) {
            var dropClone = cloneObject(treeDrop);
            dropClone.x = x;
            dropClone.y = y;
            dropClone.type = numBetween(0,1) ? 'stone' : 'earth';
            createEvent(dropClone);
        // clicking on stones flicks them
        } else if ($board[x][y].hasClass('stone')) {
            var jumpClone = cloneObject(jumpEvent);
            jumpClone.x = x;
            jumpClone.y = y;
            jumpClone.height = numBetween(1, 4);
            jumpClone.interval = 65;
            jumpClone.repeat = (jumpClone.height + 1) * 2;
            jumpClone.type = 'stone';
            jumpClone.x_vel = numBetween(-2, 2);
            createEvent(jumpClone);
        // clicking on clouds flips the board
        } else if (count==1 && $board[x][y].hasClass('cloud')) {
            var flipClone = cloneObject(flipEvent);
            createEvent(flipClone);
        } else if ($board[x][y].hasClass('earth')) {
            var growTreeClone = cloneObject(growTree);
            growTreeClone.x = x;
            growTreeClone.y = y;
            createEvent(growTreeClone);
        }
    } else {
        var shouldWork = false;
        var classThatWorks;
        getTool().worksOn.forEach(function (data) {
            if ($board[x][y].hasClass(data)) {
                shouldWork = true;
                classThatWorks = data;
            }
        });
        if (shouldWork){
            $board[x][y].removeClass(classThatWorks);
            $board[x][y].removeClass('interact');
            $board[x][y].addClass('sky');
            inventory.push(classThatWorks);
            $inventory.removeClass();
            $inventory.addClass('tools');
            $inventory.addClass(classThatWorks);
        }
    }
}
