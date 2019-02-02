const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('./mongoUtil');
const userModel = require('./user');

const collectionName = 'transaction';

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
  const date = new Date().getTime();
  mongoUtil.getDb().collection(collectionName).insertOne({
    time: data,
    item: data.itemId,
    buyer: data.buyerId,
    seller: data.sellerId,
  }, (err, result) => {
    if (err) callback(err);
    userModel.addItem(itemId, { userId: buyerId, transactionId: result.insertedId }, (err) => {
      callback(err);
      userModel.removeItem(itemId, { userId: sellerId, transactionId: result.insertedId }, (err) => {
        callback(err, result);
      });
    });
  });
};

exports.update = (id, data, callback) => {
  // mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
  // }, (err) => {
  //   callback(err);
  // });
};

exports.delete = (id, data, callback) => {
  // mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {

  // });
};
