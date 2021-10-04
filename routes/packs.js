const express = require("express");
const cardSets = require("../db/cardsets");
const packOpener = require("../packs/packOpener");
const router = express.Router();

router.get("/open", async (req, res) => {
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

router.post("/openSets", async (req, res) => {
  let { cardsets, numPacks } = req.body;
  try {
    numPacks = Number(numPacks);

    let packs = [];
    for (const set of cardsets) {
      const setCards = await cardSets.getCardSetCards(set);
      for (let i = 0; i < numPacks; i++) {
        packs.push(packOpener.openPack(setCards, set));
      }
    }

    return res.json(packs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
