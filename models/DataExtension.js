const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DataExtension extends Model {}

DataExtension.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'dataextension',
  }
);

module.exports = DataExtension;
