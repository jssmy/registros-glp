const moment = require('moment');
const { escape } = require('mysql');
class Utils {
     static convertirNumeroExcelAFecha = (numeroExcel) => {
        const fechaBaseExcel = new Date("1900-01-01");
        const ajusteDias = (numeroExcel > 60) ? -1 : 0; // Ajuste para el 29 de febrero de 1900
        const diasDesdeFechaBase = Math.floor(numeroExcel) + ajusteDias;
        const tiempoEnMilisegundos = diasDesdeFechaBase * 24 * 60 * 60 * 1000;
        const fecha = new Date(fechaBaseExcel.getTime() + tiempoEnMilisegundos);
        const fraccionDelDia = numeroExcel - Math.floor(numeroExcel);
        fecha.setMilliseconds(fraccionDelDia * 24 * 60 * 60 * 1000);
        const dateSaved = moment(fecha);
        return dateSaved;
    }

    static convertirFechaDeExcelANormal(numeroDeSerieDeExcel) {
        const fecha = moment('1900-01-01').add(numeroDeSerieDeExcel - 1, 'days').subtract(5, 'hours');
        return fecha;
      }

    static replaceWorseChars = (value) => {
        if(!value) return value;
        
      try {
        return unescape(value
          .replace('<t>', '')
          .replace('</t>', '')
          .replace('<v>', '')
          .replace('</v>', '')
          .replace('<t xml:space="preserve">', ''))
          .replace(/[']+/g, '')
          .replace(/["]+/g, '')
          .replace(/[^a-zA-Z0-9 .;,*-]/g, '');
          
      } catch (error) {
          console.log({value,error});
        throw new Error('Error');
      }
      };

      static replaceCharsInDate = (value) => {
        if(!value) return value;

        return value.replace('<t>', '')
          .replace('</t>', '')
          .replace('<v>', '')
          .replace('</v>', '')
          .replace('<t xml:space="preserve">', '')
          .replace(/[']+/g, '');
          
      }

      
}


module.exports = Utils;