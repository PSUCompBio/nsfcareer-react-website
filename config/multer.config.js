const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        //var ext = path.extname(file.originalname);
        console.log(file.originalname);

        let jpgFile = new RegExp(".jpg").test(file.originalname);
        let jpegFile = new RegExp(".jpeg").test(file.originalname);
        let pngFile = new RegExp(".png").test(file.originalname);

        if (!jpgFile && !jpegFile && !pngFile) {
            // res.send({message : "FAILURE"});
            req.body["file_error"] = "Only jpeg,jpg are allowed"
        }
        callback(null, true)
    }
    // limits:{
    //     fileSize: 1024 * 1024
    // }
});

module.exports = upload;