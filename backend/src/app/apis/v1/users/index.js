const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  createNewUser,
  getUserById,
  updateInfoUserById,
  changePassword
} = require("@services/user/user.service");

const auth = require("@middlewares/auth");

const router = express.Router();

// get info of user
router.get("/:id", auth, async (req, res, next) => {
  // get by id
  const id = req.params.id;
  try {
    const result = await getUserById(id);

    return res.status(result.status).json(result);
  } catch (err) {
    return next(err);
  }
});

// create new user
router.post("/", async (req, res, next) => {
  const { email, name, sex, password, retype } = req.body;

  try {
    const result = await createNewUser(
      { email, password, name, sex, retype },
      next
    );

    return res.status(result.status).json(result);
  } catch (err) {
    return next(err);
  }
});

// update thong tin ca nhan
router.patch("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  const { name, sex, address } = req.body;

  try {
    const result = await updateInfoUserById({ id, name, sex, address }, next);

    return res.status(result.status).json(result);
  } catch (err) {
    return next(err);
  }
});

// thay doi password
router.patch("/:id/password", auth, async (req, res, next) => {
  const id = req.params.id;

  const { currentPw, newPassword, retype } = req.body;

  try {
    const result = await changePassword(
      { id, currentPw, newPassword, retype },
      next
    );

    return res.status(result.status).json(result);
  } catch (err) {
    return next(err);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        errors: [
          {
            code: "ERROR",
            message: "Error! An error occurred. Please try again later!"
          }
        ]
      });
    }

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            code: "INCORRECT",
            message: info.message
          }
        ]
      });
    }

    req.login(user, { session: false }, error => {
      if (error) {
        return res.status(400).json(error);
      }

      const { JWT_SECRET_KEY } = process.env;
      // generate token
      const token = jwt.sign(
        { id: user._id, email: user._id },
        JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        status: 200,
        success: {
          message: "Loged in successfully!"
        },
        user: {
          id: user._id,
          email: user.email
        },
        token
      });
    });
  })(req, res, next);
});

router.post(
  "/login-fb",
  passport.authenticate("facebook", {
    scope: ["email", "user_gender", "user_hometown"]
  })
);
router.post("/login-fb-callback", (req, res, next) => {
  passport.authenticate("facebook", { session: false }, (err, user, info) => {
    if (err) {
      res.sendStatus(400);
      return next(err);
    }

    console.log(user);
    return res.status(200).json(user);
  });
});

module.exports = router;
