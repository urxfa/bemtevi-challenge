import sequelize from "./database.ts";
import User from '../models/User.ts'

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // WARNING -> { force: true } will delete all tables and create new ones!
    console.log("Sucessful Sync")
  } catch (error) {
    console.error('Failed Sync: ', error);
  }
}

syncDatabase();