const sequelize = require('../config/connection')
const { User, Deck, Card, DataExtension } = require('../models')

const userData = require('./userData.json')
const deckData = require('./deckData.json')
const dataExtensionData = require('./dataExtensionData.json')
const cardData = require('./cardData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })

  await Card.bulkCreate(cardData, {
    individualHooks: true,
    returning: true,
  })

  const decks = await Promise.all(
    deckData.map((deck) =>
      Deck.create({
        ...deck,
        userId: users[Math.floor(Math.random() * users.length)].id,
      }),
    ),
  )

  for (const dataExtension of dataExtensionData) {
    await DataExtension.create({
      ...dataExtension,
      userId: users[Math.floor(Math.random() * users.length)].id,
      deckId: decks[Math.floor(Math.random() * decks.length)].id,
    })
  }

  process.exit(0)
}

seedDatabase()
