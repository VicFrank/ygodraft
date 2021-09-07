const express = require("express");
const cards = require("../db/cards");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCards = await cards.getAllCards();
    res.json(allCards);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/archetypes", async (req, res) => {
  try {
    const archetypes = await cards.getAllArchetypes();
    res.json(archetypes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
