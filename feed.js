const FeedParser = require('feedparser');
const request = require('request');

const feed = (url, callback) => {
  const req = request(url, { timeout: 10000, pool: false });
  const feedparser = new FeedParser();
  const items = [];

  req.on('error', err => callback(err));

  req.on('response', function(res) {
    const stream = this;
    if (res.statusCode !== 200) {
      callback('Request bad status code');
      return;
    }
    stream.pipe(feedparser);
  });

  feedparser.on('error', err => callback(err));

  feedparser.on('readable', function() {
    const stream = this;
    let item;
    while ((item = stream.read())) items.push(item);
  });

  feedparser.on('end', () => callback(null, items));
};

module.exports = { feed };
