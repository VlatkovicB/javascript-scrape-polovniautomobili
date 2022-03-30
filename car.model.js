import db from "./database.js"

const car = db.sequelize.define(
  "Car",
  {
    id: {
      type: db.Sequelize.STRING,
      primaryKey: true,
    },
    name: db.Sequelize.STRING,
    year: db.Sequelize.INTEGER,
    engine: db.Sequelize.STRING,
    mileage: db.Sequelize.INTEGER,
    bhp: db.Sequelize.STRING,
    city: db.Sequelize.STRING,
    transmission: db.Sequelize.STRING,
    extras: db.Sequelize.STRING,
  },
  {
    tableName: "cars",
  }
)

export default car
