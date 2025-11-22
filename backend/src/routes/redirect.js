const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// Redirect route - must be registered last
router.get('/:code', linkController.handleRedirect);

module.exports = router;