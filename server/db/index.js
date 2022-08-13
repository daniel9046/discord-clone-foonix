const { Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgres://kszlhoxk:g6OVRpxr5pWyQLnXFLapP7dWf1c3TZft@heffalump.db.elephantsql.com/kszlhoxk`;

const client = new Client({
  connectionString: isProduction ? connectionString : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

const query = async (text, params) => {
  return await client.query(text, params);
};

module.exports = {
  client,
  query,
};
