const sequelize = require('../config/connection');
const { User, Data } = require('../models');

const userData = require('./userData.json');
const dataData = require('./dataData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const data of dataData) {
    await Data.create({
      ...data,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
