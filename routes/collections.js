const express = require("express");
const collections = require("../db/collections");
const { encodeCollection, decodeCollection } = require("../encoding/encode");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { collection_id } = req.params;
    const recentCollections = await collections.getRecentCollections(collection_id);
    res.json(recentCollections);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    const collection = await collections.getCollection(collection_id);
    if (!collection) {
      return res.status(404).send({ message: "Collection not found" });
    }
    const decodedCollection = decodeCollection(collection.collection_data);
    res.json(decodedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { data, userID } = req.body;
    const encodedData = encodeCollection(data);
    const collectionID = await collections.createCollection(userID, encodedData);
    res.status(201).send({ collectionID: collectionID });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.put("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    const { data } = req.body;
    const encodedData = encodeCollection(data);
    await collections.updateCollection(collection_id, encodedData);
    res.status(200).send({ message: "Updated" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    await collections.deleteCollection(collection_id);
    res.status(204).send({ message: "Deleted" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
