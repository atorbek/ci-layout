import express from 'express';
const router = express.Router();

import settings from '../../controllers/settingsController';

router.get('/settings', settings.getSettings);
router.post('/settings', settings.postSettings);
router.delete('/settings', settings.deleteSettings);

export default router;
