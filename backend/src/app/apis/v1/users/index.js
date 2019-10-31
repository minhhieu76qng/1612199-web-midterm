const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const {
  createNewUser,
  getUserById,
  updateInfoUserById,
  changePassword,
  updateAvatarLocation
} = require("@services/user/user.service");
const auth = require("@middlewares/auth");
const { IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME } = process.env;

// MULTER
const s3Bucket = new Aws.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
  region: "ap-southeast-1"
});
var upload = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: `${BUCKET_NAME}`,
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const name = file.originalname;
      const ext = name.substring(name.lastIndexOf("."), name.length);
      cb(null, `${Date.now().toString()}${ext}`);
    }
  })
});

const multerUploader = upload.single("image");

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

// upload photo
router.patch("/:id/avatar", auth, (req, res, next) => {
  const id = req.params.id;
  multerUploader(req, res, async err => {
    if (err) {
      return res.status(500).json({
        status: 500,
        errors: [
          {
            code: "INTERNAL_ERROR",
            message: "Cant up load now!"
          }
        ]
      });
    }

    try {
      // save to db
      const location = req.file.location;
      const result = await updateAvatarLocation({ id, location }, next);

      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });
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
          email: user.email,
          address: user.address,
          name: user.name,
          sex: user.sex
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
