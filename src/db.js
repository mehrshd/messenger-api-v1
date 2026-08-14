const mysql2 = require('mysql2');

const dataBase = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '12ww34ert56MM',
  database: 'reval',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = dataBase;