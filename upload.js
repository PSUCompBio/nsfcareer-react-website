const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const dotenv = require("dotenv");
dotenv.config();
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// AWS Configuration
var config = require("./config/configuration_keys");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (folder, buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: config.awsBucket + '/' + folder,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  console.log(name, type);
  return s3.upload(params).promise();
};
module.exports = uploadFile;
