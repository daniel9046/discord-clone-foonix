const { Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = "postgres://rpyoafhz:BwZYLaZIlGqSHiiK3Z3xIyOK4zV9KHKh@mouse.db.elephantsql.com/rpyoafhz";

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
