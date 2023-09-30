const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// --------------------get all employee --------------------
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: {
        employees,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
// -------------------- employee by id --------------------
exports.getEmployee = async (req, res) => {

  try {
    const employeeId = req.params.id; // Extract the id parameter from the URL
    if (!employeeId) {
      return res
        .status(400)
        .json({ error: "Employee ID is missing in the request" });
    }
    console.log(employeeId)
    const employee = await Employee.findOne({ _id:employeeId });
    console.log(employee)
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "Employee not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// ----------------- create employee -----------------
exports.createEmployee = async (req, res) => {
  const {
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
    department,} = req.body;

  try {
    const employee = await Employee.addEmployee(
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
      department,);

    // create token
    const token = createToken(employee._id);

    res.status(200).json({ status: "success", employee, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// ----------------- login employee -----------------
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
     const employee = await Employee.loginEmployee(email, password);

     // create token
     const token = createToken(employee._id);

     res.status(200).json({ employee: employee.username, email, token });
  } catch (error) {
     res.status(400).json({ error: error.message });
  }
};

// --------------------delete employee --------------------
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.searchEmployee = async (req, res) => {
  try {
    const result = await Employee.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to search for products" });
  }
}
