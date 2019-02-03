const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('./mongoUtil');
const userModel = require('./user');
const itemModel = require('./item');

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
    time: date,
    item: data.itemId,
    buyer: data.buyerId,
    seller: data.sellerId,
    price: data.price,
  }, (err, result) => {
    if (err) callback(err);
    userModel.addItem(data.itemId, { userId: data.buyerId, transactionId: result.insertedId }, (err2) => {
      if (err2) callback(err2);
      userModel.removeItem(data.itemId, { userId: data.sellerId, transactionId: result.insertedId }, (err3) => {
        if (err3) callback(err3);
        itemModel.transact(data.itemId, { buyerId: data.buyerId }, (err4) => {
          callback(err4, result);
        });
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
