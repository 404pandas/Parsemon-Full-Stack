const sequelize = require('../config/connection');
const { User, Data, DataExtension } = require('../models');

const userData = require('./userData.json');
const dataData = require('./dataData.json');
const dataExtensionData = require('./dataExtensionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const datas = await Promise.all(
    dataData.map((data) =>
      Data.create({
        ...data,
        userId: users[Math.floor(Math.random() * users.length)].id,
      })
    )
  );

  for (const dataExtension of dataExtensionData) {
    await DataExtension.create({
      ...dataExtension,
      userId: users[Math.floor(Math.random() * users.length)].id,
      dataId: datas[Math.floor(Math.random() * datas.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
