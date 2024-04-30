const User = require('./User');
const Data = require('./Data');
const DataExtension = require('./DataExtension');

Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Data, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
});

Data.hasMany(DataExtension, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
});

Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(DataExtension, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Data,
  DataExtension,
};
