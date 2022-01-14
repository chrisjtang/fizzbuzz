/*
************************************************************************
Testing Documentation: 
- First, we mock the database connection to make sure that's working.  Then we load the server.  

- Before each test, we create temporary tables that mimic our actual data set.  We also create a fake fizzbuzz to populate the table for further testing.

- We have tests for each endpoint that our Express server takes care of.
************************************************************************
*/
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

    db.query = (test) => {
      return pool.query(test);
    }

    server = require('./server')
  })

  beforeEach('Create temporary tables', async () => {
    await db.query('CREATE TEMPORARY TABLE fizzbuzz (LIKE fizzbuzz INCLUDING ALL)')
  })

  beforeEach('Create a fake fizzbuzz', async () => {
    await db.query(`INSERT INTO pg_temp.fizzbuzz("fizzbuzzid", "useragent", "creationdate", "message") VALUES(1, 'test useragent', 'test date', 'test message')`)
  })

  afterEach('Drop the temporary tables', async () => {
    await db.query('DROP TABLE IF EXISTS pg_temp.fizzbuzz')
  })

  describe('Get requests to /api', () => {
    it('should respond with json containing a list of all users', (done) => {
        request(server)
          .get('/api/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
  });

  describe('Get requests to /api/:id', () => {
    it('should respond with json containing a single user', (done) => {
      request(server)
        .get('/api/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Post requests to /api/post', () => {
    let data = {
      "message": "test"
    }
    it('should respond with 204 status', (done) => {
      request(server)
        .post('/api/post')
        .send(data)
        .set('Accept', 'application/json')
        .expect(204)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    let badData = {
      "not message": "test"
    }

    it('should fail if request body is missing the message property', (done) => {
      request(server)
        .post('/api/post')
        .send(badData)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
  })
});