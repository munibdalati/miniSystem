const Application = require("../models/applicationModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// --------------------get all application --------------------
exports.getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      status: "success",
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
// ----------------- create application -----------------
exports.createApplication = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const application = await Application.addApplication(
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
    );

    // create token
    const token = createToken(application._id);

    res.status(200).json({ status: "success", application, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// --------------------delete application --------------------
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};