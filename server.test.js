const { expect } = require('chai');
const request = require('supertest');
const { Pool } = require('pg');
const db = require('./models/fizzbuzzModel');

describe('Fizzbuzz testing', () => {
  let server;
  
  before('Mock database connection and load the server', async () => {
    const URI = 'postgres://ytspobex:EAstDPgfnWMAtJRZSPd3cEFHv4e1ZAGx@kashin.db.elephantsql.com/ytspobex';
    const pool = new Pool({
      connectionString: URI
    })

    //query to return a connection to the pool we created
    db.query = (test) => {
      return pool.query(test);
    }

    server = require('./server')
  })

  beforeEach('Create temporary tables', async () => {
    await db.query('CREATE TEMPORARY TABLE fizzbuzz (LIKE fizzbuzz INCLUDING ALL)')
  })

  beforeEach('Insert fake data', async () => {
      await db.query('INSERT INTO pg_temp.fizzbuzz (message) VALUES ("test message content")')
    })

  afterEach('Drop the temporary tables', async () => {
    await db.query('DROP TABLE IF EXISTS pg_temp.fizzbuzz')
  })

  describe('POST /fizzbuzz', () => {
    it('should create a new fizzbuzz', async () => {
      const req = {
        "message": "this is a test message"
      }
      await postFizzbuzz(req);

      const { rows } = await db.query(`SELECT * FROM "fizzbuzz"`)
      expect(rows).lengthOf(2)
      expect(rows[1]).to.deep.equal(req)
    })

    it('Should fail if request body is missing message', async () => {
      await postNote({ name: 'this is the wrong body' }, 400)
      await postNote({ content: 'content1' }, 400)
      await postNote({}, 400)
    })
  })
  
  async function postFizzbuzz (req, status = 200) {
    const { body } = await request(app)
    .post('/post')
    .send(req)
    .expect(status)
    return body
  }
})
  