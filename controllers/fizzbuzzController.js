/*
************************************************************************
FizzBuzz Controller Documentation: 
I kept all of the database queries in this controller file in order to keep the code cleaner and more modularized.
Also, I used async/await syntax to help increase code readability (even though the code is executed asynchronously, it still can be understood line by line).
************************************************************************
*/

const db = require('../models/fizzbuzzModel');
const fizzbuzzController = {};

fizzbuzzController.getAll = async (req, res, next) => {
  try {
    const query = `SELECT * FROM "fizzbuzz"`;
    const queryResult = await db.query(query);
    //expecting queryResult.rows to be an array of objects from the DB
    //assign the array to the fizzbuzzes property of res.locals object so it gets passed to the next middleware
    res.locals.fizzbuzzes = queryResult.rows;
    return next();
  } catch {
    return res.status(400).send(`error in the fizzbuzzController.getAll async await statement`);
  }
}

fizzbuzzController.getOne = async (req, res, next) => {
  try {
    //expect req.params.id to be the requested fizzbuzz
    const targetFizzbuzz = await req.params.id;
    const query = `SELECT * FROM "fizzbuzz" WHERE fizzbuzzid='${targetFizzbuzz}';`
    const queryResult = await db.query(query);
    //if the resulting array has a length > 0, then we have found a fizzbuzz.  
    if (queryResult.rows.length > 0) {
      // pass the fizzbuzz to the next middleware
      res.locals.fizzbuzz = queryResult.rows[0];
      return next();
    } else {
      return res.send(`No fizzbuzz with this id number.  Try again`);
    }
  } catch {
    return res.status(400).send(`error in the fizzbuzzController.getOne async await statement`);
  }
}

fizzbuzzController.addOne = async (req, res, next) => {
  try {
    // expect req.body to have the format { "message": "str" }
    if (await req.body.message) {
      const message = await req.body.message;
      // can grab the useragent from req.headers['user-agent'];
      const userAgent = req.headers['user-agent'];
      const query = `INSERT INTO "fizzbuzz"("useragent", "message") VALUES('${userAgent}', '${message}') RETURNING "fizzbuzzid", "useragent", "creationdate", "message"`;
      const queryResult = await db.query(query);
      return next();
    } else {
      //if the body doesn't have a message property, then return an error message
      return res.status(400).send('body needs to have message property');
    }
  } catch {
    return res.status(400).send(`error in the fizzbuzzController.addOne async await statement`);
  }
}

module.exports = fizzbuzzController;