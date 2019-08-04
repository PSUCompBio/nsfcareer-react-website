var stream = require('stream');
var AWS = require('aws-sdk');
var fs = require('fs');

const spawn = require("child_process").spawn;
var config = require('./../config/configuration_keys')
const exec = require('child_process').exec;
var request = require('request');

//AWS.config.loadFromPath('./config/configuration_keys.json');
var myconfig = AWS.config.update({
    accessKeyId: config.awsAccessKeyId, secretAccessKey: config.awsSecretAccessKey, region: config.region
});
var s3Client = new AWS.S3();

var uploadParams = {
    Bucket: config.usersbucket,
    Key: '', // pass key
    Body: null, // pass file body
};

var s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

const docClient = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true
});

function generateINPFile(cognito_user_id,cb){
    request.post({url:config.ComputeInstanceEndpoint + "generateINF", json: {user_id:cognito_user_id}}, function(err,httpResponse,body)
    { 
        if(err){
            console.log("ERROR in Generating INP File");
            cb(err,'');
        }
        else{
            console.log("Ressponse is ",httpResponse.body)
            cb('',httpResponse.body);
        }
     })
}



exports.doUpload = (req, res) => {
    console.log("FILE UPLOAD CALLED");

    const s3Client = s3.s3Client;
    const params = s3.uploadParams;
    var ts = new Date();
    var archiver = require('archiver');
    var archive = archiver("zip");
    var file_extension = req.file.originalname.split(".");
    file_extension = file_extension[ file_extension.length - 1 ] ;
    // var month = ts.getMonth() + 1;
    // var milliSeconds = ts.getMilliseconds() + 1;
    // var hours = ts.getHours();
    // var minutes = ts.getMinutes() + 1;
    // var seconds = ts.getSeconds() + 1;
    // var y = ts.getDate() +"-"+ month +"-"+ ts.getFullYear()+ "-" + hours + "-" + minutes + "-" + seconds + "-" + milliSeconds;

    // params.Key = req.file.originalname;
    var file_name = Date.now();
    params.Key = req.user_cognito_id + "/profile/image/" + file_name + "." + file_extension;
    console.log("NAME OF THE FILE ",params.Key);
    params.Body = req.file.buffer;
    if (req.body.file_error) {
        console.log(req.body.file_error);
        res.send({
            message: "failure",
            status: "Invalid File type"
        });
    }
    else {
        s3Client.upload(params, (err, data) => {
            if (err) {
                console.log("ERROR");
                res.status(500).send({ message: 'failure' });
            }
            console.log("FILE UPLODED", data);
            var signedURLObject = {
                Bucket: params.Bucket,
                Key: data.Key
            }
            console.log(signedURLObject);

            s3Client.getSignedUrl('getObject', signedURLObject, function (err, url) {
                if (err) {
                    console.log("-> ERROR IN Signing object", err);
                    res.send({ message: 'failure' });
                } else {
                    console.log("-> FOUND URL TO parse the image", url);
                    // Now create the Avatar of the url passes


                    const pythonProcess = spawn("python", [
                        __dirname + "/../config/AvatarTest.py",
                        url,
                        config.avatar3dClientId,
                        config.avatar3dclientSecret,
                        req.user_cognito_id
                    ]);

                    pythonProcess.stdout.on("data", async data => {
                        console.log(data.toString());
                        try {
                            //archive zip

                            var output = fs.createWriteStream(data.toString() + ".zip");

                            archive.on("error", function (err) {
                                console.log(err);
                                return res.status(400).send({ message: "failure", error: err });
                            });
                            archive.pipe(output);

                            archive.directory(path.join(__dirname, "/../" + data.toString() + "/"), false);
                            archive.finalize();

                            output.on("close", async function () {
                                console.log(archive.pointer() + " total bytes");
                                console.log("zip file uploading");
                                let filePath = path.join(
                                    __dirname,
                                    "../" + data.toString() + ".zip"
                                );

                                let headFilePath = path.join(__dirname,
                                    "../" + data.toString() + "/head/");


                                console.log("ZIP FILE PATH", filePath);


                                fs.readFile(filePath, function (err, zipBuffer) {
                                    if (err) {
                                        return res.send({
                                            message: "failure"
                                        })
                                    }
                                    else {
                                        file_name = Date.now();
                                        params.Key = req.user_cognito_id + "/profile/model/" + file_name + ".zip";
                                        params.Body = zipBuffer;
                                        s3Client.upload(params, (err, data) => {
                                            if (err) {
                                                console.log(err);
                                                return res.send({ message: "failure" })
                                            }
                                            else {
                                                // Updating user's attribute 
                                                // "is_selfie_image_uploaded" -> true 
                                                // "is_selfie_model_uploaded" -> false 
                                                console.log("Uploaded the zip files!");
                                                var userParams = {
                                                    TableName: "users",
                                                    Key: {
                                                        "user_cognito_id": req.user_cognito_id
                                                    },
                                                    UpdateExpression: "set is_selfie_image_uploaded = :selfie_image_uploaded, is_selfie_model_uploaded = :selfie_model_uploaded",
                                                    ExpressionAttributeValues: {
                                                        ":selfie_model_uploaded": true,
                                                        ":selfie_image_uploaded": true,
                                                    },
                                                    ReturnValues: "UPDATED_NEW"
                                                };
                                                docClient.update(userParams, (err, data) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return res.send({ message: "failure" });
                                                    } else {
                                                        // Delete both folder and zip file
                                                        // after uploading 
                                                        // Here call functions to generate & Upload selife
                                                        // TODO : CREATE FILE
                                                        console.log("Generating the Image from PLY file!");
                                                        exec(`xvfb-run ${__dirname}/../config/ProjectedTexture ${headFilePath}model.ply ${headFilePath}model.jpg ${headFilePath}../${req.user_cognito_id}.png`, (err, stdout, stderr) => {
                                                            if (err) {
                                                                // node couldn't execute the command
                                                                return res.send({ message: "failure" });
                                                            }
                                                            else if (stderr) {
                                                                console.log("Error in generating the image");
                                                                return res.send({ message: "failure" });
                                                            }
                                                            else {
                                                                console.log("Uploaded Generated PNG File");
                                                                // the *entire* stdout and stderr (buffered)

                                                                // console.log(`stdout: ${stdout}`);
                                                                // console.log(`stderr: ${stderr}`);

                                                                // ReadFile 
                                                                fs.readFile(`${headFilePath}../${req.user_cognito_id}.png`, function (err, headBuffer) {
                                                                    if (err) {
                                                                        return res.send({ message: 'failure' });
                                                                    }
                                                                    else {
                                                                        params.Key = req.user_cognito_id + "/profile/image/" + file_name + ".png" ;
                                                                        params.Body = headBuffer;
                                                                        // Call S3 Upload
                                                                        s3Client.upload(params, (err, data) => {
                                                                            if (err) {
                                                                                return res.send({ message: 'failure' , error : err });
                                                                            }
                                                                            else {
                                                                                generateINPFile(req.user_cognito_id,(err,response)=>{
                                                                                    if(err){
                                                                                        return res.send({ message: 'failure' , error : err });
                                                                                    }
                                                                                    else{
                                                                                        // Update the status of user in dynamodb
                                                                                        var userParams = {
                                                                                            TableName: "users",
                                                                                            Key: {
                                                                                                "user_cognito_id": req.user_cognito_id
                                                                                            },
                                                                                            UpdateExpression: "set is_selfie_inp_uploaded = :is_selfie_inp_uploaded",
                                                                                            ExpressionAttributeValues: {
                                                                                                ":is_selfie_inp_uploaded": true
                                                                                            },
                                                                                            ReturnValues: "UPDATED_NEW"
                                                                                        };
                                                                                        docClient.update(userParams,(err,data)=>{
                                                                                          if(err){
                                                                                            return res.send({ message: 'failure', error : err });
                                                                                          }  
                                                                                          else{
                                                                                            return res.send({ message: 'success' });
                                                                                          }
                                                                                        })
                                                                                        
                                                                                    }
                                                                                })
                                                                                
                                                                            }
                                                                        });

                                                                    }
                                                                })
                                                            }
                                                        });

                                                    }
                                                });
                                            }
                                        })
                                    }
                                });
                            });
                            // HERE :///

                        } catch (error) {
                            console.log(error);
                            return res.send({ message: "failure" });
                        }
                    });

                    pythonProcess.stderr.on("data", async data => {
                        console.log(`error:${data}`);
                        return res.send({ message: "failure", error : data });

                    });
                    pythonProcess.on("close", async data => {
                        if(data == "1" || data == 1){
                            return res.send({
                                message : "failure"
                            });
                        }
                        console.log(`child process close with ${data}`)
                    });

                }
            });



        });
    }

}

