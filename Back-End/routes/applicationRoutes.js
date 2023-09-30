const express = require('express');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

// ----------------- get all applications route -----------------
router.get('/allApplications', applicationController.getAllApplication);
// ----------------- add application route -----------------
router.post('/addApplication',applicationController.createApplication);
// ----------------- delete to do route -----------------
router.delete('/deleteApplication/:id', applicationController.deleteApplication);



module.exports = router;
