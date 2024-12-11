const fs = require('fs');

const numbers = fs.readFileSync(__dirname + '/input.txt', 'utf8').split(' ').map(num => parseInt(num));

const MAX_DEPTH = 75;

const sumCache = new Map();

const getNumberSum = (number, depth = 0) => {

    if (depth === MAX_DEPTH) {
        return 1;
    }

    if (sumCache.has(number + ':' + depth)) {
        return sumCache.get(number + ':' + depth);
    }

    depth++;

    const numberString = number.toString();
    const nextNumbers = [];

    if (number === 0) {
        nextNumbers.push(1);
    } else if (numberString.length % 2 === 0) {
        const partLength = numberString.length / 2;

        const firstNum = parseInt(numberString.substring(0, partLength));
        const secondNum = parseInt(numberString.substring(partLength, partLength + partLength));

        nextNumbers.push(firstNum, secondNum);
    } else {
        nextNumbers.push(number * 2024);
    }

    let totalSum = 0;

    for (const nextNumber of nextNumbers) {
        const sum = getNumberSum(nextNumber, depth);
        sumCache.set(nextNumber + ':' + depth, sum);
        totalSum += sum;
    }
    
    return totalSum;
}

let sum = 0;
for (const number of numbers) {
    sum += getNumberSum(number);
}

console.log(sum);