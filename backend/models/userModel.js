const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (email, name, password) {
  if (!email || !name || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ email, name, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

const model = mongoose.model("User", UserSchema);

module.exports = model;
