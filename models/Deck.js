const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Deck extends Model {}

Deck.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCards: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 60,
        max: 60,
      },
    },

    cards: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      validate: {
        validateCards(value) {
          if (value.length !== 60) {
            throw new Error('A deck must contain exactly 60 cards.')
          }
          // Validate the composition of the deck
          const cardCounts = {}
          value.forEach((card) => {
            const name = card.name
            cardCounts[name] = (cardCounts[name] || 0) + 1
          })
          const cardTypes = Object.keys(cardCounts)
          const validCardTypes = ['Pokémon', 'Trainer', 'Energy']
          for (const type of validCardTypes) {
            if (type === 'Energy') {
              if (!cardTypes.includes(type)) {
                throw new Error(`A deck must contain at least one Energy card of type ${type}.`)
              }
            } else {
              if (cardCounts[type] === undefined || cardCounts[type] < 0) {
                throw new Error(`A deck must contain at least one ${type} card.`)
              }
            }
          }
        },
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
