/**
 * Created by User on 12/28/2015.
 */
var tools = [];
var inventory = [];
var toolNames = ['hand', 'pickaxe', 'shovel', 'axe', 'inventory'];
var inventoryItems = ['stone', 'wood', 'leaves', 'grass', 'earth'];
var inventoryAmounts = [0, 0, 0, 0, 0];


function toolClick(i) {
    $('.tools').css('background-color','transparent');
    $('.invItem').css('border','1px solid black');
    if (i<4) {
        $('#' + toolNames[i]).css('background-color', '#395668');
    } else {
        console.log(i);
        $('.invItem')[i-4].style.border = '1px solid gold';
    }
    tools.forEach(function (data, index) {
        data.isSelected = false;
    });
    tools[i].isSelected = true;
    if (getTool().name === 'pickaxe'){
        $('#board').removeClass();
        $('#board').addClass('cursor-pickaxe');
    }
    if (getTool().name === 'axe'){
        $('#board').removeClass();
        $('#board').addClass('cursor-axe');
    }
    if (getTool().name === 'shovel'){
        $('#board').removeClass();
        $('#board').addClass('cursor-shovel');
    }
    if (getTool().name === 'inventory') {
        $('#board').removeClass();
        $('#board').addClass('cursor-inventory');
    }
    if (getTool().name === 'inventory') {
        $('#board').removeClass();
        $('#board').addClass('cursor-hand');
    }
}

var toolWorksOn = [
    ['stone', 'leaves', 'wood', 'cloud'],
    ['stone'],
    ['grass', 'earth'],
    ['wood', 'leaves'],
    []
];

function createSideBar(){
    for (var i = 0; i < toolNames.length-1; i++) {
        var tool = {};
        var $div = $('<div></div>');
        $div.addClass('tools');
        $div.attr('id', toolNames[i]);
        $div.bind('mousedown', toolClick.bind(this,i));
        tool.selector = $('#toolbox').append($div);
        tool.isSelected = i!=0;
        tool.name = toolNames[i];
        tool.worksOn = toolWorksOn[i];
        tools[i] = tool;
    }
    for (var i=0; i<inventoryItems.length; i++) {
        $div = $('<div></div>');
        var tool = {};
        $div.addClass('tools ' + inventoryItems[i]);
        $div.addClass('invItem');
        $div.bind('mousedown', toolClick.bind(this, i+4));
        tool.itemSelector = $('#toolbox').append($div);
        tool.name = 'inventory';
        tool.tile = inventoryItems[i];
        tool.worksOn = toolWorksOn[4];
        tool.id = i;
        tools.push(tool);
    }
    //$('#hand').text('hand');*/
}

function inventoryClick() {

}


function getTool() {
    for (var x=0; x<tools.length; x++) {
        if (tools[x].isSelected) {
            return tools[x];
        }
    }
}

