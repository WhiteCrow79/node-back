'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./board.ctrl');

router.get('/list', ctrl.output.list);

module.exports = router;
