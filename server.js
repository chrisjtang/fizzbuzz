/*
************************************************************************
Server Documentation: 
Standard express server setup.  We use an /api endpoint and apiRouter to route requests meant for the fizzbuzz api.
This keeps our server.js file clean and also allows for our app to have a clean implementation of authentication (i.e. for o-auth, jwts, etc)
************************************************************************
*/

const express = require('express');
const app = express();
const PORT = 3000;
const apiRouter = require('./routes/apiRouter');

app.use(express.json());

// We will route all of the incoming requests that are meant for the fizzbuzz api to the /api endpoint, which will then be taken care of by our apiRouter
app.use('/api', apiRouter);

// Local error handler
app.use((req, res) => res.status(404).send('404: PAGE DOES NOT EXIST'));

// Global error handler
app.use((err, req, res, next) => res.status(500).json(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = app;