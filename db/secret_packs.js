const { query, pool } = require("./index");

module.exports = {
  async getSecretPacks(searchText) {
    try {
      if (searchText) {
        const { rows } = await query(
          `SELECT secret_pack_id, set_name, image_name FROM secret_packs
          JOIN secret_pack_cards USING (secret_pack_id)
          JOIN cards USING (card_id)
          WHERE set_name ILIKE $1 OR card_name ILIKE $1 OR card_desc ILIKE $1
          GROUP BY secret_pack_id, set_name, image_name
          ORDER BY set_name`,
          [`%${searchText}%`]
        );
        return rows;
      } else {
        const { rows } = await query(
          `SELECT * FROM secret_packs ORDER BY set_name`
        );
        return rows;
      }
    } catch (error) {
      throw error;
    }
  },
  async getSecretPack(id) {
    try {
      const { rows } = await query(
        `SELECT * FROM secret_packs WHERE secret_pack_id = $1`,
        [id]
      );

      const secretPack = rows[0];

      const { rows: cards } = await query(
        `SELECT 
          c.card_id, c.card_name, c.md_rarity, c.card_type, c.card_desc, 
          c.atk, c.def, c.card_level, c.race, c.attribute, c.archetype,
          ARRAY_AGG(sp2.set_name) FILTER (
            WHERE sp2.set_name IS NOT NULL 
            AND sp2.secret_pack_id != $1
            AND c.md_rarity IN ('Ultra Rare', 'Super Rare')
          ) as secret_packs
        FROM secret_pack_cards spc
        JOIN cards c USING(card_id)
        LEFT JOIN secret_pack_cards spc2 ON c.card_id = spc2.card_id
        LEFT JOIN secret_packs sp2 ON spc2.secret_pack_id = sp2.secret_pack_id
        WHERE spc.secret_pack_id = $1
        GROUP BY c.card_id
        ORDER BY c.md_rarity DESC, c.card_name`,
        [id]
      );

      secretPack.cards = cards;
      return secretPack;
    } catch (error) {
      throw error;
    }
  },
  async addSecretPack(setName, imageName, cardIds) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `INSERT INTO secret_packs(set_name, image_name) 
         VALUES ($1, $2) 
         RETURNING secret_pack_id`,
        [setName, imageName]
      );

      const { secret_pack_id } = rows[0];

      await client.query(
        `INSERT INTO secret_pack_cards(card_id, secret_pack_id)
         SELECT unnest($1::int[]), $2
         ON CONFLICT DO NOTHING`,
        [cardIds, secret_pack_id]
      );

      await client.query("COMMIT");
      return secret_pack_id;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  async getAllMasterPackCards() {
    try {
      const { rows } = await query(
        `SELECT 
        c.*,
        ARRAY_AGG(sp.set_name) FILTER (
          WHERE sp.set_name IS NOT NULL 
          AND c.md_rarity IN ('Ultra Rare', 'Super Rare')
        ) as secret_packs
      FROM cards c
      LEFT JOIN secret_pack_cards spc ON c.card_id = spc.card_id
      LEFT JOIN secret_packs sp ON spc.secret_pack_id = sp.secret_pack_id
      WHERE c.in_master_pack = true
      GROUP BY c.card_id`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
