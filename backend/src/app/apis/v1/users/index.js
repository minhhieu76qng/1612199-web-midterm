const express = require('express');
const { createNewUser, getUserById, updateInfoUserById, changePassword } = require('@services/user/user.service');

const router = express.Router();

// get info of user
router.get('/:id', async (req, res, next) => {
  // get by id
  const id = req.params.id;
  try {
    const result = await getUserById(id);

    return res.status(result.status).json(result);
  }
  catch (err) {
    return next(err);
  }
})

// create new user
router.post('/', async (req, res, next) => {
  const { email, name, sex, password, retype } = req.body;

  try {
    const result = await createNewUser({ email, password, name, sex, retype }, next);

    return res.status(result.status).json(result);
  }
  catch (err) {
    return next(err);
  }
})

// update thong tin ca nhan
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const { name, sex, address } = req.body;

  try {
    const result = await updateInfoUserById({ id, name, sex, address }, next);

    return res.status(result.status).json(result);
  }
  catch (err) {
    return next(err);
  }
})

router.patch('/:id/password', async (req, res, next) => {
  const id = req.params.id;

  const { currentPw, newPassword, retype } = req.body;

  try {
    const result = await changePassword({ id, currentPw, newPassword, retype }, next);

    return res.status(result.status).json(result);
  }
  catch (err) {
    return next(err);
  }
})
module.exports = router;