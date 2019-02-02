const { MongoClient } = require('mongodb');

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
let db;

module.exports = {

  connectToServer(callback) {
    MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        process.exit(1);
      }
      db = client.db(DB_NAME);
      return callback(err);
    });
  },

  getDb() {
    return db;
  },
};
