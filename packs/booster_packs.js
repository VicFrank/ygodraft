const Rarities = require("./rarities");

const dist1 = {
  guaranteed: [
    { rarity: Rarities.COMMON, amount: 7 },
    { rarity: Rarities.RARE, amount: 1 },
  ],
  wildCards: 1,
  defaultWildCard: Rarities.COMMON,
  wildCardRates: [
    { rarity: Rarities.SUPER_RARE, freq: 1 / 6 },
    { rarity: Rarities.ULTRA_RARE, freq: 1 / 12 },
    { rarity: Rarities.SECRET_RARE, freq: 1 / 23 },
  ],
};

const dist2 = {
  guaranteed: [
    { rarity: Rarities.COMMON, amount: 7 },
    { rarity: Rarities.RARE, amount: 1 },
  ],
  wildCards: 1,
  defaultWildCard: Rarities.COMMON,
  wildCardRates: [
    { rarity: Rarities.SUPER_RARE, freq: 1 / 6 },
    { rarity: Rarities.ULTRA_RARE, freq: 1 / 24 },
    { rarity: Rarities.SECRET_RARE, freq: 1 / 31 },
  ],
};

const dist3 = {
  guaranteed: [
    { rarity: Rarities.COMMON, amount: 7 },
    { rarity: Rarities.RARE, amount: 1 },
  ],
  wildCards: 1,
  defaultWildCard: Rarities.COMMON,
  wildCardRates: [
    { rarity: Rarities.SUPER_RARE, freq: 1 / 5 },
    { rarity: Rarities.ULTRA_RARE, freq: 1 / 12 },
    { rarity: Rarities.SECRET_RARE, freq: 1 / 23 },
  ],
};

const dist4 = {
  guaranteed: [
    { rarity: Rarities.COMMON, amount: 7 },
    { rarity: Rarities.RARE, amount: 1 },
  ],
  wildCards: 1,
  defaultWildCard: Rarities.SUPER_RARE,
  wildCardRates: [
    { rarity: Rarities.ULTRA_RARE, freq: 1 / 6 },
    { rarity: Rarities.SECRET_RARE, freq: 1 / 12 },
  ],
};

module.exports = {
  "Legend of Blue Eyes White Dragon": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Metal Raiders": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Magic Ruler": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  // Spell ruler lol
  "Spell Ruler": {
    packType: "booster_europe",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Pharaoh's Servant": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Labyrinth of Nightmare": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Legacy of Darkness": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Pharaonic Guardian": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Magician's Force": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Dark Crisis": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Invasion of Chaos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  "Ancient Sanctuary": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist1,
  },
  // Booster dist 2
  "Soul of the Duelist": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Rise of Destiny": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Flaming Eternity": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "The Lost Millennium": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Cybernetic Revolution": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Elemental Energy": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Shadow of Infinity": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Enemy of Justice": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Power of the Duelist": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Cyberdark Impact": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Strike of Neos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  "Force of the Breaker": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist2,
  },
  // Booster dist 3
  "Tactical Evolution": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Gladiator's Assault": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Phantom Darkness": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Light of Destruction": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "The Duelist Genesis": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Crossroads of Chaos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Crimson Crisis": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Raging Battle": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Ancient Prophecy": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Stardust Overdrive": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Absolute Powerforce": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "The Shining Darkness": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Duelist Revolution": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Starstrike Blast": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Storm of Ragnarok": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Extreme Victory": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Generation Force": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Photon Shockwave": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Order of Chaos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Galactic Overlord": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Return of the Duelist": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Abyss Rising": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Cosmo Blazer": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Lord of the Tachyon Galaxy": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Judgment of the Light": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Shadow Specters": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Legacy of the Valiant": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Primal Origin": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Duelist Alliance": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "The New Challengers": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Secrets of Eternity": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Crossed Souls": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Clash of Rebellions": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "Dimension of Chaos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "The Secret Forces": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  "High-Speed Riders": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist3,
  },
  // Modern (post 2016) dist4
  "Breakers of Shadow": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Wing Raiders": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Shining Victories": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "The Dark Illusion": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Invasion: Vengeance": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Destiny Soldiers": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Raging Tempest": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Fusion Enforcers": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Maximum Crisis": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Pendulum Evolution": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Code of the Duelist": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Circuit Break": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Spirit Warriors": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Extreme Force": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Flames of Destruction": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Dark Saviors": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Cybernetic Horizon": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Shadows in Valhalla": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Soul Fusion": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Hidden Summoners": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Savage Strike": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "The Infinity Chasers": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Duel Power": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Duelist Saga": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Dark Neostorm": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Rising Rampage": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Fists of the Gadgets": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Chaos Impact": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Mystic Fighters": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Ignition Assault": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Duel Overload": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Secret Slayers": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Eternity Code": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Toon Chaos": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Rise of the Duelist": {
    packType: "booster?",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Phantom Rage": {
    packType: "booster?",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Genesis Impact": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Blazing Vortex": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Ancient Guardians": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Ghosts From the Past": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "Lightning Overdrive": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
  "King's Court": {
    packType: "booster",
    cardsPerPack: 9,
    distribution: dist4,
  },
};
