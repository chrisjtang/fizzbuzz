/*
************************************************************************
FizzBuzz Model Documentation: 
- I had trouble setting up sqlite3 on my workstation, so I ended up using PG.  Hopefully that doesn't interfere too much with the Browsable API testing.
- Also, I understand that best practice would be to include the URI in a secure node_env variable, but I kept it here for the sake of simplicity.
- As for the table itself, the fizzbuzzid is serialized, so it will increase by 1 with each new post.  Also, the creationdate is automatically pulling the current_timestamp. And since the useragent is pulled from the request object, this means that we only need requests to have the body of { "message": "string" }.
- I chose to do this to emulate how fizzbuzz would be inputted and submitted on something like a message board or input form.  

SQL query for table creation:
CREATE TABLE fizzbuzz (
fizzbuzzid SERIAL PRIMARY KEY,
useragent varchar(255) NOT NULL,
creationdate varchar(255) CURRENT_TIMESTAMP,
message varchar(255) NOT NULL
);

************************************************************************
*/

const { Pool } = require('pg');

const URI = 'postgres://ytspobex:EAstDPgfnWMAtJRZSPd3cEFHv4e1ZAGx@kashin.db.elephantsql.com/ytspobex';

const pool = new Pool({
  connectionString: URI
});

const query = (text, params, callback) => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};

module.exports = {query};