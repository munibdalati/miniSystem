const Vacancy = require("../models/vacancyModel");
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};


// --------------------get all vacancies --------------------
exports.getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json({
      status: "success",
      results: vacancies.length,
      data: {
        vacancies,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};


// ----------------- create vacancy -----------------
exports.createVacancy = async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    const vacancy = await Vacancy.addVacancy(title, description, deadline);

    // create token
    const token = createToken(vacancy._id);

    res.status(200).json({ status: "success", vacancy, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// ----------------- get vacancy -----------------
exports.getVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        vacancy,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// --------------------delete vacancy --------------------
exports.deleteVacancy = async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Vacancy deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};


// --------------------update vacancy --------------------
exports.updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        vacancy,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};