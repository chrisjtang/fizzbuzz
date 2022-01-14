const { Pool } = require('pg');

const URI = 'postgres://ytspobex:EAstDPgfnWMAtJRZSPd3cEFHv4e1ZAGx@kashin.db.elephantsql.com/ytspobex';

const pool = new Pool({
  connectionString: URI
});

const query = (text, params, callback) => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};


// table format
/*
CREATE TABLE fizzbuzz (
fizzbuzzid SERIAL PRIMARY KEY,
useragent varchar(255) NOT NULL,
creationdate varchar(255) CURRENT_TIMESTAMP,
message varchar(255) NOT NULL
);
*/

module.exports = {query};