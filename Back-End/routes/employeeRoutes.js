const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// ----------------- get all Employee route -----------------
router.get('/getAllEmployees', employeeController.getAllEmployees);
// ----------------- get Employee by id route -----------------
router.get('/getEmployee/:id', employeeController.getEmployee);

// ----------------- create Employee route -----------------
router.post('/createEmployee', employeeController.createEmployee);

// ----------------- login Employee route -----------------
router.post('/loginEmployee', employeeController.loginEmployee);
// ----------------- delete Employee route -----------------
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);
// ----------------- delete Employee route -----------------
router.get('/search/:key', employeeController.searchEmployee);



module.exports = router;
