const { query } = require("./index");

module.exports = {
  async getAllCards() {
    try {
      const query1 = `
      SELECT * FROM cards
      `;
      const { rows } = await query(query1);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCard(id) {
    try {
      const query1 = `
      SELECT * FROM cards
      WHERE card_id = $1
      `;
      let { rows } = await query(query1, [id]);
      const card = rows[0];
      // if card is a link monster, get linkmarkers
      if (card.linkval) {
        card.linkmarkers = await this.getCardLinkmarkers(id);
      }
      card.card_sets = await this.getCardSets(id);
      return card;
    } catch (error) {
      throw error;
    }
  },
  async bulkGetCards(cardIds) {
    const parsedCardIds = cardIds.join(",");
    try {
      const query1 = `
      SELECT * FROM cards
      WHERE card_id = ANY ('{$1}')
      `;
      // test this for speed
      // `SELECT m.*
      // FROM   unnest('{17579, 17580, 17582}'::int[]) id
      // JOIN   member_copy m USING (id);`
      let { rows } = await query(query1, [parsedCardIds]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardLinkmarkers(id) {
    try {
      const query1 = `
      SELECT linkmarkers.marker
      FROM linkmarkers
      JOIN card_linkmarkers
      WHERE card_id = $1
      `;
      const { rows } = await query(query1, [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardSets(id) {
    try {
      const query1 = `
      SELECT set_name, set_code, set_rarity, set_rarity_code, set_price
      FROM card_set_cards
      JOIN cards USING (set_name)
      WHERE card_id = $1
      `;
      const { rows } = await query(query1, [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getAllArchetypes() {
    try {
      const query1 = `
      SELECT DISTINCT(archetype)
      FROM cards
      WHERE archetype IS NOT NULL
      ORDER BY archetype
      `;
      const { rows } = await query(query1);
      return rows.map((row) => row.archetype);
    } catch (error) {
      throw error;
    }
  },
};
