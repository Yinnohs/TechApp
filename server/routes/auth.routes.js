const express = require('express');
const router = express.Router();
const principal = require('../controller/principal.controller.js');

router.post('/singin', principal.singIn);
// router.post('/logout', principal.logOut);

module.exports = router;