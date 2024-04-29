const User = require('./User');
const Data = require('./Data');

Data.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Data, {
  foreignKey: 'dataId',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Data,
  Comment,
};
