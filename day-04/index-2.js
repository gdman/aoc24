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


let counter = 0;

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const anchorLetter = grid[row][col];

        if (anchorLetter !== 'A') {
            continue;
        }

        let matches = 0;

        if (grid[row - 1]?.[col - 1] === 'M' && grid[row + 1]?.[col + 1] === 'S') {
            matches++;
        }

        if (grid[row - 1]?.[col + 1] === 'M' && grid[row + 1]?.[col - 1] === 'S') {
            matches++;
        }

        if (grid[row - 1]?.[col - 1] === 'S' && grid[row + 1]?.[col + 1] === 'M') {
            matches++;
        }

        if (grid[row - 1]?.[col + 1] === 'S' && grid[row + 1]?.[col - 1] === 'M') {
            matches++;
        }
        
        if (matches === 2) {
            counter++;
        }
    }
}

console.log(counter);