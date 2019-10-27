const express = require('express');
const app = express();

// config
require('./configs/config')(app);
require('./configs/mongoose');
require('./configs/passport');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const api = require('./apis');
app.get('/', (req, res, next) => {
  res.end('home')
})
app.use('/api', api);

// handle 404
app.use((req, res, next) => {
  return res.status(404).json({
    errors: [{
      code: 'NOT_FOUND',
      message: 'Api not found!'
    }]
  })
})

// handle error
app.use((err, req, res, next) => {
  let statusCode = 500;
  if (err && err.status) {
    statusCode = err.status || 500;
  }
  return res.status(statusCode).json({
    url: req.originalUrl,
    status: statusCode,
    errors: err
  })
})

module.exports = app;