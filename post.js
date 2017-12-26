const { connection } = require('./db');

const findByUrl = (url, callback) => {
  connection.query(`SELECT * FROM post WHERE url = '${url}';`, (err, rows) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, rows);
  });
};

const savePost = (post, callback) => {
  connection.query(
    'INSERT INTO post(title, url, message_id, pubdate) VALUES(?, ?, ?, ?);',
    [post.title, post.guid, post.message_id, post.pubdate],
    (err, fields) => {
      callback(err, fields);
    }
  );
};

module.exports = { findByUrl, savePost };
