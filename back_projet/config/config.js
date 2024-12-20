import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  token: process.env.TOKEN,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER ,
  db_name: process.env.MYSQL_DATABASE,
  db_dialect: process.env.DB_DIALECT,
  db_password: process.env.MYSQL_ROOT_PASSWORD,
  url_front: process.env.URL_FRONT,
  cors_origin: process.env.CORS_ORIGIN,
  like_id: process.env.LIKE_ID,
  unlike_id: process.env.UNLIKE_ID
}