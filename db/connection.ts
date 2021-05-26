import { Sequelize } from 'sequelize';



const db = new Sequelize('node curso','root',undefined, {
    host:'localhost',
    dialect:'mysql',
    // logging: false
});

export default db;