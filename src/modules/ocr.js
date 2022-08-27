// This file does the OCR with Tesseract. Will improve the code.
// Esse arquivo realiza o OCR com o Tesseract. Vou melhorar o código.

const fs = require('fs');
const tesseract = require('tesseract.js');

function imageToText(fileNameNoExt, fileLocation, language = "por"){
    return new Promise((resolve, reject) =>{
    tesseract.recognize(
        fileLocation,
        language,
        { logger: status => status}
    ).then(({data: {text}}) =>{
        checkDir();
        
        fs.writeFile("./text/" + fileNameNoExt + ".txt", text, (error) =>{
            if(error){
                return console.log(error);
            };
            
        fs.unlinkSync(fileLocation)
        
        });
        resolve();
    })
    .catch((error)=> {
    return console.log(error)});
    });
    
};

async function checkDir(){
    if(!fs.existsSync("./text")){
        fs.mkdirSync("./text");
    };
};

module.exports = { 
    imageToText
};
