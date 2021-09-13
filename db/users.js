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
      INSERT INTO USERS (username) values ($1) RETURNING *
      `;
      const { rows } = await query(query1, [username]);
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
};
