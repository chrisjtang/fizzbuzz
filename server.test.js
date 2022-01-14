const { expect, before } = require('chai');
const request = require('supertest');
const { Pool } = require('pg');
const db = require('./models/fizzbuzzModel');

describe('Fizzbuzz testing', () => {
  let app;
  
  before('Mock database connection and load the app'), async function () {
    const myURI = 'postgres://ytspobex:EAstDPgfnWMAtJRZSPd3cEFHv4e1ZAGx@kashin.db.elephantsql.com/ytspobex';
    const pool = new Pool({
      connectionString: URI
    })
  }
})