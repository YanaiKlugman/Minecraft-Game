/**
 * Created by User on 12/28/2015.
 */
var map = [];

(function createMap(y,x) {
    // fill map with sky
    for (var ctr=0; ctr<y; ctr++) {
        map[ctr] = [];
        for (var ctr2=0; ctr2<x; ctr2++) {
            map[ctr][ctr2] = 0;
        }
    }

    // create clouds
    drawCloud(1,1,3,5);
    drawCloud(20,2,4,3);

    // draw ground
    drawGround(6);

    // draw trees
    drawTree(5,6,3,3);
    drawTree(15,6,4,5);
}(20,32));

function drawCloud(cloudx,cloudy,height,width) {
    for (var ctr=cloudy; ctr<cloudy+height+1; ctr++) {
        for (var ctr2=((ctr==cloudy||ctr==cloudy+height)?cloudx+width-1:cloudx); ctr2<((ctr==cloudy||ctr==cloudy+height)?cloudx+width*2+1:cloudx+width*3); ctr2++) {
            map[ctr][ctr2] = 1;
        }
    }
}

function drawTree(x,y,leavesHeight,trunkHeight) {
    y = map.length - y - 1;
    for (var ctr=y-trunkHeight; ctr>y-trunkHeight-leavesHeight; ctr--) {
        for (var ctr2=x-1; ctr2<=x+1; ctr2++) {
            map[ctr][ctr2] = 6;
        }
    }
    for (var ctr=y; ctr>y-trunkHeight; ctr--) {
        map[ctr][x] = 5;
    }
}

function drawGround(height) {
    var top = map.length - height;
    for (var x=0; x<map[top].length; x++) {
        map[top][x] = 2;
    }
    for (var y=top+1; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            map[y][x] = 3;
        }
    }
}
