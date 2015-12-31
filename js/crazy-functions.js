/**
 * Created by User on 12/30/2015.
 */

var events = [];
var flipDir = 1;

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
        flipDir = flipDir>0 ? -1 : 1;
        console.log('flip event, flipDir:' + flipDir);
        loadMap(flipDir);
    },
    repeat: 1,
    start: 0,
    interval: 100
};

var growTree = {
    name: 'grow-tree',
    func: function () {
        console.log('x:' + this.x + ',y:' + this.y);
        var tt = getTileType(this.x, this.y);
        if (tt==='earth' || tt==='grass') {
            changeTileType(this.x, this.y, 'wood');
            this.repeat++;
        } else {
            if (this.th) {
                changeTileType(this.x, this.y, 'wood');
                this.th--;
                this.repeat++;
            } else if (this.lh) {
                changeTileType(this.x, this.y-1, this.type);
                changeTileType(this.x, this.y, this.type);
                changeTileType(this.x, this.y+1, this.type);
                this.lh--;
                this.repeat++;
            }
        }
        this.x = this.x - 1;// (1*flipEvent);
    },
    repeat: 1,
    start: 0,
    interval: 400,
    th: 4,
    lh: 3,
    x: 0,
    y: 0,
    type: 'leaves'
}

var treeDrop = {
    name: 'tree-drop',
    func: function () {
        var newFall = cloneObject(fallEvent);
        newFall.type = this.type;
        newFall.x = this.x;
        newFall.y = this.y;
        newFall.storage = 'leaves'; //getTileType(this.y, this.x);
        createEvent(newFall);
    },
    repeat: 1,
    start: 0,
    interval: 0,
    x: 0,
    y: 0,
    type: ''
}

var fallEvent = {
    name: 'fall',
    func: function () {
        var tt = getTileType(this.x+1*flipDir, this.y);
        if (tt != 'grass' && tt != 'earth' && tt != 'stone') {
            changeTileType(this.x, this.y, this.storage);
            this.x = this.x + 1*flipDir;
            changeTileType(this.x, this.y, this.type);
            this.storage = tt;
            this.repeat++;
        }
    },
    repeat: 1,
    start: 0,
    interval: 100,
    x: 0,
    y: 0,
    type: '',
    storage: ''
};

var jumpEvent = {
    name: 'jump',
    func: function () {
        var cont = true;
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
            if (doesCollide(this.x - curHeight, this.y + this.x_vel * (this.progress+1))) cont = false;
        }
        this.progress = this.progress + 1;
        if (cont) this.repeat = 1;
        else this.repeat = 0;
    },
    repeat: 8,
    start: 40,
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

function doesCollide(x, y) {
    var tt = getTileType(x,y);
    if (tt == 'grass' || tt == 'earth' || tt == 'stone') {
        return true;
    }
    return false;
}

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
    //return $board[x%$board.length][(y+$board[0].length)%$board[0].length].attr('class');
}

function createEvent(event) {
    setTimeout(eventTimer.bind(this, event), event.start);
}

function eventTimer(event) {
    if (event.repeat--) {
        event.func();
        console.log('event: "' + event.name + '"');
        setTimeout(eventTimer.bind(this, event), event.interval);
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
