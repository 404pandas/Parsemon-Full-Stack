const User = require('./User');
const Data = require('./Data');
const DataExtension = require('./DataExtension');

Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Data, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Data.hasMany(DataExtension, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
});

User.hasMany(DataExtension, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

DataExtension.belongsTo(Data, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
});

DataExtension.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Data,
  DataExtension,
};
