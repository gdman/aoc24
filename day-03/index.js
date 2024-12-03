const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8');

let total = 0;

for (const match of data.matchAll(/mul\((?<a>[0-9]{1,3})\,(?<b>[0-9]{1,3})\)/g)) {
    const { a, b } = match.groups;
    total += parseInt(a) * parseInt(b); 
}

console.log(total);