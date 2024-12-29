const { query } = require("../db/index");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");
const SecretPacks = require("../db/secret_packs");
const Cards = require("../db/cards");
const packData = require("./secretPacks.json");

const validateCards = async () => {
  // Process cards in chunks of 100
  const chunkSize = 100;
  const cardChunks = [];

  const cards = packData.reduce((acc, pack) => {
    return acc.concat(pack.cards);
  }, []);

  for (let i = 0; i < cards.length; i += chunkSize) {
    cardChunks.push(cards.slice(i, i + chunkSize));
  }

  const missingCards = [];

  await Promise.all(
    cardChunks.map(async (chunk) => {
      const cards = await Promise.all(
        chunk.map((cardName) => Cards.getCardByName(cardName))
      );

      console.log("Processing chunk:", chunk[0], "-", chunk[chunk.length - 1]);

      chunk.forEach((cardName, index) => {
        if (!cards[index]) {
          missingCards.push(cardName);
        }
      });
    })
  );

  if (missingCards.length > 0) {
    console.log("Missing cards:", missingCards);
    return false;
  } else {
    console.log("All cards verified!");
    return true;
  }
};

const getParsedImageName = (name) => {
  // replace spaces with underscores, remove double quotes
  return name.replace(/ /g, "_").replace(/"/g, "");
};

const downloadImages = async () => {
  const header = new Headers({
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
  });
  for (const pack of packData) {
    const { image, name } = pack;
    const response = await fetch(image, { headers: header });

    const parsedName = getParsedImageName(name);

    if (!response.ok) {
      console.log("Error downloading image:", image);
      continue;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imagePath = path.join(
      __dirname,
      "./secret_packs",
      `${parsedName}.png`
    );

    await fs.writeFile(imagePath, buffer);
    console.log(`Saved ${parsedName}.png`);
  }
};

const createPacks = async () => {
  for (const pack of packData) {
    const { name, cards } = pack;
    const parsedName = getParsedImageName(name);
    const cardData = await Promise.all(
      cards.map((cardName) => Cards.getCardByName(cardName))
    );

    const cardIds = cardData.map((card) => card.card_id);
    await SecretPacks.addSecretPack(name, parsedName, cardIds);
    console.log(`Added ${name} to secret_packs`);
  }
};

(async function () {
  if (!(await validateCards())) return;
  // await downloadImages();
  await createPacks();
})();
