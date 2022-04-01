import db from "../database.js"

export default db.sequelize.define(
  "Car",
  {
    id: {
      type: db.Sequelize.STRING,
      primaryKey: true,
    },
    name: db.Sequelize.STRING,
    year: db.Sequelize.INTEGER,
    price: db.Sequelize.STRING,
    engine: db.Sequelize.STRING,
    mileage: db.Sequelize.INTEGER,
    bhp: db.Sequelize.STRING,
    description: db.Sequelize.STRING,
    city: db.Sequelize.STRING,
    transmission: db.Sequelize.STRING,
    extras: db.Sequelize.STRING,
  },
  {
    tableName: "cars",
  }
)
