const fs = require('fs');
const path = require('path');

const dir = path.join('public', 'images', 'cantons');
const files = fs.readdirSync(dir);

files.forEach(file => {
    const oldPath = path.join(dir, file);
    const name = path.parse(file).name;
    const ext = path.parse(file).ext;

    // Avoid double v2 if already there (though unlikely)
    if (name.endsWith('-v2')) return;

    const newName = `${name}-v2${ext}`;
    const newPath = path.join(dir, newName);

    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} -> ${newName}`);
});
