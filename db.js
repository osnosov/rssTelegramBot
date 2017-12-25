'use strict'

const mysql=require('mysql');
const config = require('./config')
const log = require('./log')(module)

let connection = mysql.createConnection({
  host:config.database.mysql.host,
  port : config.database.mysql.port,
  user:config.database.mysql.user,
  password:config.database.mysql.password,
  database:config.database.mysql.database
});

connection.connect( function(err){
  if (err) {
    log.error('error connecting: ', err.stack);
    return;
  }
  log.info('Database Connection successful.');
});

module.exports = connection;