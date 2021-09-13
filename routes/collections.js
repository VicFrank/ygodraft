const express = require("express");
const collections = require("../db/collections");
const cards = require("../db/cards");
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
    if (!collection) return res.status(404).send({ message: "Collection not found" });

    const collection_cards = await collections.getCollectionCards(collection_id);

    res.json({ ...collection, collection_cards });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { cards, userID } = req.body;
    const collectionID = await collections.createCollection(userID, cards);
    res.status(201).send({ collectionID });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.put("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    const { cards } = req.body;
    const collectionExists = await collections.collectionExists(collection_id);
    if (!collectionExists) res.status(404).send({ message: "Collection not found" });
    await collections.setCollectionCards(collection_id, cards);
    res.status(200).send({ message: "Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/:collection_id", async (req, res) => {
  try {
    const { collection_id } = req.params;
    const numDeleted = await collections.deleteCollection(collection_id);
    if (numDeleted === 0) return res.status(404).send({ message: "Collection not found" });
    res.status(204).send({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// // Load the compressed version of the card collection
// router.get("/compressed/:collection_id", async (req, res) => {
//   try {
//     const { collection_id } = req.params;
//     const collection = await collections.getCollection(collection_id);
//     if (!collection) {
//       return res.status(404).send({ message: "Collection not found" });
//     }
//     // Decode the bytea into a list of ids and freqs
//     const decodedCollection = decodeCollection(collection.collection_data);
//     // Transform the list of ids and freqs to cards
//     const cardIds = decodedCollection.map((card) => card.id);
//     const cardsList = await cards.bulkGetCards(cardIds);
//     let collection_cards = cardsList.map((card, index) => ({
//       card: card,
//       copies: decodedCollection[index].freq,
//     }));

//     res.json({
//       user_id: collection.user_id,
//       collection_id: collection.collection_id,
//       created_at: collection.created_at,
//       updated_at: collection.updated_at,
//       num_cards: collection.num_cards,
//       collection_cards,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Server Error" });
//   }
// });

// router.post("/compressed", async (req, res) => {
//   try {
//     const { data, userID } = req.body;
//     const encodedData = encodeCollection(data);
//     const collectionID = await collections.createCollection(userID, encodedData);
//     res.status(201).send({ collectionID });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Server Error" });
//   }
// });

// router.put("/compressed/:collection_id", async (req, res) => {
//   try {
//     const { collection_id } = req.params;
//     const { data } = req.body;
//     const encodedData = encodeCollection(data);
//     const updateSuccess = await collections.updateCollection(collection_id, encodedData);
//     if (!updateSuccess) res.status(404).send({ message: "Collection not found" });
//     res.status(200).send({ message: "Updated" });
//   } catch (error) {
//     res.status(500).send({ message: "Server Error" });
//   }
// });

module.exports = router;
