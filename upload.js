const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const dotenv = require("dotenv");
dotenv.config();
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const S3_BUCKET = "avatar3d/";

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (folder, buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: S3_BUCKET + folder,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  console.log(name, type);
  return s3.upload(params).promise();
};
module.exports = uploadFile;
