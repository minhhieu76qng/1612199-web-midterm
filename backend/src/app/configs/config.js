const morgan = require("morgan");

module.exports = function(app) {
  app.use(
    morgan(
      ":method :url :status :response-time ms - :res[content-length] :date[]"
    )
  );
};
