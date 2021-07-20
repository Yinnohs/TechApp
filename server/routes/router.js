const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const principal = require('../controller/principal.controller.js');

router.get('/',principal.verifyToken, principal.find);
router.get('/new/nueva', principal.verifyToken ,principal.findNew)
router.get('/tecnico/:id', principal.findOne)
router.get('/nombre', principal.techNames)
router.post('/save/new',principal.verifyToken, principal.saveNew);
router.post('/save/:id',principal.verifyToken, principal.update);
router.delete('/remove/:id',principal.verifyToken, principal.remove);

router.post('/singin', principal.singIn);
// router.post('/logout', principal.logOut);

module.exports = router;

