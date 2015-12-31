/**
 * Created by User on 12/28/2015.
 */
// welcome screen
welcome();

// called when start button on welcome screen is pressed

function gameInit() {
    createBoard(20, 32); // create a x b tiles
    newGame(); // generate a map, use it to give tiles different classes for display/functionality
    createSideBar(); // generate tools/inventory
    toolClick(0); // select pickaxe
    createLoadButton();
    createSaveButton();
    createNewGameButton();
    initEvents();
}