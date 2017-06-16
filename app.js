'use strict'

const bot = require('./bot')
const log = require('./log')(module)
const config = require('./config')
const CronJob = require('cron').CronJob
const feed = require('./feed')
const link = require('./link')
const post = require('./post')

let linksFeed;

const job = new CronJob({
  cronTime: '0 */30 * * * *',
  onTick: function() {
    getFeeds();
  },
  start: false
});

link.getLinks(function(err,row) {
  if (err) {
    log.error('Get link error: ', err);
  } else {
    linksFeed = row;
    job.start();
  }
});

function getFeeds() {
  linksFeed.forEach(function(linkFeed, number, linkFeeds) {
    feed(linkFeed.feed,function(err,res){
      if (err) {
        log.error('Get feed error: ', err);
      } else {
        res.forEach(function(linkRes, number, linkRess) {
          sendBotBd(linkRes, linkFeed.channel);
        });
      }
    });
  });
}

function sendBotBd(data, channel) {
  post.findByUrl(data.guid, function(err, row) {
    if (err) {
      log.error('Error find by url:', err.stack);
    } else if (!row[0]) {
      bot.sendMessage(channel, data.guid, {parse_mode: 'HTML'})
        .then((sended) => {
          data.message_id = sended.message_id;
          post.savePost(data, function(err, row) {
            if (err) log.error('Save post to BD error:', err);
          });
        })
        .catch((error) => {
          log.error('Error send message telegram:', error.code);
        });
    }
  });
};
