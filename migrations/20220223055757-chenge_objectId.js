const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db
      .collection("users")
      .updateOne({ gmail: "yihixor810@cocyo.com" }, { $set: { _id: id } });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db
      .collection("users")
      .updateOne({  gmail: "yihixor810@cocyo.com" }, { $set: { _id: 3 } });
  },
};
