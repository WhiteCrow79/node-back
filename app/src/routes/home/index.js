'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

//외부에서 사용
module.exports = router;
