const express = require("express");
const cardsets = require("../db/cardsets");
const router = express.Router();
const apicache = require("apicache");

let cache = apicache.middleware;

router.get("/", cache("1 day"), async (req, res) => {
  const { type } = req.query;
  try {
    if (type) {
      const sets = await cardsets.getCardSetsByType(type);
      res.json(sets);
    } else {
      const allSets = await cardsets.getAllCardSets();
      res.json(allSets);
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

router.get("/:name", cache("1 month"), async (req, res) => {
  const { name } = req.params;
  try {
    const set = await cardsets.getCardSet(name);
    res.json(set);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

router.get("/:name/cards", cache("1 month"), async (req, res) => {
  const { name } = req.params;
  try {
    const set = await cardsets.getCardSetCards(name);
    res.json(set);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

module.exports = router;
