const express = require('express');
const userModel = require('../models/user.js');
const transactionModel = require('../models/transaction.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  transactionModel.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  transactionModel.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  transactionModel.new(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// update
router.put('/:id', (req, res, next) => {
  transactionModel.update(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  transactionModel.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
