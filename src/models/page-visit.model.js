import db from "../database.js"

export default db.sequelize.define(
  "PageVisit",
  {
    link: db.Sequelize.STRING(1000),
  },
  {
    tableName: "page_visit",
  }
)
