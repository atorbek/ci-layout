import express from 'express';
const router = express.Router();

import settings from '../../controllers/settingsController';

export type GetResponseSettings = Configuration;
router.get<{}, GetResponseSettings>('/settings', settings.getSettings);
export type GetRequestSettings = Configuration;
export type PostStatusTextResponse = { statusText: string };
router.post<{}, PostStatusTextResponse, GetRequestSettings>(
  '/settings',
  settings.postSettings
);

export default router;
