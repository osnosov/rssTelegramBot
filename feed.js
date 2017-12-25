const FeedParser = require('feedparser');
const request = require('request');

module.exports = function(url, callback) {
  let req = request(url, { timeout: 10000, pool: false });
  let feedparser = new FeedParser();
  let items = [];

  req.on('error', err => callback(err));

  req.on('response', function(res) {
    let stream = this;
    if (res.statusCode !== 200) {
      callback('Request bad status code');
      return;
    }
    stream.pipe(feedparser);
  });

  feedparser.on('error', err => callback(err));

  feedparser.on('readable', function() {
    let stream = this;
    let item;
    while ((item = stream.read())) items.push(item);
  });

  feedparser.on('end', () => callback(null, items));
};
