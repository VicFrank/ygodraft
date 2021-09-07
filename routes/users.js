const express = require("express");
const users = require("../db/users");
const collections = require("../db/collections");
const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await users.getUser(user_id);
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/:user_id/collections", async (req, res) => {
  try {
    const { user_id } = req.params;
    const userCollections = await collections.getCollectionsForUser(user_id);
    res.json(userCollections);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
