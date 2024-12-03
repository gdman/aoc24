const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8');

let enabled = true;
let enabledData = '';

for (let i = 0; i < data.length; i++) {
    const isDont = data.substring(i, i + 7) === 'don\'t()';
    const isDo = data.substring(i, i + 4) === 'do()';

    if (isDont) {
        enabled = false;
        i += 6;
    } else if (isDo) {
        enabled = true;
        i += 4;
    }

    if (enabled) {
        enabledData += data[i];
    }
}

let total = 0;

for (const match of enabledData.matchAll(/mul\((?<a>[0-9]{1,3})\,(?<b>[0-9]{1,3})\)/g)) {
    const { a, b } = match.groups;
    total += parseInt(a) * parseInt(b); 
}

console.log(total);