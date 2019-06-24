var AWS = require('aws-sdk');
var env = require('./s3.env.js');
AWS.config.loadFromPath("./config/AWSConfig.json");

var s3Client = new AWS.S3();

var uploadParams = {
         Bucket: env.Bucket, 
         Key: '', // pass key
         Body: null, // pass file body
};

var s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;