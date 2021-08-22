const { query } = require("./index");

module.exports = {
  async getAllCardSets() {
    try {
      const query1 = `SELECT * FROM card_sets ORDER BY tcg_date`;
      const { rows } = await query(query1);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardSetsByType(type) {
    try {
      const query1 = `SELECT * FROM card_sets WHERE set_type = $1 ORDER BY tcg_date`;
      const { rows } = await query(query1, [type]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardSet(setName) {
    try {
      const query1 = `SELECT * FROM card_sets WHERE set_name = $1`;
      const { rows } = await query(query1, [setName]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardSetCards(setName) {
    try {
      const query1 = `
      SELECT card_id, card_name, set_rarity
      FROM card_set_cards JOIN cards USING(card_id)
      WHERE set_name = $1
      GROUP BY card_id, card_name, set_rarity
      `;
      const { rows } = await query(query1, [setName]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async addCardSet(cardSet) {
    try {
      const { set_name, set_code, num_of_cards, tcg_date } = cardSet;
      await query(
        `
        INSERT INTO card_sets(set_name, set_code, num_cards, tcg_date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING`,
        [set_name, set_code, num_of_cards, tcg_date]
      );
    } catch (error) {
      throw error;
    }
  },
};
