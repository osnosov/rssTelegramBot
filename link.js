const connection = require('./db');

exports.getLinks = function(callback) {
  connection.query('SELECT * FROM link', function(err, rows, fields) {
    if (err) return callback(err);
    callback(null, rows);
  });
};
