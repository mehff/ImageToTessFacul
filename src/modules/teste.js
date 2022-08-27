const { imageToText } = require("./ocr");
const fs = require("fs");
const admZip = require("adm-zip");
const zip = new admZip();
const path = require("path");

function arroz(req, res){
    let valor = req.body.value
}