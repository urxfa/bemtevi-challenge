import sequelize from "./database";
import User from '../models/User'
import Insurer from '../models/Insurer'
import InsuranceType from "../models/InsuranceType";
import Policy from "../models/Policy";


const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true, logging: console.log }); // WARNING -> { force: true } will delete all tables and create new ones!
    console.log("Sucessful Sync")
  } catch (error) {
    console.error('Failed Sync: ', error);
  }
}

syncDatabase();