const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config()

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'cubejs_demo'
});

// Read CSV and insert data into MySQL
fs.createReadStream('sample_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { id, name, value, timestamp } = row;
    const query = `INSERT INTO data (id, name, value, timestamp) VALUES (?, ?, ?, ?)`;
    connection.execute(query, [id, name, value, timestamp], (err) => {
      if (err) throw err;
    });
  })
  .on('end', () => {
    console.log('CSV data successfully loaded into MySQL.');
    connection.end();
  });
