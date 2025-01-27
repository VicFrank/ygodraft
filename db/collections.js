const { query } = require("./index");

const MAX_COLLECTIONS = 10;

module.exports = {
  async getRecentCollections() {
    try {
      const query1 = `
      SELECT collection_id, num_cards, username
      FROM collections
      JOIN users
      USING (user_id)
      ORDER BY created_at DESC
      LIMIT 100`;
      const { rows } = await query(query1);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getCollection(id) {
    try {
      const { rows } = await query(
        `SELECT * FROM collections WHERE collection_id = $1`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getCollectionCards(id) {
    try {
      const query1 = `
      SELECT * FROM collection_cards
      JOIN cards
      USING (card_id)
      WHERE collection_id = $1
      ORDER BY card_type, card_name;`;
      const { rows } = await query(query1, [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCollectionsForUser(userID) {
    try {
      const query1 = `
      SELECT collection_id, num_cards, collection_name, created_at, updated_at
      FROM collections
      WHERE user_id = $1
      ORDER BY updated_at`;
      const { rows } = await query(query1, [userID]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async collectionExists(id) {
    try {
      const { rows } = await query(
        "SELECT * FROM collections WHERE collection_id = $1",
        [id]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  },
  async addCardToCollection(collectionID, cardID, copies) {
    try {
      // Upsert the card
      await query(
        `INSERT INTO collection_cards(collection_id, card_id, copies) 
        VALUES($1, $2, $3)
        ON CONFLICT ON CONSTRAINT collection_cards_pkey
        DO
          UPDATE SET copies = EXCLUDED.copies + $3`,
        [collectionID, cardID, copies]
      );
    } catch (error) {
      throw error;
    }
  },
  async getNumCardsInCollection(collectionID) {
    try {
      const { rows } = await query(
        `SELECT SUM(copies) FROM collection_cards WHERE collection_id = $1`,
        [collectionID]
      );
      return rows[0].copies;
    } catch (error) {
      throw error;
    }
  },
  async updateNumCardsInCollection(collectionID) {
    try {
      await query(
        `UPDATE collections
        SET (num_cards) = (SELECT SUM(copies) FROM collection_cards WHERE collection_id = $1)
        WHERE collection_id = $1`,
        [collectionID]
      );
    } catch (error) {
      throw error;
    }
  },
  async createCollection(userID, name, cards, isMasterDuel) {
    try {
      if (!name) {
        const existingCollections = await this.getCollectionsForUser(userID);
        name = `My Collection (${existingCollections.length + 1})`;
        if (existingCollections.length >= MAX_COLLECTIONS) {
          throw new Error("Maximum number of collections reached");
        }
      }
      const { rows } = await query(
        `INSERT INTO collections (user_id, collection_name, is_master_duel) VALUES ($1, $2, $3) RETURNING *`,
        [userID, name, isMasterDuel]
      );
      const collectionID = rows[0].collection_id;
      let promises = [];
      for (const card of cards) {
        promises.push(
          this.addCardToCollection(collectionID, card.card_id, card.copies)
        );
      }
      await Promise.all(promises);
      await this.updateNumCardsInCollection();
      return collectionID;
    } catch (error) {
      throw error;
    }
  },
  async addCardsToCollection(collection, cards) {
    const { collection_id, num_cards } = collection;
    try {
      // Add the collection cards
      let promises = [];
      for (const card of cards) {
        promises.push(
          this.addCardToCollection(collection_id, card.card_id, card.copies)
        );
      }
      await Promise.all(promises);

      const numNewCards = cards.reduce((acc, curr) => (acc += curr.copies), 0);
      const numCards = num_cards + numNewCards;

      await query(
        `
        UPDATE collections SET (num_cards, updated_at) = ($2, NOW())
        WHERE collection_id = $1
        RETURNING collection_id
        `,
        [collection_id, numCards]
      );
      await this.updateNumCardsInCollection();
    } catch (error) {
      throw error;
    }
  },
  async updateCollection(collection_id, name, cards) {
    try {
      // Reset the collection cards
      await query("DELETE FROM collection_cards WHERE collection_id = $1", [
        collection_id,
      ]);
      // Add in all the cards
      let promises = [];
      for (const card of cards) {
        promises.push(
          this.addCardToCollection(collection_id, card.card_id, card.copies)
        );
      }
      await Promise.all(promises);

      const numCards = cards.reduce((acc, curr) => (acc += curr.copies), 0);

      await query(
        `
        UPDATE collections SET (collection_name, num_cards, updated_at) = ($2, $3, NOW())
        WHERE collection_id = $1
        `,
        [collection_id, name, numCards]
      );
    } catch (error) {
      throw error;
    }
  },
  async updateCollectionName(collection_id, name) {
    try {
      await query(
        `
        UPDATE collections SET (collection_name, updated_at) = ($2, NOW())
        WHERE collection_id = $1
        `,
        [collection_id, name]
      );
    } catch (error) {
      throw error;
    }
  },
  // async createCompressedCollection(userID, collectionData) {
  //   try {
  //     // TODO: Calculate number of collection cards
  //     const numCards = 0;
  //     const { rows } = await query(
  //       `
  //       INSERT INTO collections (collection_data, num_cards, user_id)
  //       VALUES ($1, $2, $3)
  //       RETURNING *
  //       `,
  //       [collectionData, numCards, userID]
  //     );
  //     const collectionID = rows[0].collection_id;
  //     return collectionID;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // async updateCompressedCollection(collectionID, collectionData) {
  //   try {
  //     // TODO: Calculate number of collection cards
  //     const numCards = 0;
  //     const { rows } = await query(
  //       `
  //       UPDATE collections SET (collection_data, num_cards, updated_at) = ($2, $3, NOW())
  //       WHERE collection_id = $1
  //       RETURNING collection_id
  //       `,
  //       [collectionID, collectionData, numCards]
  //     );
  //     if (rows.length === 0) return false;
  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  async deleteCollection(collectionID) {
    try {
      const { rows } = await query(
        "DELETE FROM collections WHERE collection_id = $1 RETURNING *",
        [collectionID]
      );
      return rows.length;
    } catch (error) {
      throw error;
    }
  },
};
