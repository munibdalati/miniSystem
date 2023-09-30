const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// ----------------- create admin -----------------
exports.createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await Admin.addAdmin(username, email, password);

    // create token
    const token = createToken(admin._id);

    res.status(200).json({ status: "success", admin, token });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// ----------------- login admin -----------------
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
     const admin = await Admin.signInAdmin(email, password);

     // create token
     const token = createToken(admin._id);

     res.status(200).json({ username: admin.username, email, token });
  } catch (error) {
     res.status(400).json({ error: error.message });
  }
};


