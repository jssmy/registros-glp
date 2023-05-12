const fs = require('fs');
//const JSZip = require('JSZip');

const nameFile = 'CL-Registro-precios-DMA-V-CCA-CCE-2023.zip';
const PATH_FILE_FROM_EXTRACT = path.join(__dirname, '/',nameFile);
const PATH_FILE_TO_EXTRAC = path.join(__dirname, '/','extracted');


const unzip = () => {
    fs.readFile( PATH_FILE_FROM_EXTRACT, function(err, data){
        if (!err){
            var zip = new JSZip();
            zip.loadAsync(data).then(function (contents) {
                const filenames = Object.keys(contents.files);
                const filename = filenames[filenames.length - 1];
                zip.file(filename).async('nodebuffer').then(function(content) {
                    var dest = PATH_FILE_TO_EXTRAC +'/'+ 'file.xlsx';
                    console.log(dest);
                    fs.writeFileSync(dest, content);
                });
            })
        }
    });
};

module.exports = unzip;
