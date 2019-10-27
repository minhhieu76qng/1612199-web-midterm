const express = require('express');
const app = express();
const api = require('./apis');

// config
require('./configs/config')(app);
require('./configs/mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.end('home')
})
app.use('/api', api);

// handle 404
app.use((req, res, next) => {
  const error = { status: 404, message: 'Not found!' };
  next(error);
})

// handle error
app.use((err, req, res, next) => {
  if (err) {
    const { status, error, data } = err;
    const statusCode = status || 500;
    return res.status(status).json({
      status: statusCode,
      error,
      data
    })
  }
})

module.exports = app;