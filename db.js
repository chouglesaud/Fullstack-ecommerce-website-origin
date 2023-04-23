require("dotenv").config();
const { Pool } = require("pg");

const connectionString = `postgres://postgres:1234@localhost:5432/ecommerce`;
// postgres://postgres@localhost:5432/ecommerce

const proConfig = process.env.DATABASE_URL; //heroku addons
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : connectionString,
    ssl: false
});

module.exports = pool;
