const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('./mongoUtil.js');

const collectionName = 'community';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (data, callback) => {
  mongoUtil.getDb().collection(collectionName).insertOne({

  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {

  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
    callback(err);
  });
};