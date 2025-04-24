const express = require('express');
const router = express.Router();
const { getProperties, addProperty } = require('../controllers/propertyController');
const auth = require('../middleware/authMiddleware');
router.get('/', auth, getProperties);
router.post('/', auth, addProperty);
module.exports = router;