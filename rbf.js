// ======================================
//         INITIALIZING DEPENDENCIES
// ======================================
const express = require('express');
app = express(),
    bodyParser = require("body-parser"),
    AWS = require('aws-sdk'),
    cookieParser = require('cookie-parser'),
    fs = require("fs"),
    path = require("path"),
    config_env = require("./config/configuration_keys");
multer = require('multer');

// ================================================
//            SERVER CONFIGURATION
// ================================================


// ======================================
//              GLOBAL VARIABLES
// ======================================

const successMessage = "success";
const failureMessage = "failure";
const apiPrefix = "/api/"

// ======================================
//       CONFIGURING AWS SDK & EXPESS
// ======================================
// Credential Configuration

var config = require("./config/configuration_keys");

//AWS.config.loadFromPath('./config/configuration_keys.json');
const BUCKET_NAME = config_env.usersbucket;

// AWS Credentials loaded
var myconfig = AWS.config.update({
    accessKeyId: config_env.awsAccessKeyId, secretAccessKey: config_env.awsSecretAccessKey, region: config_env.region
});
var storage = multer.memoryStorage()
var upload = multer({
    storage: storage
});

const awsWorker = require('./controllers/aws.controller.js');
var s3 = new AWS.S3();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Clearing the cookies

// ======================================
//              FUNCTIONS
// ======================================


function getFileSignedUrl(key, cb) {

    var params = {
        Bucket: BUCKET_NAME,
        Key: key
    };
    s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) {
            cb(err, "");
        } else {
            cb("", url);
        }
    });
}

function getUploadedModelFileList(user_name, cb) {
    const s3Params = {
        Bucket: BUCKET_NAME,
        Delimiter: '/',
        Prefix: user_name + '/profile/model/'
        // Key: req.query.key + ''
    };

    s3.listObjectsV2(s3Params, (err, data) => {
        if (err) {
            //   console.log(err);
            cb(err, "");
        }
        console.log(data);
        cb("", data.Contents);
    });

}




function getINFFile(user_id){
    return new Promise((resolve,reject)=>{
        // 1. Get Uploaded model list from user
        // 2. Generate SignedURL of the image
        // 3. Pass the signedURL to download the zip file
        // 4. Generate the INF File
        // 5. Store the INF File in /radio_basis_function/inf file
        getUploadedModelFileList(user_id,(err,list)=>{
            if(err){
                reject(err);
            }
            else{
                                    // Fetches the latest Model
                var latestModel = list.reduce(function (oldest, latest_model) {
                    return oldest.LastModified > latest_model.LastModified ? oldest : latest_model;
                }, {});

                // Getting the model key
                var model_key ;
                if (list.length != 0) {
                    model_key = latestModel.Key;
                }
                else {
                    model_key = user_id + "/profile/model/" + user_id;
                }
                // Generate SignedURL of the image
                getFileSignedUrl(model_key,(err, url)=> {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(url);
                    }
                })
            }
        })

    })
}


app.get(`/`, (req, res) => {
    res.send("TesT SERVICE HERE");
})


app.post(`${apiPrefix}generateINF`, function(req, res){
    console.log(req.body);
    generateINF(req.body.user_id).then((d)=>{
        res.send({
            message : "success",
            data : d
        })
    }).catch((err)=>{
        console.log(err);
        res.send({
            message : "failure",
            error : err
        })
    })
})


// Configuring port for APP
const port = 3000;
const server = app.listen(port, function () {
    console.log('Magic happens on ' + port);
});

