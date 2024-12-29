const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const DIRECTORY = path.join(__dirname, "../client/src/assets/images/cards");

async function convertPngToWebp() {
  try {
    const files = await fs.readdir(DIRECTORY);
    const pngFiles = files.filter((file) => file.endsWith(".png"));

    for (const file of pngFiles) {
      const inputPath = path.join(DIRECTORY, file);
      const outputPath = path.join(DIRECTORY, file.replace(".png", ".webp"));

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

      console.log(`Converted ${file} to WebP`);
    }
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

async function convertJpgToWebp() {
  try {
    const files = await fs.readdir(DIRECTORY);
    const jpgFiles = files.filter((file) => file.endsWith(".jpg"));

    for (const file of jpgFiles) {
      const inputPath = path.join(DIRECTORY, file);
      const outputPath = path.join(DIRECTORY, file.replace(".jpg", ".webp"));

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

      console.log(`Converted ${file} to WebP`);
    }
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

(async () => {
  console.time("Conversion");
  await convertPngToWebp();
  await convertJpgToWebp();
  console.timeEnd("Conversion");
})();
