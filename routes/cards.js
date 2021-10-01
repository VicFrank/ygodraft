const express = require("express");
const cards = require("../db/cards");
const router = express.Router();
const apicache = require("apicache");
let cache = apicache.middleware;

router.get("/", async (req, res) => {
  try {
    const allCards = await cards.getAllCards();
    res.json(allCards);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/bulk-get", async (req, res) => {
  const { cardIDs } = req.body;
  try {
    const allCards = await cards.bulkGetCards(cardIDs);
    res.json(allCards);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/archetypes", cache("1 month"), async (req, res) => {
  try {
    const archetypes = await cards.getAllArchetypes();
    res.json(archetypes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
