const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require("@models/user.model");
const { comparePassword } = require("@services/user/user.service");
const { JWT_SECRET_KEY } = process.env;

const LS = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try {
      const existUser = await User.findOne({ email });

      if (!existUser) {
        return done(null, false, { message: "Incorrect email!" });
      }

      // compare password
      const hashPw = existUser.password;
      const isSame = await comparePassword(password, hashPw);

      if (!isSame) {
        return done(null, false, { message: "Incorrect password!" });
      }

      return done(null, existUser, { message: "Loged in successfully!" });
    } catch (err) {
      return done(err);
    }
  }
);

const JWT = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(LS);
passport.use(JWT);
