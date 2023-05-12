//const Queue = require('bull');
const fs = require('fs')
const es = require('event-stream')
const path = require('path')
const moment = require('moment');
///const lineQueue = new Queue('line_queue', 'redis://redis:6380');
/*
lineQueue.process((job, done) => {
  setTimeout(() => {
    const {data} = job
    console.log(data)
    done()
  }, 2000)
})

*/

const PATH_FILE = path.join(__dirname, 'extracted','file.txt')

const transformData = (data) => {
  const texto = data;
  const regex = /<(t|v)(\s[^>]*)?>(.*?)<\/\1>/g;
  return texto.match(regex)
};

const replaceWorseChars = (value) => {
  if(!value) return value;
  
  return value.replace('<t>', '')
    .replace('</t>', '')
    .replace('<v>', '')
    .replace('</v>', '')
    .replace('<t xml:space="preserve">', '');
};

convertirNumeroExcelAFecha = (numeroExcel) => {
  const fechaBaseExcel = new Date("1900-01-01");
  const ajusteDias = (numeroExcel > 60) ? -1 : 0; // Ajuste para el 29 de febrero de 1900
  const diasDesdeFechaBase = Math.floor(numeroExcel) + ajusteDias;
  const tiempoEnMilisegundos = diasDesdeFechaBase * 24 * 60 * 60 * 1000;
  const fecha = new Date(fechaBaseExcel.getTime() + tiempoEnMilisegundos);
  const fraccionDelDia = numeroExcel - Math.floor(numeroExcel);
  fecha.setMilliseconds(fraccionDelDia * 24 * 60 * 60 * 1000);
  const dateSaved = moment(fecha).subtract(1, 'day');
  return dateSaved;
}


const mainFunction = () => {
    let index = 0;
    fs.createReadStream(PATH_FILE ,"utf-8")
    .pipe(
        es.split()
        )    
    .on('data', (data) => {
        
        
        const transformed =  transformData(data);
        
        if(!transformed) {
          return;
        }
        
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

          actividad = replaceWorseChars(actividad);
          registro_hidrocarburos = replaceWorseChars(registro_hidrocarburos);
          ruc = replaceWorseChars(ruc);
          razon_social = replaceWorseChars(razon_social);
          departamento = replaceWorseChars(departamento);
          provincia = replaceWorseChars(provincia);
          distrito = replaceWorseChars(distrito);
          direccion = replaceWorseChars(direccion);
          fecha_registro = convertirNumeroExcelAFecha(replaceWorseChars(fecha_registro)).format('DD-MM-Y');
          producto = replaceWorseChars(producto);
          precio = replaceWorseChars(precio);
          unidad = replaceWorseChars(unidad);
          
          
          if(actividad.length <= 1 ) return;

          index ++;

          console.log(
            index + ')', 
            actividad,'|',
            registro_hidrocarburos, '|',
            ruc, '|',
            razon_social, '|',
            departamento, '|',
            provincia, '|',
            distrito, '|',
            direccion, '|',
            fecha_registro, '|',
            producto, '|',
            precio, '|',
            unidad, '-----'
            );    
         
    })

  // fs.readFile(PATH_FILE, "utf-8", (err, data) => {
  //   let counter = 0;
  //   if(!err){
  //       console.log(Buffer.byteLength(data))
  //   }else{
  //     console.log('ERROR',err)
  //   }
  // })

}


mainFunction()