const { connection } = require('./db');

const getLinks = callback => {
  connection.query('SELECT * FROM link', (err, rows) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, rows);
  });
};

module.exports = { getLinks };
