const User = require('./User')
const Data = require('./Data')
const DataExtension = require('./DataExtension')
const Card = require('./Card')
const Deck = require('./Deck')
const sequelize = require('../config/connection')
const { DataTypes } = require('sequelize') // Destructuring assignment for DataTypes

// User and Data relationship (One-to-Many)
Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

User.hasMany(Data, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

// Data and DataExtension relationship (One-to-Many)
Data.hasMany(DataExtension, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
})

DataExtension.belongsTo(Data, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
})

// User and DataExtension relationship (One-to-Many)
User.hasMany(DataExtension, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

DataExtension.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

// Deck and Card many-to-many relationship through DeckCard
const DeckCard = sequelize.define('DeckCard', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
})

Deck.belongsToMany(Card, { through: DeckCard, as: 'DeckCards' })
Card.belongsToMany(Deck, { through: DeckCard })

// User and Deck relationship (One-to-Many)
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
