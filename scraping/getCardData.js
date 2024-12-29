const { query } = require("../db/index");
const cardSetsDB = require("../db/cardsets");
const fetch = require("node-fetch");

const boosterPacks = require("../packs/booster_packs");

const getCardSets = async () => {
  const response = await fetch("https://db.ygoprodeck.com/api/v7/cardsets.php");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const getCards = async () => {
  const response = await fetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

const createCardSets = async (cardSets) => {
  for (const cardSet of cardSets) {
    await cardSetsDB.addCardSet(cardSet);
  }
};

const createLinkmarkers = async () => {
  const linkmarkers = [
    "Bottom",
    "Top",
    "Left",
    "Right",
    "Bottom-Left",
    "Bottom-Right",
    "Top-Right",
    "Top-Left",
  ];

  for (const marker of linkmarkers) {
    try {
      await query(
        "INSERT INTO linkmarkers (marker) VALUES ($1) ON CONFLICT DO NOTHING",
        [marker]
      );
    } catch (error) {
      throw error;
    }
  }
};

// Parse the json data into the DB
const parseCards = async (cards, cardsets) => {
  let counter = 0;
  for (const card of cards) {
    const { id, name, type, desc, race, attribute, archetype } = card;
    const { atk, def, level, scale, linkval } = card;
    const { card_sets, card_images } = card;
    const { md_rarity, has_effect } = card.misc_info[0];

    counter += 1;
    if (counter % 100 === 0) {
      console.log(`Added ${counter} cards`);
    }

    try {
      await query(
        `INSERT INTO cards (card_id, card_name, card_type, card_desc, atk, def, card_level, race,
        attribute, scale, linkval, archetype, md_rarity, has_effect)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (card_id) DO UPDATE
      SET md_rarity = $13, has_effect = $14
      `,
        [
          id,
          name,
          type,
          desc,
          atk,
          def,
          level,
          race,
          attribute,
          scale,
          linkval,
          archetype,
          md_rarity,
          has_effect,
        ]
      );

      // Link Markers
      if (linkval) {
        const { linkmarkers } = card;
        for (const marker of linkmarkers) {
          await query(
            `
            INSERT INTO card_linkmarkers (card_id, marker)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `,
            [id, marker]
          );
        }
      }

      // Card sets
      if (card_sets) {
        for (const set of card_sets) {
          let { set_name, set_code, set_rarity, set_rarity_code, set_price } =
            set;
          set_price = parseFloat(set_price);

          // Insert the set, if doesn't already exist
          if (!cardsets.some((cardSet) => cardSet.set_name === set_name)) {
            await cardSetsDB.addCardSet(set);
          }
          await query(
            `
            INSERT INTO card_set_cards
              (card_id, set_name, set_code, set_rarity, set_rarity_code, set_price)
            VALUES ($1, $2, $3, $4, $5, $6)
          `,
            [id, set_name, set_code, set_rarity, set_rarity_code, set_price]
          );
        }
      }

      // Card Images
      for (const image of card_images) {
        const imageID = image.id;
        await query(
          `
        INSERT INTO images (image_id, card_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
          [imageID, id]
        );
      }
    } catch (error) {
      throw error;
    }
  }
};

const updateCardSets = async () => {
  for ([setName, setValues] of Object.entries(boosterPacks)) {
    const { packType } = setValues;
    let promises = [];
    promises.push(
      query("UPDATE card_sets SET set_type = $2 WHERE set_name = $1", [
        setName,
        packType,
      ])
    );
    await Promise.all(promises);
  }
};

(async function () {
  const cardsets = await getCardSets();
  const cards = await getCards();

  await createCardSets(cardsets);
  await createLinkmarkers();
  await parseCards(cards, cardsets);
  await updateCardSets();

  console.log("Finished adding cards");
})();
