const bcrypt = require('bcrypt');
const { User } = require('@models/user.model');

const SALT = 10;

const createNewUser = async ({ email, password, name, sex }, next) => {
  // kiểm tra email có tồn tại hay chưa
  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      const error = {
        status: 400,
        code: 'EMAIL_EXIST',
        error: {
          message: 'Email is already exist!',
        },
        data: {
          email
        }
      }

      return next(error);
    }

    // hash password
    const hash = await hashPassword(password);
    const newUser = new User({ email, password: hash, name, sex });

    const result = await newUser.save();

    if (result) {
      // save thanh cong
      return {
        code: 'SAVE_SUCCESS',
        success: {
          message: 'Created new user successfully!'
        },
        data: {
          id: result._id,
          name: result.name,
          email: result.email,
          sex: result.sex,
        }
      }
    }
  }
  catch (err) {
    return next(err);
  }
}

const hashPassword = (password) => {
  return bcrypt.hash(password, SALT);
}

const isValidEmail = (email) => {
  const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
  return pattern.test(email);
}
module.exports = {
  hashPassword,
  createNewUser,
  isValidEmail
}