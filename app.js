require('dotenv').config();

const { CronJob } = require('cron');

const { bot } = require('./bot');
const log = require('./log')(module);
const { feed } = require('./feed');
const { getLinks } = require('./link');
const { findByUrl, savePost } = require('./post');

let linksFeed;

const sendBotBd = (data, channel) => {
  findByUrl(data.guid, (err, row) => {
    if (err) {
      log.error('Error find by url:', err.stack);
    } else if (!row[0]) {
      bot
        .sendMessage(channel, data.guid, { parse_mode: 'HTML' })
        .then(sended => {
          const saveData = {
            guid: data.guid,
            title: data.title,
            pubdate: data.pubdate,
            message_id: sended.message_id,
          };
          savePost(saveData, errSavePost => {
            if (errSavePost) log.error('Save post to BD error:', errSavePost);
          });
        })
        .catch(error => {
          log.error('Error send message telegram:', error.code);
        });
    }
  });
};

const getFeeds = () => {
  linksFeed.forEach(linkFeed =>
    feed(linkFeed.feed, (err, res) => {
      if (err) {
        log.error('Get feed error: ', err);
      } else {
        res.forEach(linkRes => sendBotBd(linkRes, linkFeed.channel));
      }
    })
  );
};

const job = new CronJob({
  cronTime: '0 */30 * * * *',
  onTick: () => getFeeds(),
  start: false,
});

getLinks((err, row) => {
  if (err) {
    log.error('Get link error: ', err);
  } else {
    linksFeed = row;
    job.start();
  }
});
