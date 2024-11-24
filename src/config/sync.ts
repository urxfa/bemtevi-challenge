import sequelize from "./database.ts";
import User from '../models/User.ts'
import Insurer from '../models/Insurer.ts'
import InsuranceType from "../models/InsuranceType.ts";
import Policy from "../models/Policy.ts";


const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true, logging: console.log }); // WARNING -> { force: true } will delete all tables and create new ones!
    console.log("Sucessful Sync")
  } catch (error) {
    console.error('Failed Sync: ', error);
  }
}

syncDatabase();