const { query } = require("./index");

module.exports = {
  async getAllSecretPacks() {
    try {
      const { rows } = await query(
        `SELECT * FROM secret_packs ORDER BY set_name`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getSecretPack(setName) {
    try {
      const { rows } = await query(
        `SELECT card_id, card_name, md_rarity
      FROM secret_pack_cards
      JOIN cards
      USING(card_id)
      WHERE set_name = $1`,
        [setName]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async addSecretPack(setName, cards) {
    try {
      await query(
        `
        INSERT INTO secret_packs(set_name) VALUES ($1)`,
        [setName]
      );

      for (const card of cards) {
        const { card_id } = card;
        await query(
          `
          INSERT INTO secret_pack_cards(card_id, set_name)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `,
          [card_id, setName]
        );
      }
    } catch (error) {
      throw error;
    }
  },
};
