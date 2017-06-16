'use strict'

const connection = require('./db')

exports.findByUrl = function(url, callback) {
  connection.query("SELECT * FROM post WHERE url = '" + url + "';", function(err, rows, fields) {
    if (err) return callback(err);
    callback(null, rows);
  });
}

exports.savePost = function(post, callback) {
  connection.query("INSERT INTO post(title, url, message_id, pubdate) VALUES(?, ?, ?, ?);", [post.title, post.guid, post.message_id, post.pubdate], function(err, fields) {
    callback(err, fields);
  });
}
