const normalRarityRates = {
  "Ultra Rare": 2.5,
  "Super Rare": 7.5,
  Rare: 35,
  Common: 55,
};

const rareRarityRates = {
  "Ultra Rare": 2.5,
  "Super Rare": 7.5,
  Rare: 90,
};

const guaranteedRarityRates = {
  "Ultra Rare": 20,
  "Super Rare": 80,
};

const pityRarityRates = {
  "Ultra Rare": 100,
};

const buildRarityMap = (packCards) => {
  const rarityMap = {};
  for (const card of packCards) {
    const { md_rarity } = card;
    rarityMap[md_rarity] = rarityMap[md_rarity] || [];
    rarityMap[md_rarity].push(card);
  }
  return rarityMap;
};

const getRandomCardOfRarity = (rarityMap, rarity) => {
  const cards = rarityMap[rarity];
  return cards[Math.floor(Math.random() * cards.length)];
};

const getWeightedRandomRarity = (rarityRates) => {
  const random = 100 * Math.random();
  let cumSum = 0;
  for (const [rarity, rate] of Object.entries(rarityRates)) {
    cumSum += rate;
    if (cumSum >= random) {
      return rarity;
    }
  }
};

const openPack = (
  leftRarityMap,
  rightRarityMap,
  isGuaranteedPack,
  isPityPack
) => {
  // 4 secret pack cards per pack
  // 3 normal slots, 1 rare slot
  // 10th pack, rare slot is guaranteed slot, unless you're on a pity pack

  // - Normal Slots: UR 2.5%, SR 7.5%, R 35%, N 55%
  // - Rare Slots: UR 2.5%, SR 7.5%, R 90%
  // - Guaranteed Slot: UR 20%, SR 80%
  // - Pity Slot: UR 100%

  const pulledCards = [];

  // For the first 4 packs, pull from the left rarity map
  for (let i = 0; i < 4; i++) {
    const rarity = getWeightedRandomRarity(normalRarityRates);
    const pulledCard = getRandomCardOfRarity(leftRarityMap, rarity);
    pulledCards.push(pulledCard);
  }
  for (let i = 0; i < 3; i++) {
    const rarity = getWeightedRandomRarity(normalRarityRates);
    const pulledCard = getRandomCardOfRarity(rightRarityMap, rarity);
    pulledCards.push(pulledCard);
  }
  for (let i = 0; i < 1; i++) {
    let rates;
    if (isPityPack) rates = pityRarityRates;
    else if (isGuaranteedPack) rates = guaranteedRarityRates;
    else rates = rareRarityRates;
    const rarity = getWeightedRandomRarity(rates);
    const pulledCard = getRandomCardOfRarity(rightRarityMap, rarity);
    pulledCards.push(pulledCard);
  }

  return pulledCards;
};

module.exports = {
  openPacks(masterPackCards, packCards, numPacks) {
    const leftRarityMap = buildRarityMap(masterPackCards);
    const rightRarityMap = buildRarityMap(packCards);

    const packs = [];

    let hasPityPack = false;
    for (let i = 0; i < numPacks; i++) {
      let pulledCards = [];

      if (i % 10 === 9) {
        const isGuaranteedPack = i % 10 === 9;
        pulledCards = openPack(
          leftRarityMap,
          rightRarityMap,
          isGuaranteedPack,
          hasPityPack
        );

        // check if the last 10 packs contained a UR
        const lastTenPacks = packs.slice(-10);
        if (!lastTenPacks.some((card) => card.md_rarity === "UR")) {
          hasPityPack = true;
        }
      } else {
        pulledCards = openPack(leftRarityMap, rightRarityMap, false, false);
      }

      packs.push(pulledCards);
    }

    return packs;
  },
};
