const express = require("express");
const SecretPacks = require("../db/secret_packs");
const router = express.Router();
const apicache = require("apicache");
const secretPackOpener = require("../packs/secretPackOpener");

let cache = apicache.middleware;

router.get("/", async (req, res) => {
  try {
    const sets = await SecretPacks.getAllSecretPacks();
    return res.json(sets);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const set = await SecretPacks.getSecretPack(id);
    return res.json(set);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
    console.log(error);
  }
});

router.get("/actions/open", async (req, res) => {
  try {
    let { secretPackId, numPacks } = req.query;
    numPacks = Number(numPacks);

    let packs = [];

    const masterPackCards = await SecretPacks.getAllMasterPackCards();
    if (secretPackId == null) {
      packs = secretPackOpener.openPacks(
        masterPackCards,
        masterPackCards,
        numPacks
      );
    } else {
      const secretpack = await SecretPacks.getSecretPack(secretPackId);
      const packCards = secretpack.cards;

      packs = secretPackOpener.openPacks(masterPackCards, packCards, numPacks);
    }

    return res.json(packs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
