/**
 * Created by User on 12/28/2015.
 */
//                   0       1        2        3        4       5        6
var tileClasses = ['sky', 'cloud', 'grass', 'earth', 'stone', 'wood', 'leaves'];
var map;

// save contents of tiles for loading in future
function saveMap() {
    map = [];
    for (var ctr=0; ctr<$board.length; ctr++) {
        map.push([]);
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            map[ctr].push($board[ctr][ctr2].attr('class'));
        }
    }
}

// load contents of saved map
function loadMap() {
    if (map) {
        map.forEach(function(data, index) {
           data.forEach(function (data2, index2) {
               $board[index][index2].attr('class', map[index][index2]);
           });
        });
    }
}

//load new game
function newGame(){
    createMap();
}

function changeTile(x, y, type) {
    $board[y][x].removeClass();
    $board[y][x].addClass('tile');
    $board[y][x].addClass(tileClasses[type]);
}

function numBetween(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function createMap() {
    var NUM_CLOUDS = 2;
    var NUM_TREES = numBetween(2,3);
    var GROUND_HEIGHT = numBetween(3, 7);
    // fill map with sky
    for (var ctr=0; ctr<$board.length; ctr++) {
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            changeTile(ctr2, ctr, 0);
        }
    }

    // create clouds
    var fcx, fcy, fch, fcw;
    fcx = numBetween(1, 9);
    fcy = numBetween(1, 5);
    fch = numBetween(3, 6);
    fcw = numBetween(2, 7);
    drawCloud(fcx, fcy, fch, fcw);
    
    fcx = numBetween(10, 20);
    fcy = numBetween(1, 5);
    fch = numBetween(3, 6);
    fcw = numBetween(2, 7);
    drawCloud(fcx, fcy, fch, fcw);
    //drawCloud(1,1,3,5);
    //drawCloud(20,2,4,3);

    // draw ground
    drawGround(GROUND_HEIGHT);

    // draw trees
    var tx, ty, tlh, tth;
    for (var ctr=0; ctr<NUM_TREES; ctr++) {
        tx = numBetween(1, $board[0].length - 2);
        ty = GROUND_HEIGHT;
        tlh = numBetween(2, 4);
        tth = numBetween(2, 7);
        drawTree(tx, ty, tlh, tth);
    }
    //drawTree(5,ground,3,3);
    //drawTree(15,ground,4,5);
}

function drawCloud(cloudx,cloudy,height,width) {
    for (var ctr=cloudy; ctr<cloudy+height+1; ctr++) {
        for (var ctr2=((ctr==cloudy||ctr==cloudy+height)?cloudx+width-1:cloudx); ctr2<((ctr==cloudy||ctr==cloudy+height)?cloudx+width*2+1:cloudx+width*3); ctr2++) {
            if (ctr2 < $board[0].length) {
                changeTile(ctr2, ctr, 1);
            }
        }
    }
}

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

function drawGround(height) {
    var top = $board.length - height;
    for (var y=top; y<$board.length; y++) {
        for (var x=0; x<$board[y].length; x++) {
            changeTile(x, y, y==top ? 2 : 3);
        }
    }
}
