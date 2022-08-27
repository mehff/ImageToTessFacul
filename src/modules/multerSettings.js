// Multipart file handling with Multer.
// Multer para lidar com arquivos multipart.

const multer = require("multer")
const fs = require("fs")

let storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "./uploads");
        if(!fs.existsSync("./uploads")){
            fs.mkdirSync("./uploads");
        };
    },

    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

let upload = multer({storage:storage})

exports.arrayUpload = upload.array('files', 50)
