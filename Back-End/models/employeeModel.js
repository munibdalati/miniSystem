const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    birthday: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    nationalID: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    matiralStatus: {
      type: String,
      required: true,
    },
    personalPhoto: {
      type: Buffer,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ----------------- create employee -----------------
employeeSchema.statics.addEmployee = async function (
  firstName,
  lastName,
  email,
  password,
  birthday,
  mobileNumber,
  nationalID,
  nationality,
  matiralStatus,
  personalPhoto,
  startDate,
  department
) {
  //validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !birthday ||
    !mobileNumber ||
    !nationalID ||
    !nationality ||
    !matiralStatus ||
    !personalPhoto ||
    !startDate ||
    !department
  ) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong enough");
  }
  if (!validator.isDate(birthday)) {
    throw Error("Enter a valid date");
  }
  if (!validator.isDate(startDate)) {
    throw Error("Enter a valid date");
  }
  if (!validator.isMobilePhone(mobileNumber)) {
    throw Error("Enter a mobile phone number");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email Already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const employee = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    birthday,
    mobileNumber,
    nationalID,
    nationality,
    matiralStatus,
    personalPhoto,
    startDate,
    department,
  });

  return employee;
};

// ----------------- login employee -----------------
employeeSchema.statics.loginEmployee = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const employee = await this.findOne({ email });

  if (!employee) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, employee.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return employee;
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
