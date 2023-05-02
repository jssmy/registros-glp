
const path = require('path')
const ExcelJS = require('exceljs');
const moment = require('moment');
const mysql  = require('mysql');
//const unzip = require('./unzip');

//const DBConfig = require('./DBconfig');

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

//unzip();
const PATH_FILE = path.join(__dirname, 'extracted','CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx');

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
        //connection.query(QUERY);

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
                    //connection.query(QUERY);

                    sqlBody = '';
                } catch(e) {
                    console.error(e);
                }
                
                
            }
        }
        if(sqlBody) { // insertar lo que queda
            console.log('--insertar--');
            QUERY = `${sqlHeader} VALUES ${sqlBody}`.slice(0, -1)+ ';'.replace('\n');
            //connection.query(QUERY);
        }
        //connection.end();
       
    })
    .catch((error) => {
        console.log('Error: ', error);
    });
