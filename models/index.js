const User = require('./User')
const Card = require('./Card')
const Deck = require('./Deck')
const sequelize = require('../config/connection')
const { DataTypes } = require('sequelize') // Destructuring assignment for DataTypes

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
  Card,
  Deck,
}
