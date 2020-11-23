var express = require('express')
var app = express()
var router = express.Router();
const { exec } = require('child_process')
const fs = require('fs')
const bodyParser = require('body-parser')
const multer = require('multer')
const http = require('http');

var subDirectory = '/uploads'

if (!fs.existsSync(subDirectory)){
    fs.mkdirSync(subDirectory)

}
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('uploads'))


var outputFilePath = Date.now() + 'output.mp4';
var listFilePath = '/uploads/files.txt';

router.post('/', function (req, res, next) {
    const file = fs.createWriteStream(outputFilePath);
const request = http.get("https://nsfcareer-users-data.s3-accelerate.amazonaws.com/35317-Prevent-Biometrics/simulation/07-22-2019/qIYe2mOoS/movie/qIYe2mOoS_mps.mp4?AWSAccessKeyId=AKIA5UBJSELBEIFVBRCC&Expires=1603437098&Signature=wMHkdMC%2FXD8gB%2BB8FZsmGxN1Whg%3D", function(response) {
  response.pipe(file);
});
   /* exec(`ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
          
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        else{
                console.log("videos are successfully merged")
            res.download(outputFilePath,(err) => {
                if(err) throw err

                req.files.forEach(file => {
                    fs.unlinkSync(file.path)                    
                });

                fs.unlinkSync(listFilePath)
                fs.unlinkSync(outputFilePath)

              

            })
        }
        
    })*/
})

module.exports = router;