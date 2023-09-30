const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();



// ----------------- create admin route -----------------
router.post('/createAdmin', adminController.createAdmin);

// ----------------- login route -----------------
router.post('/loginAdmin', adminController.loginAdmin);




module.exports = router;
