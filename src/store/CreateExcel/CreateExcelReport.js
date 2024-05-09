import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

class CreateExcelReport {
  constructor(data, filename) {
    this.data = data;
    this.filename = filename;
  }

  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

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
}

export default CreateExcelReport;
