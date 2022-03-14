'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./blood.ctrl');

router.get('/write', ctrl.output.write);

module.exports = router;