const { query } = require("../db/index");

const NUM_CARD_ID_BITS = 14;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function toBinaryString(number) {
  return Number(number).toString(2);
}

function encodeCard(freq, cardId) {
  const encodedFreq = toBinaryString(freq);
  const encodedCardId = toBinaryString(cardId).padStart(NUM_CARD_ID_BITS, "0");
  const combined = encodedFreq + encodedCardId;
  const decimalCode = parseInt(combined, 2);
  return decimalCode;
}

// Card code is a decimal number
function decodeCard(cardCode) {
  // First two bits are frequency, rest are the card code
  const freq = cardCode >> 14; // first two bits
  const id = cardCode & 0x3fff; // last 14 bits
  return { id, freq };
}

function generateSampleCardSet(numCards) {
  let cardSet = [];
  for (let i = 0; i < numCards; i++) {
    const copies = getRandomInt(3) + 1;
    cardSet.push({ id: i, copies });
  }

  return cardSet;
}

function encodeCollection(cardSet) {
  let codes = [];
  for (const card of cardSet) {
    const { copies, id } = card;
    const compressedCard = encodeCard(copies, id);
    codes.push(compressedCard);
  }
  const uint16 = new Uint16Array(codes);

  return uint16;
}

// decodes a unit8array into a set of cards
function decodeCollection(collectionData) {
  let cards = [];
  for (let i = 0; i < collectionData.length; i += 2) {
    // the bytes are in the wrong order, swap them
    const cardCode = combineBytes(collectionData[i + 1], collectionData[i]);
    const card = decodeCard(cardCode);
    cards.push(card);
  }
  return cards;
}

// Combines two octet (in decimal form) into a 4 byte string
function combineBytes(octet1, octet2) {
  const hexCode1 = octet1.toString(16).padStart(2, "0");
  const hexCode2 = octet2.toString(16).padStart(2, "0");
  const hexCode = hexCode1 + hexCode2;
  const parsedCode = parseInt(hexCode, 16);
  return parsedCode;
}

module.exports = {
  encodeCollection,
  decodeCollection,
};
