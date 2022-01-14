const express = require('express');
const router = express.Router();
const controller = require('../controllers/fizzbuzzController')

// GET /fizzbuzz - to list all fizzbuzz objects.  get -> fizzbuzzcontroller getAll query -> response
router.get('/', controller.getAll, (req, res) => {
  //respond with a json'd array of fizzbuzzes and 200 status to signify that the request was successful
  res.status(200);
  return res.json(res.locals.fizzbuzzes);
})

// GET /fizzbuzz/123 - to retrieve a single fizz buzz object.  get -> fizzbuzzcontroller getOne query -> response
router.get('/:id', controller.getOne, (req, res) => {
  //respond with the json'd fizzbuzz and 200 status to signify that the request was successful
  res.status(200);
  return res.json(res.locals.fizzbuzz);
})

// POST /fizzbuzz - to create a new fizzbuzz object post -> fizzbuzzcontroller addOne query -> response
router.post('/post', controller.addOne, (req, res) => {
  // respond with success status 204
  return res.status(204);
})

module.exports = router;