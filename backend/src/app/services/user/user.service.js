const bcrypt = require("bcrypt");
const { User } = require("@models/user.model");

const SALT = 10;
const MIN_LENGTH_PW = 5;

const createNewUser = async ({ email, password, name, sex, retype }, next) => {
  if (
    !(email && name && sex !== null && typeof sex !== "undefined" && password)
  ) {
    let errors = [];

    if (!email)
      errors.push({
        code: "MISSING",
        message: "Email is missing!",
        field: "email"
      });
    if (!name)
      errors.push({
        code: "MISSING",
        message: "Name is missing!",
        field: "name"
      });
    if (sex === null || typeof sex === "undefined")
      errors.push({
        code: "MISSING",
        message: "Sex is missing!",
        field: "sex"
      });
    if (!password)
      errors.push({
        code: "MISSING",
        message: "Password is missing!",
        field: "password"
      });

    return {
      status: 400,
      errors
    };
  }

  // validation email
  if (!isValidEmail(email)) {
    return {
      status: 400,
      errors: [
        {
          code: "NOT_VALID",
          message: "Email is not valid!",
          field: "email",
          attribute: {
            email
          }
        }
      ]
    };
  }

  // password not match
  if (retype !== password) {
    return {
      status: 400,
      errors: [
        {
          code: "NOT_VALID",
          message: "Retype password is not match!",
          field: "retype",
          attribute: {
            password,
            retype
          }
        }
      ]
    };
  }

  // kiểm tra email có tồn tại hay chưa
  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return {
        status: 409,
        errors: [
          {
            code: "EXISTS",
            message: "Email is already exist!",
            field: "email",
            attributes: {
              email
            }
          }
        ]
      };
    }

    // hash password
    const hash = await hashPassword(password);
    const newUser = new User({ email, password: hash, name, sex });

    const result = await newUser.save();

    if (result) {
      // save thanh cong
      return {
        status: 200,
        success: {
          message: "Created new user successfully!"
        },
        attributes: {
          id: result._id,
          name: result.name,
          email: result.email,
          sex: result.sex
        }
      };
    }
  } catch (err) {
    return next(err);
  }
};

const hashPassword = password => {
  return bcrypt.hash(password, SALT);
};

const isValidEmail = email => {
  const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
  return pattern.test(email);
};

const getUserById = async id => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return {
      status: 404,
      errors: [
        {
          code: "NOT_FOUND",
          message: "User not found!",
          attributes: {
            id
          }
        }
      ]
    };
  }
  return {
    status: 200,
    attributes: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      address: user.address,
      sex: user.sex,
      created: user.createAt
    }
  };
};

const comparePassword = (newPassword, hashPw) => {
  return bcrypt.compare(newPassword, hashPw);
};

const updateInfoUserById = async ({ id, name, sex, address }, next) => {
  if (!(name && sex !== null && typeof sex !== "undefined" && address)) {
    let errors = [];

    if (!name)
      errors.push({
        code: "MISSING",
        message: "Name is missing!",
        field: "name"
      });
    if (sex === null || typeof sex === "undefined")
      errors.push({
        code: "MISSING",
        message: "Sex is missing!",
        field: "sex"
      });
    if (!address)
      errors.push({
        code: "MISSING",
        message: "Address is missing!",
        field: "address"
      });

    return {
      status: 400,
      errors
    };
  }

  try {
    // tim kiem user theo id
    const existUser = await User.findById(id);
    if (!existUser) {
      return {
        status: 404,
        errors: [
          {
            code: "NOT_FOUND",
            message: "User not found!",
            attributes: {
              id
            }
          }
        ]
      };
    }

    const result = await User.findOneAndUpdate(
      { _id: id },
      { name, sex, address },
      { new: true }
    );

    return {
      status: 200,
      success: {
        message: "Updated successfully!"
      },
      attributes: {
        id: result._id,
        email: result.email,
        name: result.name,
        address: result.address,
        sex: result.sex,
        avatar: result.avatar
      }
    };
  } catch (err) {
    return next(err);
  }
};

const changePassword = async ({ id, currentPw, newPassword, retype }, next) => {
  if (
    !(
      currentPw.length > MIN_LENGTH_PW &&
      newPassword.length > MIN_LENGTH_PW &&
      retype
    )
  ) {
    let errors = [];
    if (!(currentPw.length > MIN_LENGTH_PW)) {
      errors.push({
        code: "NOT_VALID",
        message: `Current password is at least ${MIN_LENGTH_PW} characters!`,
        field: "currentPw"
      });
    }

    if (!(newPassword.length > MIN_LENGTH_PW)) {
      errors.push({
        code: "NOT_VALID",
        message: `New password is at least ${MIN_LENGTH_PW} characters!`,
        field: "newPassword"
      });
    }

    return {
      status: 400,
      errors
    };
  }
  if (newPassword !== retype) {
    return {
      status: 400,
      errors: [
        {
          code: "NOT_MATCH",
          message: "Password is not match!",
          field: "retype"
        }
      ]
    };
  }

  try {
    const existUser = await User.findById(id);

    if (!existUser) {
      return {
        status: 404,
        errors: [
          {
            code: "NOT_FOUND",
            message: "User not found!",
            attributes: {
              id
            }
          }
        ]
      };
    }

    // kiểm tra password cũ có chính xác hay không
    // hash password -> findOneAndUpdate

    const oldPwHash = existUser.password;

    const isSame = await comparePassword(currentPw, oldPwHash);

    if (!isSame) {
      return {
        status: 400,
        errors: [
          {
            code: "NOT_MATCH",
            message: "Current password is incorrect!",
            attributes: {
              currentPw
            }
          }
        ]
      };
    }

    const hash = await hashPassword(newPassword);

    const result = await User.findOneAndUpdate(
      { _id: id },
      { password: hash },
      { new: true }
    );

    return {
      status: 200,
      success: {
        message: "Updated successfully!"
      },
      attributes: {
        id: result._id,
        email: result.email
      }
    };
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  hashPassword,
  createNewUser,
  isValidEmail,
  getUserById,
  updateInfoUserById,
  changePassword,
  comparePassword
};
