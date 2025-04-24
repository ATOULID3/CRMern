const express = require('express');
const router = express.Router();
const { getClients, addClient } = require('../Controllers/clientController');
const auth = require('../middleware/authMiddleware');
router.get('/', auth, getClients);
router.post('/', auth, addClient);
module.exports = router;