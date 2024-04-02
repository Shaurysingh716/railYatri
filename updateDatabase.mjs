
import fs from 'fs';
import ExcelJS from 'exceljs'; // Install using npm

export default async function updateExcelFile(filename, dbCode, tickets) {
  try {
    const maxRetries = 5; // Number of retries before giving up
    const retryDelay = 1000; // Delay in milliseconds between retries
    const excelFilePath = filename;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1); // Assuming it's the first worksheet

    let rowIndex = -1;

    // Find the row with the matching DB Code in merged cells
    worksheet.eachRow((row, rowNumber) => {
      const dbCodeCellP = row.getCell('P').value;
      const dbCodeCellQ = row.getCell('Q').value;
      if (dbCodeCellP === dbCode || dbCodeCellQ === dbCode) {
        rowIndex = rowNumber;
      }
    });

    if (rowIndex === -1) {
      console.log(`DB Code ${dbCode} not found in the Excel sheet.`);
      return;
    }

    // Update the "Available" column in merged cells
    const availableCellR = worksheet.getCell(`R${rowIndex}`);
    const availableCellS = worksheet.getCell(`S${rowIndex}`);
    const currentAvailable = availableCellR.value;

    if (currentAvailable >= tickets) {
      availableCellR.value = currentAvailable - tickets;
      availableCellS.value = currentAvailable - tickets;
      await workbook.xlsx.writeFile(excelFilePath);
      console.log(`Updated available tickets for DB Code ${dbCode}.`);
    } else {
      console.log('Not enough tickets available.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// // Usage:
// const excelFileName = 'TrainsData.xlsx';
// const dbCode = 'NDLSBPL11062';
// const ticketsToDeduct = 2;

// updateExcelFile(excelFileName, dbCode, ticketsToDeduct);
