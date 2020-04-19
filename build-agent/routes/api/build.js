const express = require('express');
const router = express.Router();

const build = require('../../controllers/buildController');

router.post('/build', build.postBuild);

module.exports = router;
