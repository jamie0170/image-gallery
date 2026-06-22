import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const resourceDir = path.join(rootDir, 'resourse');
const outputFile = path.join(rootDir, 'images.json');

const allowedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.bmp'
]);

function isImageFile(fileName) {
  return allowedExtensions.has(path.extname(fileName).toLowerCase());
}

const imageFiles = fs
  .readdirSync(resourceDir)
  .filter(isImageFile)
  .sort((a, b) => a.localeCompare(b))
  .map((fileName) => `resourse/${fileName}`);

fs.writeFileSync(outputFile, `${JSON.stringify(imageFiles, null, 2)}\n`, 'utf8');
console.log(`Generated ${imageFiles.length} image entries in images.json`);
