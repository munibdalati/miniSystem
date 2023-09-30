const express = require('express');
const vacancyController = require('../controllers/vacancyController');

const router = express.Router();

// ----------------- get all jobs route -----------------
router.get('/allVacancies', vacancyController.getAllVacancies);

// ----------------- add vacancy route -----------------
router.post('/addVacancy', vacancyController.createVacancy);
// ----------------- delete vacancy route -----------------
router.delete('/deleteVacancy/:id', vacancyController.deleteVacancy);
// ----------------- delete vacancy route -----------------
router.put('/updateVacancy/:id', vacancyController.updateVacancy);



module.exports = router;
