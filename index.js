const XLSX = require('xlsx');
const path = require("path");
const { Readable } = require('stream');

const PATH_FILE = path.join(__dirname, 'extracted','CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx');
function  read() {
    XLSX.stream.set_readable(Readable);
    const workbook = XLSX.readFile(PATH_FILE);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];

    const dataExcel = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]);
    console.log(dataExcel);
}

read();
