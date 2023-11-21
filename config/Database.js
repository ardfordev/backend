import { Sequelize } from "sequelize";

const db = new Sequelize('asp_db', 'root', 'natrium11', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;