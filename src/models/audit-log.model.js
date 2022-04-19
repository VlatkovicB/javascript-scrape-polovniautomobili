import db from "../database.js"

export default db.sequelize.define(
  "AuditLog",
  {
    model_name: {
      type: db.Sequelize.STRING(32),
      allowNull: false,
    },

    old_values: {
      type: db.Sequelize.JSONB,
      allowNull: true,
    },

    new_values: {
      type: db.Sequelize.JSONB,
      allowNull: true,
    },

    date: {
      type: db.Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "audit_log",
  }
)
