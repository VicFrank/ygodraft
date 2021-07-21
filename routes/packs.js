const express = require("express");
const cards = require("../db/cards");
const cardSets = require("../db/cardSets");
const packOpener = require("../packs/packOpener");
const router = express.Router();

router.get("/openPacks", async (req, res) => {
  try {
    let { cardset, numPacks } = req.query;
    numPacks = Number(numPacks);

    const setCards = await cardSets.getCardSetCards(cardset);

    if (numPacks) {
      let packs = [];
      for (let i = 0; i < numPacks; i++) {
        packs.push(packOpener.openPack(setCards, cardset));
      }
      return res.json(packs);
    } else {
      const pack = packOpener.openPack(setCards, cardset);
      return res.json(pack);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
