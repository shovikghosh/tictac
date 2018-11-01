/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        } else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();

    if (isWinner(1)) {
        setTimeout(() => announceWinner(1), 100);
    } else {
        generateCompMove();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        if (!boxes[idx].innerText)
            boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


//----
function announceWinner(val) {
    const name = val === 1 ? 'Player' : 'Computer';
    const message = `${name} wins. Click OK to start a new game`;
    alert(message);
    reInitializeGrid();
    renderMainGrid();
    addClickHandlers();
}

function reInitializeGrid() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[i][j] = 0;
        }
    }
}

function generateCompMove() {
    const move = getCompMove();
    grid[move[0]][move[1]] = 2;
    renderMainGrid();
    if (isWinner(2)) {
        setTimeout(() => announceWinner(2), 100);
    }
    renderMainGrid();
    addClickHandlers();
}

function checkIsGameLeft() {
    if (!movesLeft) {
        setTimeout(() => announceDraw, 100);
        reInitializeGrid();
        renderMainGrid();
        addClickHandlers();
        return false;
    } else {
        return true;
    }
}

function announceDraw() {
    const message = `Game is drawn. Click OK to start a new game`;
    alert(message);
}

function getCompMove() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!grid[i][j]) {
                return [i, j];
            }
        }
    }
}

function movesLeft() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!grid[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function isWinner(val) {
    let win = true;
    //check row - wise win
    for (let i = 0; i < 3; i++) {
        win = true;
        for (let j = 0; j < 3; j++) {
            if (win && grid[i][j] === val) {
                continue;
            } else {
                win = false;
            }
        }
        if (win) {
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        win = true;
        for (let j = 0; j < 3; j++) {
            if (win && grid[j][i] === val) {
                continue;
            } else {
                win = false;
            }
        }
        if (win) {
            return true;
        }
    }

    win = (grid[0][0] === grid[1][1]) && (grid[2][2] == grid[1][1]) && grid[0][0] === val;
    if (win) {
        return win;
    }

    win = (grid[2][0] === grid[1][1]) && (grid[0][2] == grid[1][1]) && grid[2][0] === val;
    return win;
}

initializeGrid();
renderMainGrid();
addClickHandlers();