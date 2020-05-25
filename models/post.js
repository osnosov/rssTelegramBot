const knex = require('../db')

const findByUrl = async (url) => {
  const id = await knex('post')
    .select()
    .where({ url })
    .first()
  return id
}

async function savePost(title, url, message_id, pubdate) {
  const [id] = await knex('post').insert({ title, url, message_id, pubdate })
  return id
}

module.exports = { findByUrl, savePost }
