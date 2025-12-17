const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Caik\\Desktop\\cantoes';

try {
    if (fs.existsSync(sourceDir)) {
        const files = fs.readdirSync(sourceDir);
        console.log('Files found:');
        files.forEach(file => console.log(file));
    } else {
        console.log('Directory not found:', sourceDir);
    }
} catch (err) {
    console.error('Error:', err.message);
}
