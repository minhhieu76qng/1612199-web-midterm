const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        status: 401,
        errors: [
          {
            code: "NOT_AUTHENTICATE",
            message: "No token or token has expired."
          }
        ]
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
