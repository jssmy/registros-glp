const path = require('path')
const ExcelJS = require('exceljs');
const fs = require('fs');
const PATH_FILE = path.join(__dirname, 'extracted','CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx');
const filename = 'archivo_excel.xlsx';
const workbook = new ExcelJS.stream.xlsx.WorkbookReader(fs.createReadStream(filename));

const batchSize = 100; // procesará 100 filas por lote
let rowIndex = 0;

workbook.eachSheet((worksheetReader, sheetId) => {
  worksheetReader.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowIndex % batchSize === 0) {
      // Procesa los datos del lote actual
      for (const row of rows) {
        // Realiza alguna operación con los datos de las filas
        console.log(row.values);
      }
      rows = [];
    }
    rowIndex++;

    rows.push(row);
  });
  
  // Procesa los datos del lote final
  for (const row of rows) {
    // Realiza alguna operación con los datos de las filas
    console.log(row.values);
  }
});
