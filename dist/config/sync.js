import sequelize from "./database";
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true, logging: console.log }); // WARNING -> { force: true } will delete all tables and create new ones!
        console.log("Sucessful Sync");
    }
    catch (error) {
        console.error('Failed Sync: ', error);
    }
};
syncDatabase();
