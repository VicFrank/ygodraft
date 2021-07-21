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

module.exports = router;
