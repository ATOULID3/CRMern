const express = require('express');
const router = express.Router();
const { getVisits, addVisit } = require('../controllers/visitController');
const auth = require('../middleware/authMiddleware');
router.get('/', auth, getVisits);
router.post('/', auth, addVisit);
module.exports = router;