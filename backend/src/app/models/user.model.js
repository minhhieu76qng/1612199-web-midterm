const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    name: {
      type: String,
      required: true
    },
    sex: {
      type: Boolean
    },
    address: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
