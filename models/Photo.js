const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const mimeMap = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const uploadS3 = (buffer, id, mimetype) => {
  if (!(mimetype in mimeMap)) {
    return Promise.reject(`Unrecognized MIME type: ${mimetype}`);
  }

  const s3 = new AWS.S3();
  const Key = `${id}.${mimeMap[mimetype]}`;
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: process.env.AWS_BUCKET,
      Key,
      Body: buffer,
      ContentType: mimetype,
    }, (err, data) => {
      if (err) return reject(err);
      resolve(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${Key}`);
    });
  });
}

module.exports = {
  uploadS3,
}
