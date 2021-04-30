'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.home);
router.get('/login', ctrl.login);

//외부에서 사용
module.exports = router;