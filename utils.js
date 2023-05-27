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
        const fecha = moment('1900-01-01').add(numeroDeSerieDeExcel - 1, 'days');
        return fecha;
      }

    static replaceWorseChars = (value) => {
        if(!value) return value;
        utf
        return decodeURIComponent(escape(value))
        .replace('<t>', '')
          .replace('</t>', '')
          .replace('<v>', '')
          .replace('</v>', '')
          .replace('<t xml:space="preserve">', '')
          .replace(/[']+/g, '')
          .replace(/["]+/g, '')
          .replace(/[\x96]+/g, '')
          .replace(/[\xC2]+/g, '')
          .replace(/[\x92]+/g, '')
          .replace(/[\x93]+/g, '')
          .replace(/[\x91]+/g, '')
          .replace(/[\x94]+/g, '')
          .replace(/[\x95]+/g, '')
          .replace(/[\xC2\x93]+/g, '');
          
      };

      static replaceCharsInDate = (value) => {
        if(!value) return value;

        return value.replace('<t>', '')
          .replace('</t>', '')
          .replace('<v>', '')
          .replace('</v>', '')
          .replace('<t xml:space="preserve">', '')
          .replace(/[']+/g, '');
          Text
      }

      static encode_utf8(s){ return unescape(encodeURIComponent(s));}
      
}


module.exports = Utils;