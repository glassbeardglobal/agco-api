const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('./mongoUtil.js');

const collectionName = 'user';

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
    username: data.username,
    password: data.password,
    items: [],
    transactions: [],
    image: data.image,
    name: data.name,
    contact: data.contact,
    address: data.address,
    telephone: data.telephone,
  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    username: data.username,
    password: data.password,
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
    callback(err);
  });
};

exports.login = (data, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ username: data.username, password: data.password }, (err, result) => {
    callback(err, result);
  });
};

exports.addItem = (itemId, data, callback) => {
  let query = {
    $push: {
      items: ObjectId(itemId),
    },
  };
  if (data.transactionId) {
    query['$push'].transactions = data.transactionId;
  }

  console.log(query);
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(data.userId) }, query, (err) => {
    callback(err);
  });
}

exports.removeItem = (itemId, data, callback) => {
  let query = {
    $pull: {
      items: ObjectId(itemId),
    },
  };
  if (data.transactionId) {
    query['$push'] = { transactions: data.transactionId };
  }

  console.log(query);
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(data.userId) }, query, (err) => {
    callback(err);
  });
}
