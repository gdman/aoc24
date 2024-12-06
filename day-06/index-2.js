const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split(''));

let [ startRow, startCol ] = grid.reduce((start, row, rowIndex) => {
    const colIndex = row.indexOf('^');

    if (colIndex > -1) {
        start = [ rowIndex, colIndex ];
    }
    return start;
});

const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

const hasLoop = () => {
    let currentRow = startRow;
    let currentCol = startCol;
    let currentDirection = 0;
    let seen = [];
    
    while (true) {
        let nextRow = currentRow + directions[currentDirection][0];
        let nextCol = currentCol + directions[currentDirection][1];

        let nextSymbol = grid[nextRow]?.[nextCol];
    
        if (!nextSymbol) {
            return false;
        } else if (nextSymbol === '#' || nextSymbol === 'O') {
            const key = nextRow + ':' + nextCol + ':' + currentDirection;

            currentDirection = (currentDirection + 1) % 4;

            if (seen.includes(key)) {
                return true;
            } else {
                seen.push(key);
            }
        } else {
            currentRow = nextRow;
            currentCol = nextCol;
        }
    }
};

let counter = 0;

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '.') {
            grid[row][col] = 'O';
            
            if (hasLoop()) {
                counter++;
            }

            grid[row][col] = '.';
        }
    }
}

console.log(counter);