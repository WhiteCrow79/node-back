'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./board.ctrl');

router.get('/list', ctrl.output.list);
router.get('/write', ctrl.output.write);
router.get('/detail/:bbrdseq', ctrl.output.detail);

router.post('/write', ctrl.process.write);
router.post('/modify', ctrl.process.modify);

module.exports = router;
