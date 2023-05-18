"use strict";

const express = require('express');

const routeTvl = require('./tvl.js');

const router = express.Router();
router.use('/tvl', routeTvl);

// GET home page.
router.get('/', function (req, res, next) {
    res.status(404).json({ ok: false, error: 'You do not have permission to access to this part of API' });
});

module.exports = router;