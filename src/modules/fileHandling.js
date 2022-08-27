const { imageToText } = require("./ocr");
const fs = require("fs");
const admZip = require("adm-zip");
const zip = new admZip();
const path = require("path");


let filePath = []
let textFolderPath = path.join(__dirname, "../../text/")
let uploadsFolderPath = path.join(__dirname, "../../uploads/")
let fileFullName = []
let fileName = []
let fileExt = []
let textFileName = []
let outputZip = 'files_as_text.zip';

module.exports.textFolderPath = textFolderPath
module.exports.outputZip = outputZip

async function mainWorker (req, res){
    try{
        await fileUploading(req, res);
        for(let i = 0; i in fileName; i++){
            await imageToText(fileName[i], filePath[i]);
        }
        await zipIt(res)
        await wipeSession()
    }
    catch(err){
        await wipeSession()
    }
}

async function fileUploading (req, res){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < req.files.length; i++){
            getExt = req.files[i].filename.split('.');
            fileExt.push(req.files[i].filename.split('.')[getExt.length-1]);
            fileName.push(req.files[i].filename.split('.')[0]);
            filePath.push(req.files[i].path);
            fileFullName.push(fileName[i]+fileExt[i]);
            textFileName.push(fileName[i] + ".txt")
        }
        resolve()
    })
}

async function zipIt (res) {
    return new Promise((resolve, reject) => {

        fs.readdir(textFolderPath, (err, files) => {
        
        files.forEach(file => {
            zip.addLocalFile(textFolderPath + file)
        })
        textFileName.forEach(file => {
            fs.unlinkSync(textFolderPath+file);
        })
        fs.writeFileSync(outputZip, zip.toBuffer());
        res.download(outputZip, (err) => {
        files.forEach(file => {
            zip.deleteFile(file)
        })
        if(err){
                console.log(err);
            }
                resolve()
            })
        })      
    })
}

async function wipeSession() {
    filePath = []
    fileFullName = []
    fileName = []
    fileExt = []
    textFileName = []

    if(fs.existsSync("./files_as_text.zip")){
        fs.unlinkSync("./files_as_text.zip");
    }
    fs.readdir(textFolderPath, (err) => {
        textFileName.forEach(file => {
            fs.unlinkSync(textFolderPath+file)
        })
    })
    fs.readdir(uploadsFolderPath, (err) => {
        textFileName.forEach(file => {
            fs.unlinkSync(uploadsFolderPath+file)
        })
    })
}


module.exports.mainWorker = mainWorker
module.exports.fileUploading = fileUploading