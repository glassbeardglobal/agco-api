const express = require('express');
const userModel = require('../models/user.js');

const router = express.Router();

// index
router.post('/', (req, res, next) => {
  userModel.login(req.body, (err, result) => {
    if (err) return next(err);
    if (result) {
      res.json(result);
    } else {
      res.status(401);
      res.json({ success: false });
    }
  });
});

module.exports = router;
