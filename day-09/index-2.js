const fs = require('fs');

const diskMap = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('').map(str => parseInt(str));

const disk = [];

for (let i = 0; i < diskMap.length; i += 2) {
    const id = i / 2;
    
    disk.push({ isFree : false, id, size: diskMap[i] });

    if (diskMap[i + 1] > 0 && i + 1 < diskMap.length) {
        disk.push({ isFree : true, size: diskMap[i + 1] });
    }
}

for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i].isFree) {
        continue;
    }

    for (let j = 0; j < disk.length && j < i; j++) {
        if (!disk[j].isFree) {
            continue;
        }

        if (disk[i].size === disk[j].size) {
            disk[j].isFree = false;
            disk[j].id = disk[i].id;

            disk[i].isFree = true;
            disk[i].id = null;
            break;
        } else if (disk[i].size < disk[j].size) {
            disk[j].size -= disk[i].size;
            disk.splice(j, 0, disk[i]);
            disk[i + 1] = { isFree : true, size : disk[j].size };
            i++;
            break;
        }
    }
}

const [ realIndex, checksum ] = disk.reduce(([ realIndex, checksum ], entry) => {
    for (let i = 0; i < entry.size; i++) {
        if (!entry.isFree) {
            checksum += realIndex * entry.id;
        }
        realIndex++;
    }
    return [ realIndex, checksum ]
}, [ 0, 0 ]);

console.log(checksum);