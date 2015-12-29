/**
 * Created by User on 12/28/2015.
 */
//                   0       1        2        3        4       5        6
var tileClasses = ['sky', 'cloud', 'grass', 'earth', 'stone', 'wood', 'leaves'];

function changeTile(x, y, type) {
    $board[y][x].removeClass();
    $board[y][x].addClass('tile');
    $board[y][x].addClass(tileClasses[type]);
}

function numBetween(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function createMap() {
    // fill map with sky
    for (var ctr=0; ctr<$board.length; ctr++) {
        for (var ctr2=0; ctr2<$board[ctr].length; ctr2++) {
            changeTile(ctr2, ctr, 0);
        }
    }

    // create clouds
    drawCloud(1,1,3,5);
    drawCloud(20,2,4,3);
    //drawCloud

    // draw ground
    var ground = numBetween(3, 7);
    console.log(ground);
    drawGround(ground);

    // draw trees
    drawTree(5,ground,3,3);
    drawTree(15,ground,4,5);
}

function drawCloud(cloudx,cloudy,height,width) {
    for (var ctr=cloudy; ctr<cloudy+height+1; ctr++) {
        for (var ctr2=((ctr==cloudy||ctr==cloudy+height)?cloudx+width-1:cloudx); ctr2<((ctr==cloudy||ctr==cloudy+height)?cloudx+width*2+1:cloudx+width*3); ctr2++) {
            changeTile(ctr2, ctr, 1);
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
