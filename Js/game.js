/**
 * Created by User on 12/28/2015.
 */
// welcome screen
welcome();

// called when start button on welcome screen is pressed

function gameInit(load) {
    createBoard(20, 32); // create a x b tiles
    /*if (load) {
        loadStoredBoard();
    } else {
        createMap(); // generate a map, use it to give tiles different classes for display/functionality
    }*/
    newGame();
    createSideBar(); // generate tools/inventory
    toolClick(0); // select pickaxe
    createLoadButton();
    createSaveButton();
    createNewGameButton();
    exitGame();

}
