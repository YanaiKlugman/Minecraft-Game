//                   0       1        2        3        4       5        6
var tileClasses = ['sky', 'cloud', 'grass', 'earth', 'stone', 'wood', 'leaves'];
var map;
var clouds;
var trees;
var rocks;
var loadOnStart = false;
var GROUND_HEIGHT;

// save contents of tiles into memory
function saveMap() {
    map = [];
    for (var ctr=0; ctr<$board.length; ctr++) {
        map.push([]);
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            map[ctr].push($board[ctr][ctr2].attr('class'));
        }
    }
}

// load from map saved in memory
function loadMap(invert) {
    if (map) {
        map.forEach(function(data, index) {
            data.forEach(function (data2, index2) {
                if (invert>0) {
                    $board[index][index2].attr('class', map[index][index2]);
                } else {
                    $board[$board.length-1-index][$board[0].length-1-index2].attr('class', map[index][index2]);
                }
            });
        });
    }
}

// save board into localstorage
function storeBoard() {
    localStorage.clear();
    for (var ctr=0; ctr<$board.length; ctr++) {
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            localStorage.setItem((ctr*$board[0].length+ctr2).toString(), $board[ctr][ctr2].attr('class'));
        }
    }
    saveMap();
}

// load board from localstorage
function loadStoredBoard() {
    $board.forEach(function (data, index) {
        data.forEach(function (data2, index2) {
            $board[index][index2].attr('class', localStorage.getItem(($board[0].length * index + index2).toString()));
        });
    });
}

// called on startup
function newGame(){
    flipDir = 1;
    if (loadOnStart) {
        loadStoredBoard();
        loadOnStart = false;
    } else {
        createMap();
    }
    saveMap();
}

// alter classes of a tile to change it's appearance to a new type
function changeTile(x, y, type) {
    var holder = '';
    if (type != 0 && type != 1) {
        if ($board[y][x].hasClass('sky')) holder = 'sky';
        if ($board[y][x].hasClass('cloud')) holder = 'cloud';
    }
    $board[y][x].removeClass();
    $board[y][x].addClass('tile');
    if (holder) $board[y][x].addClass(holder);
    $board[y][x].addClass(tileClasses[type]);
}

// returns random integer between a and b (inclusive)
function numBetween(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

// randomly generates elements and calls changeTile() for each tile of every element to draw the board
function createMap() {
    var NUM_CLOUDS = 2;
    var NUM_ROCKS = numBetween(2,4);
    var NUM_TREES = numBetween(2,3);
    GROUND_HEIGHT = numBetween(3, 7);
    // fill map with sky
    for (var ctr=0; ctr<$board.length; ctr++) {
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            changeTile(ctr2, ctr, 0);
        }
    }

    // create clouds
    clouds = [];
    var fcx, fcy, fch, fcw;
    fcx = numBetween(-3, 9);
    fcy = numBetween(1, 5);
    fch = numBetween(3, 6);
    fcw = numBetween(fcx<0 ? -fcx*2 : 2, 7);
    clouds.push({ x: fcx, y: fcy, h: fch, w: fcw });
    drawCloud(fcx, fcy, fch, fcw);
    
    fcx = numBetween(10, 20);
    fcy = numBetween(1, 5);
    fch = numBetween(3, 6);
    fcw = numBetween(2, 7);
    clouds.push({ x: fcx, y: fcy, h: fch, w: fcw });
    drawCloud(fcx, fcy, fch, fcw);

    //drawCloud(1,1,3,5);
    //drawCloud(20,2,4,3);

    // draw ground
    drawGround(GROUND_HEIGHT);

    // draw trees
    var good;
    trees = [];
    var tx, ty, tlh, tth;
    for (var ctr=0; ctr<NUM_TREES; ctr++) {
        do {
            good = true;
            tx = numBetween(1, $board[0].length - 2);
            ty = GROUND_HEIGHT;
            tlh = numBetween(2, 4);
            tth = numBetween(2, 7);
            trees.forEach(function (data) {
                if (tx >= data.x - 1 && tx <= data.x + 1) {
                    good = false;
                }
            });
        } while (!good);
        trees.push({ x: tx, y: ty, lh: tlh, th: tth });
        drawTree(tx, ty, tlh, tth);
    }

    // draw rocks
    rocks = [];
    for (var ctr=0; ctr<NUM_ROCKS; ctr++) {
        var rx, rh;
        do {
            good = true;
            rx = numBetween(0, $board[0].length-1);
            rh = numBetween(1, 2);
            trees.forEach(function (data) {
                if (data.x === rx) good = false;
            });
            rocks.forEach(function (data) {
                if (data.x === rx) good = false;
            })
        } while (!good);
        rocks.push({x: rx, y: GROUND_HEIGHT, h:rh });
        drawRock(rx, GROUND_HEIGHT, rh);
    }
}

function drawMap() {
    // fill map with sky
    for (var ctr=0; ctr<$board.length; ctr++) {
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            changeTile(ctr2, ctr, 0);
        }
    }

    // draw clouds
    clouds.forEach(function(data) {
        drawCloud(data.x, data.y, data.h, data.w);
    })

    // draw trees
    trees.forEach(function(data) {
        drawTree(data.x, data.y, data.lh, data.th);
    })

    // draw rocks
    rocks.forEach(function(data) {
        drawRock(data.x, data.y, data.h);
    })
}

function drawRock(x, groundHeight, pileHeight) {
    for (var ctr=0; ctr<pileHeight; ctr++) {
        changeTile(x, $board.length - groundHeight - ctr - 1, 4);
    }
}


// draw a cloud, params: x coord, y coord, height, width
function drawCloud(cloudx,cloudy,height,width) {
    for (var ctr=cloudy; ctr<cloudy+height+1; ctr++) {
        for (var ctr2=((ctr==cloudy||ctr==cloudy+height)?cloudx+width-1:cloudx); ctr2<((ctr==cloudy||ctr==cloudy+height)?cloudx+width*2+1:cloudx+width*3); ctr2++) {
            if (ctr2 < $board[0].length && ctr2 >= 0) {
                changeTile(ctr2, ctr, 1);
            }
        }
    }
}

// draw a tree, params: x coord, y coord, height of top part of tree (leaves/branches), height of trunk
function drawTree(x,y,leavesHeight,trunkHeight) {
    y = $board.length - y - 1;
    for (var ctr=y-trunkHeight; ctr>y-trunkHeight-leavesHeight; ctr--) {
        for (var ctr2=x-1; ctr2<=x+1; ctr2++) {
            changeTile(ctr2, ctr, 6);
        }
    }
    for (var ctr=y; ctr>y-trunkHeight; ctr--) {
        changeTile(x, ctr, 5);
    }
}

// draws ground from bottom to height
function drawGround(height) {
    var top = $board.length - height;
    for (var y=top; y<$board.length; y++) {
        for (var x=0; x<$board[y].length; x++) {
            changeTile(x, y, y==top ? 2 : 3);
        }
    }
}
