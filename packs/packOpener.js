const boosterPacks = require("./booster_packs");

// Input: List of set cards
// Output: Map key = rarity, value = List of set cards
function getRarityMap(setCards) {
  let rarityMap = {};
  for (const card of setCards) {
    const { set_rarity } = card;
    rarityMap[set_rarity] = rarityMap[set_rarity] || [];
    rarityMap[set_rarity].push(card);
  }
  return rarityMap;
}

function getRandomCardOfRarity(rarityMap, rarity) {
  if (!rarityMap[rarity])
    throw new Error(`Card with rarity ${rarity} not found in set`);
  const cards = rarityMap[rarity];
  return cards[Math.floor(Math.random() * cards.length)];
}

function getWildCard(rarityMap, wildCardRates, defaultRarity) {
  const random = Math.random();
  let cumSum = 0;
  for (const rate of wildCardRates) {
    const { freq, rarity } = rate;
    cumSum += freq;
    if (cumSum >= random) {
      return getRandomCardOfRarity(rarityMap, rarity);
    }
  }
  return getRandomCardOfRarity(rarityMap, defaultRarity);
}

module.exports = {
  openPack(setCards, setName) {
    const packData = boosterPacks[setName];

    if (!packData)
      throw new Error(`Pack data for set with name ${setName} not found`);

    const { distribution } = packData;
    const rarityMap = getRarityMap(setCards);

    const { guaranteed, wildCards, defaultWildCard, wildCardRates } =
      distribution;

    // sort the wild card rates
    const sortedRates = wildCardRates.sort((a, b) => a.freq - b.freq);

    let pulledCards = [];

    // pull the guaranteed cards
    for (const pullData of guaranteed) {
      const { rarity, amount } = pullData;
      for (let i = 0; i < amount; i++) {
        const pulledCard = getRandomCardOfRarity(rarityMap, rarity);
        pulledCards.push(pulledCard);
      }
    }

    // pull the "wild" cards
    for (let i = 0; i < wildCards; i++) {
      const pulledCard = getWildCard(rarityMap, sortedRates, defaultWildCard);
      pulledCards.push(pulledCard);
    }

    return pulledCards;
  },
};
