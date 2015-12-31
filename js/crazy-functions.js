/**
 * Created by User on 12/30/2015.
 */
/*function fallingLeaves (x,y){
    $board[1][3].addClass('falling-leaves');
}*/


var events = [];
var flipDir = 0;

function cloneObject(obj) {
    var copy = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            copy[key] = obj[key];
    }
    return copy;
}
var flipEvent = {
    name: 'invert',
    func: function () {
        loadMap(flipDir = flipDir ? 0 : 1);
    },
    repeat: 2,
    interval: 1000
};

var fallEvent = {};

var jumpEvent = {
    name: 'jump',
    func: function () {
        var curHeight = this.progress > this.height ? this.height - (this.progress - this.height) : this.progress;
        if (this.progress <= this.height) {
            if (this.gravity) this.interval *= 1.1;
            if (this.progress == 0) this.storage = 'sky';
            changeTileType(this.x - curHeight, this.y + this.x_vel*this.progress, this.storage);
            this.storage = getTileType(this.x - curHeight - 1, this.y + this.x_vel * (this.progress + 1));
            changeTileType(this.x - curHeight - 1, this.y + this.x_vel * (this.progress + 1), this.type);
        } else {
            if (this.gravity) this.interval *= .7;
            changeTileType(this.x - curHeight - 2, this.y + this.x_vel * this.progress, this.storage);
            this.storage = getTileType(this.x - curHeight - 1, this.y + this.x_vel * (this.progress+1));
            changeTileType(this.x - curHeight - 1, this.y + this.x_vel * (this.progress+1), this.type);
        }
        this.progress = this.progress + 1;
    },
    repeat: 8,
    interval: 300,
    height: 3,
    progress: 0,
    x: 0,
    y: 0,
    type: '',
    storage: '',
    x_vel: 0,
    gravity: false
};

function changeTileType(x, y, type) {
    $board[(x+$board.length)%$board.length][(y+$board[0].length)%$board[0].length].removeClass();
    $board[(x+$board.length)%$board.length][(y+$board[0].length)%$board[0].length].addClass('tile');
    $board[(x+$board.length)%$board.length][(y+$board[0].length)%$board[0].length].addClass(type);
}

function getTileType(x, y) {
    classList = $board[x%$board.length][(y+$board[0].length)%$board[0].length].attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
        if (item==='tile' || item==='interact' || item==='sky') {
            classList.slice(index, 1);
        }
    });
    return classList[classList.length-1];
}

function createEvent(event) {
    eventTimer(event, event.repeat);
}

function eventTimer(event, count) {
    if (count) {
        event.func();
        console.log('event: "' + event.name + '"');
        setTimeout(eventTimer.bind(this, event, count-1), event.interval);
    }
}

function initEvents() {
    //setInterval(iterateEvents, 100);
}

function iterateEvents() {
    events.forEach(function (data, index) {
        data.func();
        if (!--data.repeat) events.splice(index, 1);
    });
}
