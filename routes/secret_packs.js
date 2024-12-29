const express = require("express");
const SecretPacks = require("../db/secret_packs");
const router = express.Router();
const apicache = require("apicache");

let cache = apicache.middleware;

router.get("/", async (req, res) => {
  try {
    const sets = await SecretPacks.getAllSecretPacks();
    res.json(sets);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const set = await SecretPacks.getSecretPack(id);
    res.json(set);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

module.exports = router;
