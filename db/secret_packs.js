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
        `SELECT card_id, card_name, md_rarity, card_type, card_desc, atk, def, card_level, race,
        attribute, archetype
      FROM secret_pack_cards
      JOIN cards
      USING(card_id)
      WHERE secret_pack_id = $1`,
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
        `SELECT * from cards where in_master_pack = true`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
