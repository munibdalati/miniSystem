const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ----------------- create admin -----------------
adminSchema.statics.addAdmin = async function (username, email, password) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email Already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ username, email, password: hash });

  return admin;
};

// ----------------- login admin -----------------
adminSchema.statics.signInAdmin = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
