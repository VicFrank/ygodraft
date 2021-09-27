const { query } = require("./index");

module.exports = {
  async getUser(userID) {
    try {
      const query1 = `
      SELECT * FROM users
      WHERE user_id = $1
      `;
      const { rows } = await query(query1, [userID]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async createUser(username) {
    try {
      const query1 = `
      INSERT INTO users (username) values ($1) RETURNING *
      `;
      const { rows } = await query(query1, [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async findOrCreateGoogle(googleID, displayName) {
    try {
      const query1 = `
        WITH ins AS (
          INSERT INTO users (google_id, username)
          VALUES ($1, $2)
          ON CONFLICT (google_id) DO NOTHING
          RETURNING *
        )
        SELECT * FROM ins
        UNION
        SELECT * FROM users
      `;
      const { rows } = await query(query1, [googleID, displayName]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async updateUsername(userID, username) {
    try {
      const query1 = `
      UPDATE USERS SET username = $2 WHERE user_id = $1
      `;
      const { rows } = await query(query1, [userID, username]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async usernameTaken(username) {
    try {
      const query1 = `
      SELECT * FROM USERS WHERE username = $1
      `;
      const { rows } = await query(query1, [username]);
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  },
};
