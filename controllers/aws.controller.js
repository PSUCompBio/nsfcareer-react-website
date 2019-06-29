var stream = require('stream');
var AWS = require('aws-sdk');
var fs = require('fs');
var archive = archiver("zip");
const spawn = require("child_process").spawn;

// AWS Credentials loaded
AWS.config.loadFromPath('./config/AWSConfig.json');


const docClient = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true
});

const s3 = require('../config/s3.config.js');



exports.doUpload = (req, res) => {
    console.log("FILE UPLOAD CALLED");

    const s3Client = s3.s3Client;
    const params = s3.uploadParams;
    var ts = new Date();
    // var month = ts.getMonth() + 1;
    // var milliSeconds = ts.getMilliseconds() + 1;
    // var hours = ts.getHours();
    // var minutes = ts.getMinutes() + 1;
    // var seconds = ts.getSeconds() + 1;
    // var y = ts.getDate() +"-"+ month +"-"+ ts.getFullYear()+ "-" + hours + "-" + minutes + "-" + seconds + "-" + milliSeconds;

    // params.Key = req.file.originalname;
    var file_name = Date.now();
    params.Key = req.user_cognito_id + "/profile/image/" + file_name + "." + req.file.originalname.split(".")[1];
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
                        "./AvatarTest.py",
                        url
                    ]);

                    pythonProcess.stdout.on("data", async data => {
                        console.log(data.toString());
                        try {
                            //archive zip
                            
                            var output = fs.createWriteStream(data.toString() + ".zip");
                            

                            output.on("close", async function () {
                                console.log(archive.pointer() + " total bytes");
                                console.log(
                                    "archiver has been finalized and the output file descriptor has closed."
                                );
                                console.log("zip file uploading");
                                let filePath = path.join(
                                    __dirname,
                                    "../" + data.toString() + ".zip"
                                );

                                
                                fs.readFile(filePath,function(err,zipBuffer){
                                    if(err){
                                        return res.send({
                                            message : "failure"
                                        })
                                    }
                                    else{
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
                                                        return res.send({ message: 'success' });
                                                    }
                                                });
                                    }
                                })
                                
                                    }
                                });




                            });
                            archive.on("error", function (err) {
                                console.log(err);
                                res.status(400).send(err);
                                throw err;
                            });
                            archive.pipe(output);
                            console.log("PATH IS ", path.join(__dirname, "/../" + data.toString() + "/model.ply"))
                            let file = fs.createReadStream(
                                path.join(__dirname, "/../" + data.toString() + "/model.ply")

                            );
                            archive.append(file, { name: "model.ply" });
                            file = fs.createReadStream(
                                path.join(__dirname, "/../" + data.toString() + "/model.jpg")
                            );
                            archive.append(file, { name: "model.jpg" });
                            archive.finalize();


                        } catch (error) {
                            console.log(error);
                            return res.send({ message: "failure" });
                        }
                    });

                    pythonProcess.stderr.on("data", async data => {
                        console.log(`error:${data}`);
                        
                    });
                    pythonProcess.on("close", async data => {
                        console.log(`child process close with ${data}`)
                    });

                }
            });



        });
    }

}

