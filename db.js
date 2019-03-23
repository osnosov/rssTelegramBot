const mysql = require('mysql');

const log = require('./log')(module);

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

connection.connect(err => {
  if (err) {
    log.error('error connecting: ', err.stack);
    return;
  }
  log.info('Database Connection successful.');
});

module.exports = { connection };
