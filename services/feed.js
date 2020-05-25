const FeedParser = require('feedparser')
const request = require('request')

const getFeed = async (url) =>
  new Promise((resolve, reject) => {
    const req = request(url, { timeout: 10000, pool: false })
    const feedparser = new FeedParser()
    const items = []
    // req.on('error', (err) => callback(err))
    req.on('error', (err) => reject(err))
    req.on('response', function(res) {
      const stream = this
      if (res.statusCode !== 200) {
        resolve(new Error('Bad status code'))
      }
      stream.pipe(feedparser)
    })
    feedparser.on('error', (error) => reject(error))
    feedparser.on('readable', function() {
      const stream = this
      let item
      while ((item = stream.read())) items.push(item)
    })
    feedparser.on('end', () => resolve(items))
  })

module.exports = { getFeed }
