const { query } = require("../db/index");
const { boosters } = require("../packs/setTypes");

const initializeSetTypes = async (sets, type) => {
  for (const setName of sets) {
    try {
      await query(
        "UPDATE card_sets SET set_type = $2 WHERE set_name = $1 RETURNING *",
        [setName, type]
      );
    } catch (error) {
      throw error;
    }
  }
};

(async function () {
  await initializeSetTypes(boosters, "Booster");
})();
