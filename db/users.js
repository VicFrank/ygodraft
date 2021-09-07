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
};
