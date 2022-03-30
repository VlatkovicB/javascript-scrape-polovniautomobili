import Sequelize from "sequelize"
import { isDevelopment } from "./utils.js"

const options = isDevelopment()
  ? null
  : {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }

const sequelize = new Sequelize(process.env.DATABASE_URI, options)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
