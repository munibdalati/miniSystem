const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    countryOfResidence: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    buildingNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "enter a valid email address",
      ],
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    educationalLevel: {
      type: String,
      required: true,
    },
    fieldOfStudying: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

applicationSchema.statics.addApplication = async function (
  title,
  firstName,
  lastName,
  gender,
  age,
  countryOfResidence,
  city,
  street,
  buildingNumber,
  email,
  mobileNumber,
  educationalLevel,
  fieldOfStudying,
  yearsOfExperience,
  cv,
  notes
) {
  const application = await this.create({
    title,
    firstName,
    lastName,
    gender,
    age,
    countryOfResidence,
    city,
    street,
    buildingNumber,
    email,
    mobileNumber,
    educationalLevel,
    fieldOfStudying,
    yearsOfExperience,
    cv,
    notes,
  });

  return application;
};

const Application = mongoose.model("Applications", applicationSchema);

module.exports = Application;
