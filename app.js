
const path = require('path')
const ExcelJS = require('exceljs');
const moment = require('moment');
const mysql  = require('mysql');
const fs = require('fs');
var JSZip = require('JSZip');

const nameFile = 'CL-Registro-precios-DMA-V-CCA-CCE-2023.zip';
const PATH_FILE_FROM_EXTRACT = path.join(__dirname, '/',nameFile);
const PATH_FILE_TO_EXTRAC = path.join(__dirname, '/','extracted');

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

return;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registros_corp'
});

const NAME_COLS = [
    'ACTIVIDAD',
    'REGISTRO_DE_HIDROCARBUROS',
    'RUC',
    'RAZON_SOCIAL',
    'DEPARTAMENTO',
    'PROVINCIA',
    'DISTRITO',
    'DIRECCION',
    'FECHA_DE_REGISTRO',
    'PRODUCTO',
    'PRECIO_DE_VENTA',
    'UNIDAD'
];


const PATH_FILE = path.join(__dirname, 'extracted','file.xlsx');

const workbook = new ExcelJS.Workbook();

workbook.xlsx.readFile(PATH_FILE)
    .then(() => {
        const worksheet = workbook.getWorksheet(1);
        // rest of the code goes here
        const json = [];
        
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            const rowObject = {};
            
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                rowObject[NAME_COLS[colNumber - 1]] = (cell.value.toString().replace(/[']+/g, '')).replace(/["]+/g, '');
            });

            json.push(rowObject);
        });

        const data = json.filter((item) => {
            const fechaRegistro = moment(item.FECHA_DE_REGISTRO);
            const current = moment().subtract(1, 'day');
            return fechaRegistro.format('YYYYMMDD') === current.format('YYYYMMDD');
        })

        console.log('cantidad a insertar =>', data.length);

        //clear
        let  QUERY = 'TRUNCATE `registros`;';
        connection.query(QUERY);

        const chunkSize = 1000;
        const  sqlHeader = `INSERT INTO registros(ACTIVIDAD,
                            REGISTRO_DE_HIDROCARBUROS,
                            RUC,
                            RAZON_SOCIAL,
                            DEPARTAMENTO,
                            PROVINCIA,
                            DISTRITO,
                            DIRECCION,
                            FECHA_DE_REGISTRO,
                            PRODUCTO,
                            PRECIO_DE_VENTA,
                            UNIDAD)`;

        let sqlBody = '';
        let chunkCount = 0;
        const length = data.length;
        for (let index = 0; index < length; index++) {
            chunkCount = chunkCount + 1;
            const item = data[index];
            sqlBody += `("${item.ACTIVIDAD}",
                    "${item.REGISTRO_DE_HIDROCARBUROS}",
                    "${item.RUC}",
                    "${item.RAZON_SOCIAL}",
                    "${item.DEPARTAMENTO}",
                    "${item.PROVINCIA}",
                    "${item.DISTRITO}",
                    "${item.DIRECCION}",
                    "${moment(item.FECHA_DE_REGISTRO).format('Y-MM-DD')}",
                    "${item.PRODUCTO}",
                    "${item.PRECIO_DE_VENTA}",
                    "${item.UNIDAD}"),`;
            const controlChunk = ((index + 1) + chunkSize > length ? length - (index + 1) : chunkSize);
            //console.log(controlChunk, chunkCount);
            if(chunkCount === chunkSize) {
                console.log('inseret => ', chunkCount, controlChunk);
                chunkCount = 0;
                try { 

                     QUERY = `${sqlHeader} VALUES ${sqlBody}`.slice(0, -1)+ ';'.replace('\n');
                    connection.query(QUERY);
                    sqlBody = '';
                } catch(e) {
                    console.error(e);
                }
                
                
            }
        }
        if(sqlBody) { // insertar lo que queda
            console.log('--insertar--');
            QUERY = `${sqlHeader} VALUES ${sqlBody}`.slice(0, -1)+ ';'.replace('\n');
            connection.query(QUERY);
        }
        connection.end();
       
    })
    .catch((error) => {
        console.log('Error: ', error);
    });
