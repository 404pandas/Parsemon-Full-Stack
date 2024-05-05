const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Card extends Model {}

Card.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrlHiRes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supertype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtype: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    artist: {
      type: DataTypes.STRING,
    },
    rarity: {
      type: DataTypes.STRING,
    },
    series: {
      type: DataTypes.STRING,
    },
    set: {
      type: DataTypes.STRING,
    },
    setCode: {
      type: DataTypes.STRING,
    },
    types: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    evolvesFrom: {
      type: DataTypes.STRING,
    },
    attacks: {
      type: DataTypes.JSONB, // Assuming attacks will be stored as JSON
    },
    weaknesses: {
      type: DataTypes.JSONB, // Assuming weaknesses will be stored as JSON
    },
    retreatCost: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    resistances: {
      type: DataTypes.JSONB, // Assuming resistances will be stored as JSON
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
  },
)

module.exports = Card
