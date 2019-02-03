const express = require('express');
const multer  = require('multer');
const uuidv1 = require('uuid/v1');

const upload = multer();

const { resizePhoto } = require('../controllers/Photo');
const { uploadS3 } = require('../models/Photo');
const itemModel = require('../models/item.js');
const userModel = require('../models/user.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  itemModel.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  itemModel.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', upload.single('image'), (req, res, next) => {
  const { buffer } = req.file;
  console.log(req.file);
  const id = uuidv1();
  const metadata = {};
  resizePhoto(buffer, 1000)
    .then(({ data, info }) => {
      metadata.width = info.width;
      metadata.height = info.height;
      return uploadS3(data, id, req.file.mimetype);
    })
    .then(link => {
      metadata.url = link;
      const payload = Object.assign({}, req.body, { image: metadata });
      return itemModel.new(payload, (err, result) => {
        if (err) return next(err);
        res.json({ id: result.insertedId });
      })
    })
    .catch(err => next(err));
});

// update
router.put('/:id', (req, res, next) => {
  itemModel.update(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  itemModel.delete(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});



module.exports = router;
