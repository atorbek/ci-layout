const express = require('express');
const router = express.Router();

const settings = require('../../controllers/settingsController');

router.get('/settings', settings.getSettings);
router.post('/settings', settings.postSettings);
router.delete('/settings', settings.deleteSettings);

module.exports = router;
