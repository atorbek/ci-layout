const express = require('express');
const router = express.Router();

const notify = require('../../controllers/notifyController');

router.post('/notify-agent', notify.postNotifyAgent);
router.post('/notify-build-result', notify.postNotifyBuildResult);
router.post('/register-notification', notify.postRegisterNotification);

module.exports = router;
