const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Card extends Model {}

Card.init(
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
    supertype: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subtypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    level: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hp: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    types: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    evolvesFrom: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    abilities: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    attacks: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    weaknesses: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    retreatCost: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    convertedRetreatCost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    set: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    artist: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rarity: {
      type: DataTypes.TEXT,
    },
    flavorText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nationalPokedexNumbers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    legalities: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    tcgplayer: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    cardmarket: {
      type: DataTypes.JSONB,
      allowNull: true,
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
