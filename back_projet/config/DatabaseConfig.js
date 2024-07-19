import { Sequelize } from "sequelize";
import { env } from "./config.js";

const connection = new Sequelize(
    env.db_name, // Nom de la base de donnée
    env.db_user, // identifiant Mysql
    env.db_password, // Mot de passe Mysql
    env.db_host, // URL de mySQL
    env.db_dialect
    
);

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default connection