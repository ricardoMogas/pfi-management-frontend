import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

class CreateExcelReport {
  constructor(data, filename, header) {
    this.data = data;
    this.filename = filename;
    this.header = header;
  }

  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Añadir el encabezado
    worksheet.addRow(this.header);

    // Añadir los datos a la hoja de cálculo
    this.data.forEach(row => {
      worksheet.addRow(row);
    });

    // Escribir la hoja de cálculo en un archivo y descargarlo
    workbook.xlsx.writeBuffer()
      .then(buffer => {
        saveAs(new Blob([buffer]), this.filename);
        console.log('Archivo Excel creado:', this.filename);
      })
      .catch(err => {
        console.error('Error al escribir el archivo Excel:', err);
      });
  }
  exportToExcelWithSheets() {
    const workbook = new ExcelJS.Workbook();

    // Iterar sobre cada objeto en los datos
    this.data.forEach(sheet => {
      const worksheet = workbook.addWorksheet(sheet.name);

      // Añadir el encabezado común
      worksheet.addRow(this.header);

      // Añadir los datos a la hoja de cálculo
      sheet.data.forEach(item => {
        const rowData = this.header.map(key => item[key]);
        worksheet.addRow(rowData);
      });
    });

    // Escribir la hoja de cálculo en un archivo y descargarlo
    workbook.xlsx.writeBuffer()
      .then(buffer => {
        saveAs(new Blob([buffer]), this.filename);
        console.log('Archivo Excel creado:', this.filename);
      })
      .catch(err => {
        console.error('Error al escribir el archivo Excel:', err);
      });
  }
}

export default CreateExcelReport;
