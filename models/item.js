const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('./mongoUtil');
const userModel = require('./user');

const collectionName = 'item';

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
    name: data.name,
    userId: ObjectId(data.userId),
    image: data.image,
    manufacturer: data.manufacturer,
    compatibility: data.compatibility,
    description: data.description,
    condition: data.condition,
    year: data.year,
    price: data.price,
    category: data.category,
    forSale: data.forSale,
  }, (err, result) => {
    if (err) callback(err);
    // Add item to user as well
    userModel.addItem(result.insertedId, data, (err) => {
      callback(err, result);
    });
  });
};

exports.update = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    name: data.name,
    userId: ObejctId(data.userId),
    image: data.image,
    manufacturer: data.manufacturer,
    compatibility: data.compatibility,
    description: data.description,
    condition: data.condition,
    year: data.year,
    name: data.name,
    category: data.category,
    forSale: data.forSale,
    price: data.price,
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
    if (err) callback(err);
    // Remove item from user
    userModel.removeItem(id, data, (err2) => {
      callback(err2);
    });
  });
};

exports.toggleSelling = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    $set: { forSale: data.forSale },
  }, (err) => {
    callback(err);
  });
};

exports.transact = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    $set: {
      forSale: false,
      userId: ObjectId(data.buyerId),
    },
  }, (err) => {
    callback(err);
  });
};
