//const Queue = require('bull');
const fs = require('fs')
const es = require('event-stream')
const path = require('path')
const moment = require('moment');
const mysql = require('mysql');
const Utils = require('./utils');

const PATH_FILE = path.join(__dirname, 'extracted','file.txt')

const transformData = (data) => {
  const texto = data;
  const regex = /<(t|v)(\s[^>]*)?>(.*?)<\/\1>/g;
  return texto.match(regex)
};

console.log('PROCESS FILE => ',PATH_FILE);


var index = 0;
var countRegister = 0;

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

const DBConfig = require('./DBconfig');

let connection = mysql.createConnection(DBConfig);


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
console.log('CLEAN DB');
let  QUERY = 'TRUNCATE `registros`;';
connection.query(QUERY);
connection.end();


const mainFunction = () => {
    
    fs.createReadStream(PATH_FILE ,"utf-8")
    .pipe(es.split())    
    .on('data', (data) => {
        
        
        const transformed =  transformData(data);
          
        if(!transformed) return;

                
        let [
          actividad,
          registro_hidrocarburos,
          ruc,
          razon_social,
          departamento,
          provincia,
          distrito,
          direccion,
          fecha_registro,
          producto,
          precio,
          unidad
        ]  = transformed;
        
        if(actividad.length <= 1) return;
          index ++;
          
          fecha_registro = Utils.convertirFechaDeExcelANormal(parseInt(Utils.replaceCharsInDate(fecha_registro))).format('Y-MM-DD');
          
          const beforeDay = moment().subtract(1, 'days').format('Y-MM-DD');
          
          if(fecha_registro == beforeDay) {
            console.log(beforeDay, fecha_registro);
            countRegister++;

            actividad = Utils.replaceWorseChars(actividad);
            registro_hidrocarburos = Utils.replaceWorseChars(registro_hidrocarburos);
            ruc = Utils.replaceWorseChars(ruc);
            razon_social = Utils.replaceWorseChars(razon_social);
            departamento = Utils.replaceWorseChars(departamento);
            provincia = Utils.replaceWorseChars(provincia);
            distrito = Utils.replaceWorseChars(distrito);
            direccion = Utils.replaceWorseChars(direccion);
            
            producto = Utils.replaceWorseChars(producto);
            precio = Utils.replaceWorseChars(precio);
            unidad = Utils.replaceWorseChars(unidad);
            
            sqlBody+= `("${actividad}","${registro_hidrocarburos}", ${ruc},"${razon_social}", "${departamento}", "${provincia}", "${distrito}", "${direccion}", "${fecha_registro}", "${producto}", "${precio}", "${unidad}"),`

            if (countRegister === 10) {
              console.log('***INSERT DATA***');
                try {
                    connection = mysql.createConnection(DBConfig);
                    QUERY = `${sqlHeader} VALUES ${sqlBody}`.slice(0,-1)+";"
                    
                    connection.query(QUERY);
                    connection.end();
                    QUERY = "";
                    sqlBody = "";
                    countRegister = 0;
                } catch(e) {
                  console.error(e);
                }
                  
            }
            

          }
         
    }).on('end', () => {
      console.log('-terminado-');
      if(sqlBody) {
        console.log('INSERT LAST');
        connection = mysql.createConnection(DBConfig);
        QUERY = `${sqlHeader} VALUES ${sqlBody}`.slice(0,-1)+";"
        connection.query(QUERY);
        connection.end();
      }
    })
}

mainFunction()


