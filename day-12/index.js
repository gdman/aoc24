const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(line => line.split(''));

let areas = [];

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const thisLetter = grid[row][col];
        let thisArea;

        if (thisLetter === grid[row][col-1]?.letter && thisLetter === grid[row-1]?.[col]?.letter && grid[row][col-1] !== grid[row-1]?.[col]) {
            const areaA = grid[row][col-1];
            const areaB = grid[row-1][col];

            areaA.cells.push(...areaB.cells);

            for (const [ mergeRow, mergeCol ] of areaB.cells) {
                grid[mergeRow][mergeCol] = areaA;
            }

            areaB.isMerged = true;
            areaB.letter = null;
            areaB.cells = [];

            thisArea = areaA;
        } else if (thisLetter === grid[row][col-1]?.letter) {
            thisArea = grid[row][col-1];
        } else if (thisLetter === grid[row-1]?.[col]?.letter) {
            thisArea = grid[row-1][col];
        } else {
            thisArea = {
                letter: thisLetter,
                cells: []
            };
            areas.push(thisArea);
        }

        thisArea.cells.push([ row, col ])

        grid[row][col] = thisArea;
    }

}

const directions = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ];

const countEdges = ([ row, col ], allAreaCells) => {
    const allCellsStrings = allAreaCells.map(([ row, col ]) => row + ':' + col);

    let counter = 0;
    for (const [ rowDiff, colDiff ] of directions) {
        if (!allCellsStrings.includes((row + rowDiff) + ':' + (col + colDiff))) {
            counter++;
        }
    }
    return counter;
}

let totalPrice = 0;

for (const area of areas.filter(area => !area.isMerged)) {
    let edges = 0;
    for (const cell of area.cells) {
        edges += countEdges(cell, area.cells);
    }
    totalPrice += edges * area.cells.length;
}

console.log(totalPrice);