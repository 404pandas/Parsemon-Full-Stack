const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Deck extends Model {}

Deck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalCards: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
      validate: {
        min: 60,
        max: 60,
      },
    },

    cards: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      validateCards(value) {
        const totalCards = value.reduce((acc, card) => acc + card.quantity, 0)
        if (totalCards !== 60) {
          throw new Error('A deck must contain exactly 60 cards.')
        }

        const cardCounts = {}
        value.forEach((card) => {
          const name = card.name
          cardCounts[name] = (cardCounts[name] || 0) + card.quantity
        })

        const cardTypes = Object.keys(cardCounts)
        const validCardTypes = ['Pokémon', 'Trainer', 'Energy']
        const typeCounts = {
          Pokémon: 0,
          Trainer: 0,
          Energy: 0,
        }

        value.forEach((card) => {
          if (validCardTypes.includes(card.type)) {
            typeCounts[card.type] += card.quantity
          }
        })

        if (typeCounts['Energy'] < 1) {
          throw new Error('A deck must contain at least one Energy card.')
        }
        if (typeCounts['Pokémon'] < 1) {
          throw new Error('A deck must contain at least one Pokémon card.')
        }
        if (typeCounts['Trainer'] < 1) {
          throw new Error('A deck must contain at least one Trainer card.')
        }
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'deck',
  },
)

module.exports = Deck
