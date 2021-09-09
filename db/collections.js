const { query } = require("./index");

module.exports = {
  async getRecentCollections() {
    try {
      const query1 = `
      SELECT collection_id, num_cards, username
      FROM collections
      JOIN users
      USING (user_id)
      ORDER BY created_at DESC
      LIMIT 100
      `;
      const { rows } = await query(query1);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getCollection(id) {
    try {
      const query1 = `
      SELECT * FROM collections
      WHERE collection_id = $1
      `;
      const { rows } = await query(query1, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getCollectionsForUser(userID) {
    try {
      const query1 = `
      SELECT collection_id, num_cards, created_at, updated_at
      FROM collections
      WHERE user_id = $1
      `;
      const { rows } = await query(query1, [userID]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async createCollection(userID, collectionData) {
    try {
      // TODO: Calculate number of collection cards
      const numCards = 0;
      const { rows } = await query(
        `
        INSERT INTO collections (collection_data, num_cards, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [collectionData, numCards, userID]
      );
      const collectionID = rows[0].collection_id;
      return collectionID;
    } catch (error) {
      throw error;
    }
  },
  async updateCollection(collectionID, collectionData) {
    try {
      // TODO: Calculate number of collection cards
      const numCards = 0;
      const { rows } = await query(
        `
        UPDATE collections SET (collection_data, num_cards, updated_at) = ($2, $3, NOW())
        WHERE collection_id = $1
        RETURNING collection_id
        `,
        [collectionID, collectionData, numCards]
      );
      if (rows.length === 0) return false;
      return true;
    } catch (error) {
      throw error;
    }
  },
  async deleteCollection(collectionID) {
    try {
      await query(
        `
        DELETE collections WHERE collection_id = $1
        `,
        [collectionID]
      );
    } catch (error) {
      throw error;
    }
  },
};
