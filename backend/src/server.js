const http = require('http');
const app = require('./app/app');
require('dotenv').config();

const server = http.createServer(app);

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

server.listen(PORT, HOST, function () {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});