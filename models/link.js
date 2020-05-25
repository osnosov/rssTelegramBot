const knex = require('../db')

const getLinks = async () => {
  const links = await knex('link').select()
  return links
}

module.exports = { getLinks }
