const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const healthController = require('../controllers/healthController');

// Health check
router.get('/healthz', healthController.healthCheck);

// Link routes
router.post('/api/links', linkController.createLink);
router.get('/api/links', linkController.getAllLinks);
router.get('/api/links/:code', linkController.getLinkStats);
router.delete('/api/links/:code', linkController.deleteLink);

module.exports = router;