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

    if (number === 0) {
        const nextNumber = 1;

        const sum = getNumberSum(nextNumber, depth);
        sumCache.set(nextNumber + ':' + depth, sum);
        return sum;
    } else if (numberString.length % 2 === 0) {
        const partLength = numberString.length / 2;

        const firstNum = parseInt(numberString.substring(0, partLength));
        const secondNum = parseInt(numberString.substring(partLength, partLength + partLength));

        const firstSum = getNumberSum(firstNum, depth);
        sumCache.set(firstNum + ':' + depth, firstSum);

        const secondSum = getNumberSum(secondNum, depth);
        sumCache.set(secondNum + ':' + depth, secondSum);

        return firstSum + secondSum;
    } else {
        const nextNumber = number * 2024;

        const sum = getNumberSum(nextNumber, depth);
        sumCache.set(nextNumber + ':' + depth, sum);

        return sum;
    }
}

let sum = 0;
for (const number of numbers) {
    sum += getNumberSum(number);
}

console.log(sum);