import Sequelize from "sequelize"

const sequelize = new Sequelize(process.env.DATABASE_URI)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
