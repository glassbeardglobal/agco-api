const express = require('express');
const userModel = require('../models/user.js');

const router = express.Router();

// index
router.post('/', (req, res, next) => {
  userModel.login(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

module.exports = router;
