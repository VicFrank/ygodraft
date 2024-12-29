const { query } = require("./index");

module.exports = {
  async getAllCards() {
    try {
      const { rows } = await query("SELECT * FROM cards");
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCard(id) {
    try {
      let { rows } = await query(
        `SELECT 
          c.*,
          JSON_AGG(DISTINCT l.marker) FILTER (WHERE l.marker IS NOT NULL) as linkmarkers,
          JSON_AGG(DISTINCT jsonb_build_object(
            'set_name', csc.set_name,
            'set_code', csc.set_code,
            'set_rarity', csc.set_rarity,
            'set_price', csc.set_price
          )) FILTER (WHERE cs.set_name IS NOT NULL) as card_sets
        FROM cards c
        LEFT JOIN card_linkmarkers l USING (card_id)
        LEFT JOIN card_set_cards csc USING (card_id)
        LEFT JOIN card_sets cs USING (set_name)
        WHERE c.card_id = $1
        GROUP BY c.card_id`,
        [id]
      );
      const card = rows[0];
      return card;
    } catch (error) {
      throw error;
    }
  },
  async searchCard(filters) {
    try {
      let query = `SELECT * FROM cards WHERE 1=1`;
      let values = [];
      let i = 0;

      if (filters.searchText) {
        query += `AND (card_name ILIKE $${++i} OR card_desc ILIKE $${i})`;
        values.push(`%${filters.searchText}%`);
      }
      if (filters.cardType) {
        query += `AND card_type = $${++i}`;
        values.push(filters.cardType);
      }
      if (filters.attackGreaterThan) {
        query += `AND atk >= $${++i}`;
        values.push(filters.attackGreaterThan);
      }
      if (filters.attackLessThan) {
        query += `AND atk <= $${++i}`;
        values.push(filters.attackLessThan);
      }
      if (filters.defenseGreaterThan) {
        query += `AND def >= $${++i}`;
        values.push(filters.defenseGreaterThan);
      }
      if (filters.defenseLessThan) {
        query += `AND def <= $${++i}`;
        values.push(filters.defenseLessThan);
      }
      if (filters.level) {
        query += `AND card_level = $${++i}`;
        values.push(filters.level);
      }
      if (filters.race) {
        query += `AND race = $${++i}`;
        values.push(filters.race);
      }
      if (filters.mdRarity) {
        query += `AND md_rarity = $${++i}`;
        values.push(filters.mdRarity);
      }
      if (filters.hasEffect) {
        query += `AND has_effect = $${++i}`;
        values.push(filters.hasEffect);
      }
      if (filters.attribute) {
        query += `AND attribute = $${++i}`;
        values.push(filters.attribute);
      }

      query += `ORDER BY card_name LIMIT 100`;
      const { rows } = await query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardByName(name) {
    try {
      const { rows } = await query(`SELECT * FROM cards WHERE card_name = $1`, [
        name,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async bulkGetCards(cardIds) {
    try {
      // test this for speed
      // `SELECT m.*
      // FROM   unnest('{17579, 17580, 17582}'::int[]) id
      // JOIN   member_copy m USING (id);`
      let { rows } = await query(
        `SELECT * FROM cards
      WHERE card_id = ANY($1::text[])`,
        [cardIds]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardLinkmarkers(id) {
    try {
      const { rows } = await query(
        `SELECT linkmarkers.marker
      FROM linkmarkers
      JOIN card_linkmarkers
      WHERE card_id = $1`,
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getCardSets(id) {
    try {
      const { rows } = await query(
        `SELECT set_name, set_code, set_rarity, set_rarity_code, set_price
      FROM card_set_cards
      JOIN cards USING (set_name)
      WHERE card_id = $1`,
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async getAllArchetypes() {
    try {
      const query1 = `SELECT DISTINCT(archetype)
      FROM cards
      WHERE archetype IS NOT NULL
      ORDER BY archetype`;
      const { rows } = await query(query1);
      return rows.map((row) => row.archetype);
    } catch (error) {
      throw error;
    }
  },
};
