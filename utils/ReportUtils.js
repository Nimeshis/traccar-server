//reports utils
const axios = require('axios');
const xlsx = require('xlsx');

const fetchXlsx = async () => {
  try {
    const response = await axios.get('http://108.181.195.185:8082/api/reports/route', {
      responseType: 'arraybuffer'
    });

    const workbook = xlsx.read(response.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    return data;
  } catch (error) {
    console.error('Error fetching or processing the XLSX file:', error);
    throw error;
  }
};

module.exports = fetchXlsx;