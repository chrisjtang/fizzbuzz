const express = require('express');
const app = express();
const PORT = 3000;
const apiRouter = require('./routes/apiRouter');

app.use(express.json());


app.use('/api', apiRouter);

// Local error handler
app.use((req, res) => res.status(404).send('404: PAGE DOES NOT EXIST'));

// Global error handler
app.use((err, req, res, next) => res.status(500).json(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})