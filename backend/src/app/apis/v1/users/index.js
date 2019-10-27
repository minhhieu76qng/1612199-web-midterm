const express = require('express');
const { createNewUser, isValidEmail } = require('@services/user/user.service');

const router = express.Router();

// get info of user
router.get('/', (req, res, next) => {

})

// create new user
router.post('/', async (req, res, next) => {
  const { email, name, sex, password, retype } = req.body;

  if (!(email && name && sex && password && retype)) {
    return res.status(400).json({
      status: 400,
      code: 'MISSING_FIELDS',
      error: {
        message: 'Some fields are missing!'
      }
    })
  }

  // validation email
  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: 400,
      code: 'EMAIL_ERROR',
      error: {
        message: 'Email is not valid!'
      },
      data: {
        email
      }
    })
  }

  // password not match
  if (retype !== password) {
    return res.status(400).json({
      status: 400,
      code: 'PASSWORD_ERROR',
      error: {
        message: 'Password is not match!'
      },
      data: {
        password,
        retype
      }
    })
  }

  try {
    const result = await createNewUser({ email, password, name, sex }, next);
    result.status = 201;

    return res.status(201).json(result);
  }
  catch (err) {
    return next(err);
  }
})

module.exports = router;