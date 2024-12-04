const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split(''));

const isXmas = (rowIndex, colIndex, rowChange, colChange) => {
    for (const letter of [ 'M', 'A', 'S' ]) {
        rowIndex += rowChange;
        colIndex += colChange;

        if (grid[rowIndex]?.[colIndex] !== letter) {
            return false;
        }
    }

    return true;
}

const transformations = [ [ 0, 1 ], [ 0, -1], [ 1, 0 ], [ -1, 0], [ -1, 1 ], [ -1, -1 ], [ 1, 1 ], [ 1, -1 ] ];

let counter = 0;

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const anchorLetter = grid[row][col];

        if (anchorLetter !== 'X') {
            continue;
        }

        for (const [ rowChange, colChange ] of transformations) {
            if (isXmas(row, col, rowChange, colChange)) {
                counter++;
            }
        }
    }
}

console.log(counter);