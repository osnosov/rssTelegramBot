require('dotenv').config()

const { CronJob } = require('cron')

const { bot } = require('./bot')
// const log = require('./services/log')(module);
const { getFeed } = require('./services/feed')
const { getLinks } = require('./models/link')
const { findByUrl, savePost } = require('./models/post')

let globFeed = []

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const sendBotBd = async ({ guid, title, pubdate, channel }) => {
  try {
    await delay()

    const { message_id } = await bot.sendMessage(channel, guid, {
      parse_mode: 'HTML'
    })

    await savePost(title, guid, message_id, pubdate)
  } catch (error) {
    console.log('error sendBotBd', error) //.response.body
  }
}

const getFeeds = async () => {
  try {
    const links = await getLinks()

    for (const { feed, channel } of links) {
      const resFeed = await getFeed(feed)

      for (const { guid, title, pubdate } of resFeed) {
        const id = await findByUrl(guid)

        if (!id) globFeed.push({ guid, title, pubdate, channel })
      }
    }

    globFeed.sort((a, b) => (a.pubdate > b.pubdate ? 1 : -1))

    for (const linkRes of globFeed) {
      await sendBotBd(linkRes)
    }
    console.log('globFeed !!!!!!!!!!', globFeed)
    globFeed = []
  } catch (error) {
    console.log('error getFeeds', error)
  }
}

new CronJob({
  cronTime: '0 */30 * * * *',
  onTick: async () => await getFeeds(),
  start: false
}).start()

// setTimeout(async () => await getFeeds(), 1000)
