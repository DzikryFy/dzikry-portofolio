import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SVG_PATH = path.resolve('public/icon.svg');
const svgBuffer = fs.readFileSync(SVG_PATH);

async function generate() {
  console.log('Generating PNG favicons from SVG...');

  // 1. Generate PNGs
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  fs.writeFileSync('public/favicon-48x48.png', p48);
  fs.writeFileSync('public/apple-touch-icon.png', p180);
  fs.writeFileSync('public/icon-192x192.png', p192);
  fs.writeFileSync('public/icon-512x512.png', p512);
  fs.writeFileSync('app/apple-icon.png', p180);
  fs.writeFileSync('app/icon.png', p192);

  console.log('Generating multi-size favicon.ico...');

  // 2. Generate ICO file containing 16x16, 32x32, 48x48
  const images = [
    { width: 16, height: 16, data: p16 },
    { width: 32, height: 32, data: p32 },
    { width: 48, height: 48, data: p48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * images.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(images.length, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Colors: 0 = No palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.data.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += img.data.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('app/favicon.ico', icoBuffer);

  console.log('Favicon generation completed successfully!');
}

generate().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
