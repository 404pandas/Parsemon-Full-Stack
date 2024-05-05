const User = require('./User')
const Data = require('./Data')
const DataExtension = require('./DataExtension')
const Card = require('./Card')
const Deck = require('./Deck')
const sequelize = require('../config/connection')
const DataTypes = require('sequelize')

Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

User.hasMany(Data, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

Data.hasMany(DataExtension, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
})

User.hasMany(DataExtension, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

DataExtension.belongsTo(Data, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
})

DataExtension.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

const DeckCard = sequelize.define('DeckCard', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Assuming at least one copy of each card in the deck
  },
})

Deck.belongsToMany(Card, { through: DeckCard, as: 'DeckCards' })
Card.belongsToMany(Deck, { through: DeckCard })
Deck.belongsTo(User, {
  as: 'Owner',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

User.hasMany(Deck, {
  as: 'UserDecks',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

module.exports = {
  User,
  Data,
  DataExtension,
  Card,
  Deck,
  DeckCard,
}
