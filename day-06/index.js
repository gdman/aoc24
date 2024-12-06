const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split(''));

let [ currentRow, currentCol ] = grid.reduce((start, row, rowIndex) => {
    const colIndex = row.indexOf('^');

    if (colIndex > -1) {
        start = [ rowIndex, colIndex ];
    }
    return start;
});

const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

let currentDirection = 0;
let counter = 0;

while (true) {
    let nextRow = currentRow + directions[currentDirection][0];
    let nextCol = currentCol + directions[currentDirection][1];
    
    let nextSymbol = grid[nextRow]?.[nextCol];

    if (!nextSymbol) {
        counter++;
        break;
    } else if (nextSymbol === '#') {
        currentDirection = (currentDirection + 1) % 4;
    } else {
        if (nextSymbol !== 'X') {
            grid[nextRow][nextCol] = 'X';
            counter++;
        }

        currentRow = nextRow;
        currentCol = nextCol;
    }
}

console.log(counter);