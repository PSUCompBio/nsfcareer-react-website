var stream = require('stream');
 
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
    params.Key =   req.user_cognito_id + "/profile/" + Date.now() +  "." + req.file.originalname.split(".")[1];
	params.Body = req.file.buffer;
		if(req.body.file_error){
            console.log(req.body.file_error);
            res.send({message : "failure",
        status : "Invalid File type"});   
        }
        else{
            s3Client.upload(params, (err, data) => {
                if (err) {
                    console.log("ERROR");
                    res.status(500).send({message:'failure'});
                }
                console.log("FILE UPLODED");
                
                
                res.send({message: 'success'});
                
            });
        }

}

