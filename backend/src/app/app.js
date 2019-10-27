const express = require('express');
const app = express();
const api = require('./apis');

app.use('/api', api);

module.exports = app;