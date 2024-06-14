import { Sequelize } from "sequelize";

const connection = new Sequelize(
    env.db_name, // Nom de la base de donnée
    env.db_user, // identifiant Mysql
    env.db_password, // Mot de passe Mysql
    {
        host: env.db_host, // URL de mySQL
        dialect: env.db_dialect
    }
);

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default connection