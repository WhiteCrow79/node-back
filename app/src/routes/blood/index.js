'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./blood.ctrl');

//output
router.get('/write', ctrl.output.write);

//process
router.post('/write', ctrl.process.write);

module.exports = router;
