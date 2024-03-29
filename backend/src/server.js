require("module-alias/register");
const http = require("http");
require("dotenv").config();
const app = require("./app/app");
const ioFunc = require("./app/socketio");

const server = http.createServer(app);

ioFunc(server);

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  server.listen(PORT, function () {
    console.log(`Server is running at port ${PORT}`);
  });

} else {
  server.listen(PORT, HOST, function () {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });

}