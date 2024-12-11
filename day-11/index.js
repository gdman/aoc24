const fs = require('fs');

const numbers = fs.readFileSync(__dirname + '/input.txt', 'utf8').split(' ').map(num => parseInt(num));

for (let i = 0; i < 25; i++) {
    for (let j = 0; j < numbers.length; j++) {
        const number = numbers[j];
        const numberString = number.toString();

        if (number === 0) {
            numbers[j] = 1;
        } else if (numberString.length % 2 === 0) {
            const partLength = numberString.length / 2;

            numbers[j] = parseInt(numberString.substring(0, partLength));
            numbers.splice(j + 1, 0, parseInt(numberString.substring(partLength, partLength + partLength)));
            j++;
        } else {
            numbers[j] *= 2024;
        }
    }
}


console.log(numbers.length);