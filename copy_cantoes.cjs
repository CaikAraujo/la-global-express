const fs = require('fs');
const path = require('path');

const map = {
    'geneve.webp': 'geneve.webp',
    'lausanne.webp': 'vaud.webp', // Vaud (Lausanne)
    'fribourg.jpeg': 'fribourg.jpeg',
    'Ville-de-Neuchatel.jpg': 'neuchatel.jpg',
    'valais.jpg': 'valais.jpg',
    'jura.jpg': 'jura.jpg'
};

const sourceDir = 'C:\\Users\\Caik\\Desktop\\cantoes';
const destDir = path.join(__dirname, 'public', 'images', 'cantons');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

Object.entries(map).forEach(([src, dest]) => {
    try {
        fs.copyFileSync(path.join(sourceDir, src), path.join(destDir, dest));
        console.log(`Copied ${src} to ${dest}`);
    } catch (err) {
        console.error(`Error copying ${src}:`, err.message);
    }
});
