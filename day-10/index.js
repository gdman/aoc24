const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split('').map(num => parseInt(num)));

const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

const getNextCells = (requiredHeight, [ row, col ]) => {
    const nextCells = [];

    for (const [ rowDiff, colDiff ] of directions) {
        const newRow = row + rowDiff;
        const newCol = col + colDiff;

        if (grid[newRow]?.[newCol] === requiredHeight) {
            nextCells.push([ newRow, newCol ]);
        }
    }

    return nextCells;
}

const getReachableTrailheads = (height, [ row, col ]) => {
    if (height === 9) {
        return new Set([ row + ':' + col ]);
    }

    const nextCells = getNextCells(height + 1, [ row, col ]);

    if (nextCells.length === 0) {
        return new Set();
    }

    let allReachableTrailHeads = new Set();

    for (const nextCell of nextCells) {
        const reachableTrailHeads = getReachableTrailheads(height + 1, nextCell);

        if (reachableTrailHeads.size > 0) {
            reachableTrailHeads.forEach(reachableTrailHead => allReachableTrailHeads.add(reachableTrailHead));
        }
    }
    return allReachableTrailHeads;
}

let total = 0;

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const height = grid[row][col];

        if (height !== 0) {
            continue;
        }

        total += getReachableTrailheads(0, [ row, col ]).size;
    }
}

console.log(total);