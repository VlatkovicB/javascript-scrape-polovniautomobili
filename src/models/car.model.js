import db from "../database.js"
import AuditLogService from "../services/audit-log.service.js"

const Loan = db.sequelize.define(
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
    link: db.Sequelize.STRING,
    renewDate: db.Sequelize.DATE,
    extras: db.Sequelize.STRING,
    createdAt: db.Sequelize.DATE,
    updatedAt: db.Sequelize.DATE,
  },
  {
    timestamps: false,
    tableName: "cars",
  }
)

const excludedFields = ["name", "bhp", "city", "transmission", "renewDate"]

AuditLogService.audit(Loan, "Loan", excludedFields)

export default Loan
