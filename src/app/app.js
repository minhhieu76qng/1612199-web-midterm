const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");

// config
app.use(cors());
require("./configs/config")(app);
require("./configs/mongoose");
require("./configs/passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const api = require("./apis");
app.get("/", (req, res, next) => {
  res.end("home");
});
app.use("/api", api);

// handle 404
app.use((req, res, next) => {
  return res.status(404).json({
    errors: [
      {
        code: "NOT_FOUND",
        message: "Api not found!"
      }
    ]
  });
});

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
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

module.exports = app;
